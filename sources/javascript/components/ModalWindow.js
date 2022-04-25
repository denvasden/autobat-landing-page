const MODAL_WINDOW_SELECTOR = ".modal-window";
const MODAL_WINDOW_CLOSE_SELECTOR = ".modal-window .modal-window_close";
const MODAL_WINDOW_OPEN_SELECTOR = ".modal-window_open";

class ModalWindow {
  bodyNode;
  modalWindowNode;
  modalWindowCloseNode;
  modalWindowOpenNodes;

  constructor({ modalWindowSelector, modalWindowCloseSelector, modalWindowOpenSelector } = {}) {
    this.initialize({ modalWindowSelector, modalWindowCloseSelector, modalWindowOpenSelector });
    this.initializeListeners();
  }

  initialize({ modalWindowSelector, modalWindowCloseSelector, modalWindowOpenSelector } = {}) {
    this.bodyNode = document.querySelector("body");
    this.modalWindowNode = document.querySelector(modalWindowSelector || MODAL_WINDOW_SELECTOR);
    this.modalWindowCloseNodes = document.querySelectorAll(modalWindowCloseSelector || MODAL_WINDOW_CLOSE_SELECTOR);
    this.modalWindowOpenNodes = document.querySelectorAll(modalWindowOpenSelector || MODAL_WINDOW_OPEN_SELECTOR)
  }

  initializeListeners() {
    this.modalWindowCloseNodes.forEach(node => node.addEventListener("click", this.handleModalWindowClose.bind(this)));
    this.modalWindowOpenNodes.forEach(node => node.addEventListener("click", this.handleModalWindowOpen.bind(this)));
  }

  handleModalWindowClose() {
    this.close();
  }

  handleModalWindowOpen() {
    this.open();
  }

  close() {
    this.bodyNode.classList.remove("modal-window--active");
    this.modalWindowNode.classList.remove("modal-window--active");
  }

  open() {
    this.bodyNode.classList.add("modal-window--active");
    this.modalWindowNode.classList.add("modal-window--active");
  }
}

export { ModalWindow };
