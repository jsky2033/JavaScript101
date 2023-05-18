class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (event) => {
      if (!confirm("Do you really want to leave?")) {
        event.preventDefault();
      }
    });
  }
}
// last arg is necessary since this extends a specific type of element
customElements.define("uc-confirm-link", ConfirmLink, { extends: "a" });
