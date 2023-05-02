/* eslint-disable import/extensions */
import { keyboardFragment, keyboardKeys } from './keyboard.js';

const EVENT_CODES = {
  CAPS_LOCK: 'CapsLock',
  TAB: 'Tab',
  SHIFT: 'Shift',
  ENTER: 'Enter',
  BACKSPACE: 'Backspace',
  DELETE: 'Delete',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
};

const LANGUAGES = {
  EN: 'en',
  RU: 'ru',
};

const keyMappings = {
  Backquote: {
    en: ['`', '~'],
    ru: ['`', '~'],
  },
  Minus: {
    en: ['-', '_'],
    ru: ['-', '_'],
  },
  Digit1: {
    en: ['1', '!'],
    ru: ['1', '!'],
  },
  Digit2: {
    en: ['2', '@'],
    ru: ['2', '"'],
  },
  Digit3: {
    en: ['3', '#'],
    ru: ['3', '№'],
  },
  Digit4: {
    en: ['4', '$'],
    ru: ['4', ';'],
  },
  Digit5: {
    en: ['5', '%'],
    ru: ['5', '%'],
  },
  Digit6: {
    en: ['6', '^'],
    ru: ['6', ':'],
  },
  Digit7: {
    en: ['7', '&'],
    ru: ['7', '?'],
  },
  Digit8: {
    en: ['8', '*'],
    ru: ['8', '*'],
  },
  Digit9: {
    en: ['9', '('],
    ru: ['9', '('],
  },
  Digit0: {
    en: ['0', ')'],
    ru: ['0', ')'],
  },
  Equal: {
    en: ['=', '+'],
    ru: ['=', '+'],
  },
  BracketLeft: {
    en: ['[', '{'],
    ru: ['[', '{'],
  },
  BracketRight: {
    en: [']', '}'],
    ru: [']', '}'],
  },
  Backslash: {
    en: ['\\', '|'],
    ru: ['\\', '/'],
  },
  Semicolon: {
    en: [';', ':'],
    ru: [';', ':'],
  },
  Quote: {
    en: ["'", '"'],
    ru: ["'", '"'],
  },
  Comma: {
    en: [',', '<'],
    ru: [',', '<'],
  },
  Period: {
    en: ['.', '>'],
    ru: ['.', '>'],
  },
  Slash: {
    en: ['/', '?'],
    ru: ['.', ','],
  },
};

