import Swiper, { Navigation, Pagination } from "swiper";

import { ModalWindow } from "./components/ModalWindow";

import "../stylesheets/scss/index.scss";

const DONATION_TYPES = {
  FONDY: "FONDY",
  FONDY_MONTHLY: "FONDY_MONTHLY"
}

class Index {
  modalWindow;
  swiperModalWindow;
  swiperModalWindowNode;
  swiperWhomWeHelped;
  swiperWhomWeHelpedNode;

  constructor() {
    this.initialize();
  }

  handleDonateButtonClick({ currency = "UAH", donationType = DONATION_TYPES.FONDY } = {}) {
    switch (donationType) {
      case DONATION_TYPES.FONDY:
      case DONATION_TYPES.FONDY_MONTHLY:
        const monthly = donationType === DONATION_TYPES.FONDY_MONTHLY;

        window.open(this.initializeFondy(currency, monthly), "_blank");
        break;

      default:
        break;
    }
  }

  initialize() {
    this.initializeSwiperWhomWeHelped();
    this.initializeSwiperModalWindow();
    this.initializeModalWindow();

    this.initializeListeners();
  }

  initializeFondy(currency = "UAH", monthly = false) {
    const button = $ipsp.get("button");

    button.setAmount("", currency.toUpperCase());
    button.setHost("pay.fondy.eu");
    button.setMerchantId(1503170);

    if (monthly) {
      button.addRecurringData({
        every: 1,
        period: "month"
      });
      button.setRecurringState(true);
    }

    return button.getUrl();
  }

  initializeListeners() {
    document.querySelector(".button--donate-eur").addEventListener("click", (event) => {
      event.preventDefault();
      this.handleDonateButtonClick({ currency: "eur", donationType: DONATION_TYPES.FONDY });
    });
    document.querySelector(".button--donate-monthly").addEventListener("click", (event) => {
      event.preventDefault();
      this.handleDonateButtonClick({ currency: "uah", donationType: DONATION_TYPES.FONDY_MONTHLY });
    });
    document.querySelector(".button--donate-uah").addEventListener("click", (event) => {
      event.preventDefault();
      this.handleDonateButtonClick({ currency: "uah", donationType: DONATION_TYPES.FONDY });
    });
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
