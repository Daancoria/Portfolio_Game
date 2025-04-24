import { translations, getLanguage } from "./lang.js";

let activeKey = null;
let intervalRef = null;
let onCloseCallback = null;

export function displayDialogue(key, onDisplayEnd) {
  const dialogueText = translations[getLanguage()].dialogue[key];
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  const closeBtn = document.getElementById("close");

  dialogueUI.style.display = "block";
  activeKey = key;
  onCloseCallback = onDisplayEnd;

  let index = 0;
  let currentText = "";

  clearInterval(intervalRef);
  intervalRef = setInterval(() => {
    if (index < dialogueText.length) {
      currentText += dialogueText[index];
      dialogue.innerHTML = currentText;
      index++;
    } else {
      clearInterval(intervalRef);
    }
  }, 1);

  function onCloseBtnClick() {
    onDisplayCallback();
    dialogueUI.style.display = "none";
    dialogue.innerHTML = "";
    clearInterval(intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick);
    removeEventListener("keypress", onKeyPress);
    activeKey = null;
  }

  function onKeyPress(event) {
    if (event.code === "Enter") {
      closeBtn.click();
    }
  }

  closeBtn.addEventListener("click", onCloseBtnClick);
  addEventListener("keypress", onKeyPress);
}

export function refreshDialogue() {
  if (activeKey !== null && onCloseCallback) {
    displayDialogue(activeKey, onCloseCallback);
  }
}

export function setCamScale(k) {
  const targetWidth = 768; // original game width
  const scale = window.innerWidth / targetWidth;
  k.camScale(k.vec2(scale));
}
