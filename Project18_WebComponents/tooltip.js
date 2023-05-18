class Tooltip extends HTMLElement {
  constructor() {
    super(); // necessary for Web Components
    this._tooltipIcon;
    this._tooltipVisible = false;
    this._toolTipText = "Dummy tooltip text";
    this.attachShadow({ mode: "open" });

    // add HTML Structure
    this.shadowRoot.innerHTML = `
    <style>
      div{
        background-color: orange;
        color: white;
        position: absolute;
        border-color: black;
        position: absolute;
        z-index: 10;
        padding: .5em;
        border-style: solid;
      }

      ::slotted(span){
        background-color: red;
      }

      :host(.important){
        background: var(--color-primary);
      }

      .icon{
        background-color: orange;
        color: white;
        padding: 0.15rem 0.5rem;
        text-align: center;
        border-radius: 50%
      }

      :host{
        position: relative
      }
    </style>
    <slot>Some Default</slot>  
    <span class="icon"> ?</span>`;
  }

  connectedCallback() {
    // access specific template item
    this._tooltipIcon = this.shadowRoot.querySelector("span");

    // add event listener to the template item
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );

    // add HTML to DOM
    this.shadowRoot.appendChild(this._tooltipIcon);
  }

  // ATTRIBUTE CHANGED CALLBACK
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "text") {
      this._toolTipText = newValue;
    }
  }

  // all the attributes which we wanted to listen to changes from
  static get observedAttributes() {
    return ["text", "class"];
  }

  // DISCONNECTED CALLBACK

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  _render() {
    let toolTipContainer = this.shadowRoot.querySelector("div");
    if (this._tooltipVisible) {
      toolTipContainer = document.createElement("div");
      toolTipContainer.textContent = this._toolTipText;
      this.shadowRoot.appendChild(toolTipContainer);
    } else {
      if (toolTipContainer) {
        this.shadowRoot.removeChild(toolTipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define("uc-tooltip", Tooltip);
