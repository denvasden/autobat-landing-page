import Swiper, { Navigation, Pagination } from "swiper";

import "../stylesheets/scss/index.scss";

class Index {
  swiperWhomWeHelped;
  swiperWhomWeHelpedDOM;

  constructor() {
    this.initialize();
  }

  initialize() {
    this.initializeSwiperWhomWeHelped();
  }

  initializeSwiperWhomWeHelped() {
    this.swiperWhomWeHelpedDOM = document.querySelector(".swiper-whom-we-helped");

    this.swiperWhomWeHelped = new Swiper(this.swiperWhomWeHelpedDOM, {
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
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      }
    });
  }
}

new Index();
