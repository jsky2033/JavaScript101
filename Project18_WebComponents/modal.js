class Modal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
        #backdrop{
            position: fixed;
            top:0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0,0,0,0.75);
            opacity:0;
            pointer-events: none;
        }

        :host([opened]) #backdrop, :host([opened]) #modal{
            opacity: 1;
            pointer-events: all;
        }

        #modal{
            position: fixed;
            top: 15vh;
            left: 25%;
            width: 50%;
            z-index:100;
            background: white;
            border-radius: 3px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.26);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            opacity:0;
            pointer-events: none;
        }

        header{
            padding: 1rem;
        }

        ::slotted(h1){
            font-size: 1.25rem;
        }

        #actions{
            border-top: 1px solid #ccc;
            padding: 1rem;
            display: flex;
            justify-content: flex-end
        }

        #content{
            border-top: 1px solid #ccc;
            padding: 1rem;
            display: flex;
        }

        #actions button{
            margin: 0 0.25rem;
        }
    </style>
    <div id="backdrop"></div>
    <div id="modal">
        <header>
            <slot name="title">Please confirm payment</slot>
        </header>
        <section id="content">
            <slot></slot>
        </section>
        <section id="actions">
            <button id="cancel-btn">Cancel</button>
            <button id="confirm-btn">Okay</button>
        </section>
    </div>
    `;

    const cancelButton = this.shadowRoot.querySelector("#cancel-btn");
    const confirmButton = this.shadowRoot.querySelector("#confirm-btn");

    cancelButton.addEventListener("click", this._cancel.bind(this));
    confirmButton.addEventListener("click", this._confirm.bind(this));

    const backdrop = this.shadowRoot.querySelector("#backdrop");
    backdrop.addEventListener("click", this._cancel.bind(this));
  }

  open() {
    this.setAttribute("opened", "");
  }

  hide() {
    this.removeAttribute("opened");
  }

  _cancel(event) {
    this.hide();
    const cancelEvent = new Event("cancel", { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm(event) {
    this.hide();
    const confirmEvent = new Event("confirm", {
      bubbles: true,
      composed: true,
    });
    event.target.dispatchEvent(confirmEvent);
  }
}

customElements.define("uc-modal", Modal);
