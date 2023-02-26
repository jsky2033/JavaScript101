export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    // template of what element(s) needs to go inside the modal
    this.contentTemplateEl = document.getElementById(contentId);
    // template of the modal itself
    this.modalTemplateEl = document.getElementById("modal-template");
  }
  show() {
    // checking if browser supports template element
    if ("content" in document.createElement("template")) {
      // get contents of modal from template
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      // get modal elements from content
      this.modalElement = modalElements.querySelector(".modal");
      this.backdropElement = modalElements.querySelector(".backdrop");

      // get content of what the modal should display
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      // place content in modal
      this.modalElement.appendChild(contentElement);

      // place both modal and backdrop in DOM
      document.body.insertAdjacentElement("afterbegin", this.modalElement);
      document.body.insertAdjacentElement("afterbegin", this.backdropElement);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
    if (!!this.modalElement) {
      document.body.removeChild(this.modalElement);
      document.body.removeChild(this.backdropElement);
      // this is done to avoid memory leaks
      this.modalElement = null;
      this.backdropElement = null;
    }
  }
}
