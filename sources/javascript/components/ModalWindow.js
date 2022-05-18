const MODAL_WINDOW_SELECTOR = ".modal-window";
const MODAL_WINDOW_CLOSE_SELECTOR = ".modal-window .modal-window_close";
const MODAL_WINDOW_OPEN_SELECTOR = ".modal-window_open";

class ModalWindow {
  backgroundOverlayNode;
  bodyNode;
  modalWindowNode;
  modalWindowCloseNodes;
  modalWindowOpenNodes;

  constructor({ modalWindowSelector, modalWindowCloseSelector, modalWindowOpenSelector, onCloseHandler } = {}) {
    this.initialize({ modalWindowSelector, modalWindowCloseSelector, modalWindowOpenSelector, onCloseHandler });
    this.initializeListeners();
  }

  appendBackgroundOverlay() {
    this.bodyNode.append(this.backgroundOverlayNode);
  }

  detachBackgroundOverlay() {
    this.backgroundOverlayNode.remove();
  }

  initialize({ modalWindowSelector, modalWindowCloseSelector, modalWindowOpenSelector, onCloseHandler } = {}) {
    this.bodyNode = document.querySelector("body");
    this.modalWindowNode = document.querySelector(modalWindowSelector || MODAL_WINDOW_SELECTOR);
    this.modalWindowCloseNodes = document.querySelectorAll(modalWindowCloseSelector || MODAL_WINDOW_CLOSE_SELECTOR);
    this.modalWindowOpenNodes = document.querySelectorAll(modalWindowOpenSelector || MODAL_WINDOW_OPEN_SELECTOR);
    this.onCloseHandler = onCloseHandler;

    this.initializeBackgroundOverlay();
  }

  initializeBackgroundOverlay() {
    this.backgroundOverlayNode = document.createElement("div");
    this.backgroundOverlayNode.classList.add("modal-window_background-overlay");
  }

  initializeListeners() {
    this.backgroundOverlayNode.addEventListener("click", this.handleModalWindowClose.bind(this));
    this.modalWindowCloseNodes.forEach(node => node.addEventListener("click", this.handleModalWindowClose.bind(this)));
    this.modalWindowOpenNodes.forEach(node => node.addEventListener("click", this.handleModalWindowOpen.bind(this)));
  }

  handleModalWindowClose(event) {
    event.preventDefault();

    this.close();
  }

  handleModalWindowOpen(event) {
    event.preventDefault();

    this.open();
  }

  close() {
    this.detachBackgroundOverlay();

    this.bodyNode.classList.remove("modal-window--active");
    this.modalWindowNode.classList.remove("modal-window--active");

    if (this.onCloseHandler) {
      this.onCloseHandler();
    }
  }

  open() {
    this.appendBackgroundOverlay();

    this.bodyNode.classList.add("modal-window--active");
    this.modalWindowNode.classList.add("modal-window--active");
  }
}

export { ModalWindow };
