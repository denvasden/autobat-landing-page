import Swiper, { Navigation, Pagination } from "swiper";

import { ModalWindow } from "./components/ModalWindow";

import "../stylesheets/scss/index.scss";

class Index {
  modalWindow;
  swiperModalWindow;
  swiperModalWindowNode;
  swiperWhomWeHelped;
  swiperWhomWeHelpedNode;

  constructor() {
    this.initialize();
  }

  initialize() {
    this.initializeSwiperWhomWeHelped();
    this.initializeSwiperModalWindow();
    this.initializeModalWindow();
  }

  initializeModalWindow() {
    this.modalWindow = new ModalWindow();
  }

  initializeSwiperWhomWeHelped() {
    this.swiperWhomWeHelpedNode = document.querySelector(".swiper-whom-we-helped");

    this.swiperWhomWeHelped = new Swiper(this.swiperWhomWeHelpedNode, {
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 16
        },
        481: {
          slidesPerView: 2,
          spaceBetween: 16
        },
        1025: {
          slidesPerView: 3,
          spaceBetween: 16
        }
      },
      loop: true,
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".gallery-whom-we-helped .swiper-button-next",
        prevEl: ".gallery-whom-we-helped .swiper-button-prev",
      },
      pagination: {
        el: ".swiper-whom-we-helped .swiper-pagination",
        type: "bullets",
      }
    });
  }

  initializeSwiperModalWindow() {
    this.swiperModalWindowNode = document.querySelector(".swiper-modal-window");

    this.swiperModalWindow = new Swiper(this.swiperModalWindowNode, {
      loop: true,
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".swiper-modal-window .swiper-button-next",
        prevEl: ".swiper-modal-window .swiper-button-prev",
      },
      pagination: {
        el: ".swiper-modal-window .swiper-pagination",
        type: "bullets",
      },
      slidesPerView: 1,
      spaceBetween: 16
    });
  }
}

new Index();
