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
    document.addEventListener('keydown', (e) => {
      e.stopImmediatePropagation();

      const key = document.getElementById(e.code);

      if (!key) {
        e.preventDefault();
        return;
      }

      if (e.code === 'CapsLock' && !e.repeat) {
        e.preventDefault();

        this.caps = !this.caps;

        const addRemove = this.caps ? 'add' : 'remove';

        key.classList[addRemove]('active');

        this.switchCaps(e.shiftKey);
      } else {
        key.classList.add('active');

        if ((e.ctrlKey || e.metaKey) && e.altKey && !e.repeat) {
          e.preventDefault();

          this.lang = this.lang === 'ru' ? 'en' : 'ru';

          localStorage.setItem('lang', this.lang);

          this.showLanguage(this.lang, e.shiftKey);
        } else if (!keyboardKeys[e.code].function) {
          e.preventDefault();

          this.insertText(key.textContent);
        } else if (e.key === 'Shift' && !e.repeat) {
          e.preventDefault();

          this.switchCaps(e.shiftKey);
        } else if (e.code === 'Tab') {
          e.preventDefault();

          this.insertText('\t');
        } else if (e.code === 'Enter') {
          e.preventDefault();

          this.insertText('\n');
        } else if (e.code === 'Backspace') {
          e.preventDefault();

          this.pressBackspace();
        } else if (e.code === 'Delete') {
          e.preventDefault();

          this.pressDelete();
        } else if (e.code === 'ArrowUp' && !e.isTrusted) {
          this.arrowUp();
        } else if (e.code === 'ArrowDown' && !e.isTrusted) {
          this.arrowDown();
        } else if (e.code === 'ArrowLeft' && !e.isTrusted) {
          this.arrowLeft();
        } else if (e.code === 'ArrowRight' && !e.isTrusted) {
          this.arrowRight();
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      e.stopImmediatePropagation();

      const key = document.getElementById(e.code);
      if (!key) {
        e.preventDefault();

        return;
      }

      if (e.code !== 'CapsLock') {
        key.classList.remove('active');

        if (e.key === 'Shift') {
          e.preventDefault();

          this.switchCaps(e.shiftKey);
        }
      }
    });

    this.keyboard.addEventListener('click', (e) => {
      this.textarea.focus();

      const eventKeyDown = new KeyboardEvent('keydown', {
        bubbles: true,

        cancelable: true,

        code: e.target.id,

        view: window,
      });

      document.dispatchEvent(eventKeyDown);

      this.textarea.focus();

      const eventKeyUp = new KeyboardEvent('keyup', {
        bubbles: true,

        cancelable: true,

        code: e.target.id,

        view: window,
      });

      document.dispatchEvent(eventKeyUp);
    });
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
