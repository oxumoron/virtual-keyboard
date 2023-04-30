/* eslint-disable import/extensions */
import { keyboardFragment, keyboardKeys } from './keyboard.js';

class Keyboard {
  constructor() {
    this.caps = false;
    this.lang = localStorage.getItem('lang') === 'ru' ? 'ru' : 'en';
  }

  init() {
    // START CREATE ELEMENT
    this.wrapper = document.createElement('main');
    this.title = document.createElement('h1');
    this.textarea = document.createElement('textarea');
    this.keyboard = document.createElement('ul');
    const keyboardRow = document.createElement('li');
    this.description = document.createElement('p');
    this.language = document.createElement('p');
    // END CREATE ELEMENT

    // START SETUP ELEMENT
    this.wrapper.classList.add('wrapper');

    this.title.classList.add('title');
    this.title.textContent = 'RSS Виртуальная клавиатура';

    this.textarea.autofocus = true;
    this.textarea.classList.add('text');

    this.keyboard.classList.add('keyboard');

    keyboardRow.classList.add('keyboard__row');

    this.description.classList.add('desc');
    this.description.textContent = 'Клавиатура создана в операционной системе Windows';

    this.language.classList.add('desc');
    this.language.textContent = 'Для переключения языка комбинация: левыe ctrl + alt';
    // END SETUP ELEMENT

    // START ADD TO DOM
    this.keyboard.append(keyboardFragment);
    this.showLanguage(this.lang);

    this.wrapper.append(this.title);
    this.wrapper.append(this.textarea);
    this.wrapper.append(this.keyboard);
    this.wrapper.append(this.description);
    this.wrapper.append(this.language);

    document.body.append(this.wrapper);
    // END ADD TO DOM

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

  switchCaps(shiftKey) {}
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
});
