import { translations, getLanguage } from "./lang.js";

let activeKey = null;
let intervalRef = null;
let onCloseCallback = null;

export function displayDialogue(key, onDisplayEnd) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  const closeBtn = document.getElementById("close");

  dialogueUI.style.display = "block";
  activeKey = key;
  onCloseCallback = onDisplayEnd;

  let index = 0;
  let currentText = "";
  const fullText = translations[getLanguage()].dialogue[key];

  clearInterval(intervalRef);
  intervalRef = setInterval(() => {
    if (index < fullText.length) {
      currentText += fullText[index];
      dialogue.innerHTML = currentText;
      index++;
    } else {
      clearInterval(intervalRef);
    }
  }, 1);

  function onCloseBtnClick() {
    onCloseCallback();
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

// 🆕 New: Refresh the same dialogue in a new language
export function refreshDialogue() {
  if (activeKey !== null) {
    displayDialogue(activeKey, onCloseCallback);
  }
}
