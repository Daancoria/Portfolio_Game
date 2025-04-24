import { translations, getLanguage } from "./lang.js";

export function displayDialogue(key, onDisplayEnd) {
  const dialogueText = translations[getLanguage()].dialogue[key];
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");

  dialogueUI.style.display = "block";
  let index = 0;
  let currentText = "";

  const intervalRef = setInterval(() => {
    if (index < dialogueText.length) {
      currentText += dialogueText[index];
      dialogue.innerHTML = currentText;
      index++;
      return;
    }
    clearInterval(intervalRef);
  }, 1);

  const closeBtn = document.getElementById("close");

  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.style.display = "none";
    dialogue.innerHTML = "";
    clearInterval(intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick);
    removeEventListener("keypress", onKeyPress);
  }

  function onKeyPress(event) {
    if (event.code === "Enter") {
      closeBtn.click();
    }
  }

  closeBtn.addEventListener("click", onCloseBtnClick);
  addEventListener("keypress", onKeyPress);
}

export function setCamScale(k) {
  const targetWidth = 768; // original game width
  const scale = window.innerWidth / targetWidth;
  k.camScale(k.vec2(scale));
}
