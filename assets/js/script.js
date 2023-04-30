class Keyboard {
  constructor() {
    this.caps = false;
    this.lang = localStorage.getItem('lang') === 'ru' ? 'ru' : 'en';
  }

  init() {
    this.createListeners();
  }

  createListeners() {
  }

  insertText(chars) {
  }

  arrowUp() {
  }

  arrowDown() {
  }

  arrowLeft() {
  }

  arrowRight() {
  }

  pressBackspace() {
  }

  pressDelete() {
  }

  showLanguage(lang, shift = false) {
  }

  switchCaps(shiftKey) {
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
});
