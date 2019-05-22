function getTemplate () {
  if (document.querySelector('template[data-for="keyboard-keys"]')) {
    return document.querySelector('template[data-for="keyboard-keys"]').content.cloneNode(true);
  }

  const template = document.createElement('template');

  template.setAttribute('data-for', 'keyboard-keys');

  template.innerHTML = `
    <style>
    :host {
      background-color: white;
      font-family: Helvetica, Arial, sans-serif;
      min-width: 54px;
      height: 54px;
      contain: strict;
      display: inline-block;
      position: relative;
      border-radius: 6px;
      border: 1px solid black;
      font-size: 12px;
      box-sizing: border-box;
      box-shadow: inset 6px 3px 0 #ccc, inset -6px -6px 0 #ccc, inset 6px -6px 0 #ccc, inset -6px 3px 0 #ccc;
      transition: box-shadow 50ms ease;
      user-select: none;
    }

    :host(:active) {
      background-color: #eee;
      box-shadow: inset 6px 6px 0 #bbb, inset -6px -6px 0 #bbb, inset 6px -6px 0 #bbb, inset -6px 6px 0 #bbb;
    }

    ::slotted(span) {
      margin: 9px;
    }

    ::slotted([slot="shift"]) {
      position: absolute;
      top: 0;
      left: 0;
    }

    ::slotted([slot="main"]) {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    ::slotted([slot="altgr"]) {
      position: absolute;
      bottom: 0;
      right: 0;
    }
    </style>
    <slot name="shift"></slot>
    <slot name="main"></slot>
    <slot name="altgr"></slot>
  `;

  document.body.appendChild(template);

  return template.content.cloneNode(true);
}

class KeyboardKey extends HTMLElement {
  connectedCallback () {
    this.sDOM = this.attachShadow({ mode: 'closed'});
    this.sDOM.appendChild(getTemplate());

    const dataWidth = this.getAttribute('data-width');

    if (dataWidth) {
      this.style.width = `${dataWidth}px`;
    }
  }
}

customElements.define('keyboard-key', KeyboardKey);