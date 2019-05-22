const style = document.createElement('style');

style.textContent = `
  :host {
    background-color: white;
    font-family: Helvetica, Arial, sans-serif;
    width: 54px;
    height: 54px;
    contain: strict;
    display: inline-block;
    position: relative;
    border-radius: 6px;
    border: 1px solid black;
    font-size: 12px;
    box-shadow: inset 6px 3px 0 #cccccc, inset -6px -6px 0 #cccccc, inset 6px -6px 0 #cccccc, inset -6px 3px 0 #cccccc;
  }

  :host([width=2]) {
    width: 108px;
  }

  ::slotted(span) {
    margin: 8px;
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
`;

const template = document.createElement('template')

template.innerHTML = `
  <slot name="shift"></slot>
  <slot name="main"></slot>
  <slot name="altgr"></slot>
`;

class KeyboardKey extends HTMLElement {
  connectedCallback () {
    this.sDOM = this.attachShadow({ mode: 'closed'});
    this.sDOM.appendChild(style.cloneNode(true));
    this.sDOM.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('keyboard-key', KeyboardKey);