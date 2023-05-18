class hiddenContent extends HTMLElement {
  constructor() {
    super();
    this._isHidden = true;

    this.attachShadow({ mode: "open" });

    // add HTML Structure
    this.shadowRoot.innerHTML = `
    <style>
    #info-box {
        display: none;
    }
    </style>
    <button>Show</button>
    <p id="info-box"><slot>Default text here</slot></p>
    `;
  }

  connectedCallback() {
    const button = this.shadowRoot.querySelector("button");
    const infoEl = this.shadowRoot.querySelector("p");

    button.addEventListener("click", () => {
      if (this._isHidden) {
        infoEl.style.display = "block";
        button.textContent = "Hide";
        this._isHidden = false;
      } else {
        infoEl.style.display = "none";
        button.textContent = "Show";
        this._isHidden = true;
      }
    });
  }
}

customElements.define("uc-hidden-content", hiddenContent);