class Keyboard {
  constructor() {
    this.isCapsOn = false;
    this.lang = localStorage.getItem('lang') === LANGUAGES.RU ? LANGUAGES.RU : LANGUAGES.EN;
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
    this.textarea.classList.add('textarea');

    this.keyboard.classList.add('keyboard');

    keyboardRow.classList.add('keyboard__row');

    this.description.classList.add('desc');
    this.description.textContent = 'Клавиатура создана в операционной системе Windows';

    this.language.classList.add('desc');
    this.language.textContent = 'Для переключения языка комбинация: левыe ctrl + alt';
    // END SETUP ELEMENT

    // START ADD TO DOM
    this.keyboard.append(keyboardFragment);

    this.wrapper.append(this.title, this.textarea, this.keyboard, this.description, this.language);

    document.body.append(this.wrapper);
    // END ADD TO DOM

    this.changeLanguage(this.lang);
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

      if (e.code === EVENT_CODES.CAPS_LOCK && !e.repeat) {
        e.preventDefault();

        this.isCapsOn = !this.isCapsOn;

        const addRemoveClass = this.isCapsOn ? 'add' : 'remove';

        key.classList[addRemoveClass]('active');

        this.switchCaps(e.shiftKey);
      } else {
        key.classList.add('active');

        if ((e.ctrlKey || e.metaKey) && e.altKey && !e.repeat) {
          e.preventDefault();

          this.lang = this.lang === LANGUAGES.RU ? LANGUAGES.EN : LANGUAGES.RU;

          localStorage.setItem('lang', this.lang);

          this.changeLanguage(this.lang, e.shiftKey);
        } else if (!keyboardKeys[e.code].function) {
          e.preventDefault();

          this.insertText(key.textContent);
        } else if (e.key === EVENT_CODES.SHIFT && !e.repeat) {
          e.preventDefault();

          this.switchCaps(e.shiftKey);
        } else if (e.code === EVENT_CODES.TAB) {
          e.preventDefault();

          this.insertText('\t');
        } else if (e.code === EVENT_CODES.ENTER) {
          e.preventDefault();

          this.insertText('\n');
        } else if (e.code === EVENT_CODES.BACKSPACE) {
          e.preventDefault();

          this.pressBackspace();
        } else if (e.code === EVENT_CODES.DELETE) {
          e.preventDefault();

          this.pressDelete();
        } else if (e.code === EVENT_CODES.ARROW_UP && !e.isTrusted) {
          this.arrowUp();
        } else if (e.code === EVENT_CODES.ARROW_DOWN && !e.isTrusted) {
          this.arrowDown();
        } else if (e.code === EVENT_CODES.ARROW_LEFT && !e.isTrusted) {
          this.arrowLeft();
        } else if (e.code === EVENT_CODES.ARROW_RIGHT && !e.isTrusted) {
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

      if (e.code !== EVENT_CODES.CAPS_LOCK) {
        key.classList.remove('active');

        if (e.key === EVENT_CODES.SHIFT) {
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
    const cursorAt = this.textarea.selectionStart;

    this.textarea.value = `${this.textarea.value.slice(0, cursorAt)}${chars}${this.textarea.value.slice(this.textarea.selectionEnd)}`;

    this.textarea.setSelectionRange(cursorAt + chars.length, cursorAt + chars.length);
  }

  arrowUp() {
    const currentPos = this.textarea.selectionStart;
    const currentLineStart = this.textarea.value.lastIndexOf('\n', currentPos - 1) + 1;
    const prevLineEnd = currentLineStart - 1;
    const prevLineStart = this.textarea.value.lastIndexOf('\n', prevLineEnd - 1) + 1;

    this.textarea.selectionStart = prevLineStart;
    this.textarea.selectionEnd = prevLineEnd;
  }

  arrowDown() {
    const cursorAt = this.textarea.selectionStart;
    const textAfterCursor = this.textarea.value.slice(cursorAt);
    const indexOfNextNewline = textAfterCursor.indexOf('\n');

    if (indexOfNextNewline >= 0) {
      this.textarea.selectionStart = cursorAt + indexOfNextNewline + 1;
      this.textarea.selectionEnd = this.textarea.selectionStart;
    } else {
      this.textarea.selectionEnd = this.textarea.textLength;
      this.textarea.selectionStart = this.textarea.selectionEnd;
    }
  }

  arrowLeft() {
    let { selectionStart, selectionEnd } = this.textarea;

    selectionStart = Math.max(0, selectionStart - 1);
    selectionEnd = selectionStart;

    this.textarea.selectionStart = selectionStart;
    this.textarea.selectionEnd = selectionEnd;
  }

  arrowRight() {
    this.textarea.selectionStart = Math.min(
      this.textarea.selectionStart + 1,
      this.textarea.value.length,
    );

    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  pressBackspace() {
    const selectionLength = this.textarea.selectionEnd - this.textarea.selectionStart;
    if (selectionLength > 0) {
      this.insertText('');
    } else {
      const cursorAt = Math.max(0, this.textarea.selectionStart - 1);

      this.textarea.value = this.textarea.value.slice(0, cursorAt)
        + this.textarea.value.slice(this.textarea.selectionEnd);

      this.textarea.selectionStart = cursorAt;

      this.textarea.selectionEnd = this.textarea.selectionStart;
    }
  }

  pressDelete() {
    if (this.textarea.selectionStart !== this.textarea.selectionEnd) {
      this.insertText('');
    } else {
      const cursorAt = this.textarea.selectionStart;
      this.deleteText(cursorAt, cursorAt + 1);
    }
  }

  deleteText(selectionStart, selectionEnd) {
    const newText = this.textarea.value.slice(0, selectionStart)
      + this.textarea.value.slice(selectionEnd);

    this.textarea.value = newText;
    this.textarea.selectionStart = selectionStart;
    this.textarea.selectionEnd = selectionStart;
  }

  changeLanguage(lang, shift = false) {
    const keys = this.keyboard.querySelectorAll('.keyboard__key');

    keys.forEach((
      (e) => {
        e.textContent = keyboardKeys[e.id][lang];
      }));

    this.switchCaps(shift);
  }

  switchCaps(shiftKey) {
    const showUpperCase = (this.isCapsOn && !shiftKey) || (!this.isCapsOn && shiftKey);
    const toCase = showUpperCase ? 'toUpperCase' : 'toLowerCase';

    Array.from(this.keyboard.querySelectorAll('.keyboard__key')).forEach((e) => {
      const keyMapping = keyMappings[e.id];
      if (keyMapping && !keyboardKeys[e.id].change) {
        const char = keyMapping[this.lang][shiftKey ? 1 : 0] || keyMapping[this.lang][0];
        e.textContent = char[toCase]();
      } else if (!keyboardKeys[e.id].change && !keyboardKeys[e.id].function) {
        e.textContent = e.textContent[toCase]();
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
});
