import { scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";
import { translations, setLanguage, getLanguage } from "./lang.js";

k.loadSprite("spritesheet", "./spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
});

k.loadSprite("map", "./map.png");

k.setBackground(k.Color.fromHex("#311047"));

k.scene("main", async () => {
  const mapData = await (await fetch("./map.json")).json();
  const layers = mapData.layers;

  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

  const player = k.make([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10) }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor),
    {
      speed: 250,
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ]);

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({ shape: new k.Rect(k.vec2(0), boundary.width, boundary.height) }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true;
            displayDialogue(boundary.name, () => (player.isInDialogue = false));
          });
        }
      }
      continue;
    }

    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  }

  setCamScale(k);
  k.onResize(() => setCamScale(k));
  k.onUpdate(() => k.camPos(player.worldPos().x, player.worldPos().y - 100));

  k.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue) return;
    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.speed);
    const mouseAngle = player.pos.angle(worldMousePos);
    const lowerBound = 50, upperBound = 125;

    if (mouseAngle > lowerBound && mouseAngle < upperBound) {
      player.play("walk-up");
      player.direction = "up"; return;
    }
    if (mouseAngle < -lowerBound && mouseAngle > -upperBound) {
      player.play("walk-down");
      player.direction = "down"; return;
    }
    if (Math.abs(mouseAngle) > upperBound) {
      player.flipX = false;
      player.play("walk-side");
      player.direction = "right"; return;
    }
    if (Math.abs(mouseAngle) < lowerBound) {
      player.flipX = true;
      player.play("walk-side");
      player.direction = "left";
    }
  });

  function stopAnims() {
    player.play(player.direction === "up" ? "idle-up" :
                player.direction === "down" ? "idle-down" : "idle-side");
  }

  k.onMouseRelease(stopAnims);
  k.onKeyRelease(stopAnims);

  k.onKeyDown(() => {
    const keys = ["right", "left", "up", "down"].map(k.isKeyDown);
    if (keys.filter(Boolean).length > 1 || player.isInDialogue) return;

    if (keys[0]) { player.flipX = false; player.direction = "right"; player.play("walk-side"); player.move(player.speed, 0); return; }
    if (keys[1]) { player.flipX = true;  player.direction = "left";  player.play("walk-side"); player.move(-player.speed, 0); return; }
    if (keys[2]) { player.direction = "up";   player.play("walk-up");   player.move(0, -player.speed); return; }
    if (keys[3]) { player.direction = "down"; player.play("walk-down"); player.move(0,  player.speed); }
  });

  // Language selector logic
  const langSelector = document.getElementById("lang-selector");
  if (langSelector) {
    const saved = localStorage.getItem("lang");
    if (saved) {
      setLanguage(saved);
      langSelector.value = saved;
      document.querySelector(".note").textContent = translations[saved].note;
      document.getElementById("close").textContent = translations[saved].close;
    }

    langSelector.addEventListener("change", (e) => {
      const lang = e.target.value;
      setLanguage(lang);
      localStorage.setItem("lang", lang);
      document.querySelector(".note").textContent = translations[lang].note;
      document.getElementById("close").textContent = translations[lang].close;
    });
  }
});

k.go("main");
