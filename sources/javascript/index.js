import Swiper, { Navigation, Pagination } from "swiper";

import { cars } from "./data/cars";
import { ModalWindow } from "./components/ModalWindow";

import "../stylesheets/scss/index.scss";

const DONATION_TYPES = {
  FONDY: "FONDY",
  FONDY_MONTHLY: "FONDY_MONTHLY"
}

class Index {
  modalWindowCryptocurrency;
  modalWindowPayPal;
  modalWindowThanks;
  modalWindowWhomWeHelped;
  modalWindowWhomWeHelpedMarkup;
  swiperModalWindowWhomWeHelped;
  swiperModalWindowWhomWeHelpedNode;
  swiperThanks;
  swiperThanksNode;
  swiperWhomWeHelped;
  swiperWhomWeHelpedNode;

  constructor() {
    this.initialize();
  }

  handleDonateButtonClick({ currency = "UAH", donationType = DONATION_TYPES.FONDY } = {}) {
    switch (donationType) {
      case DONATION_TYPES.FONDY:
        break;

      case DONATION_TYPES.FONDY_MONTHLY:
        // const monthly = donationType === DONATION_TYPES.FONDY_MONTHLY;
        //
        // window.open(this.initializeFondy(currency, monthly), "_blank");
        break;

      default:
        break;
    }
  }

  handleModalWindowWhomWeHelpedClose() {
    this.swiperModalWindowWhomWeHelped.activeIndex = 0;
  }

  handleWhomWeHelpedItemClick(swiper) {
    const descriptionMarkup = this.modalWindowWhomWeHelpedMarkup[swiper.clickedIndex].descriptionMarkup;
    const swiperMarkup = this.modalWindowWhomWeHelpedMarkup[swiper.clickedIndex].swiperMarkup;

    this.modalWindowWhomWeHelped.modalWindowNode.querySelector(".modal-window_footer").innerHTML = "";
    this.swiperModalWindowWhomWeHelpedNode.querySelector(".swiper-wrapper").innerHTML = "";

    this.modalWindowWhomWeHelped.modalWindowNode.querySelector(".modal-window_footer").append(descriptionMarkup);
    this.swiperModalWindowWhomWeHelpedNode.querySelector(".swiper-wrapper").append(...swiperMarkup);

    this.modalWindowWhomWeHelped.open();
    this.swiperModalWindowWhomWeHelped.update();
    this.swiperModalWindowWhomWeHelped.updateSlides();
    this.swiperModalWindowWhomWeHelped.updateSlidesClasses();
  }

  initialize() {
    this.initializeScroll();
    this.initializeSwiperModalWindowWhomWeHelped();
    this.initializeSwiperThanks();
    this.initializeSwiperWhomWeHelped();

    this.initializeModalWindowCryptocurrency();
    this.initializeModalWindowDonateEur();
    this.initializeModalWindowPayPal();
    this.initializeModalWindowThanks();
    this.initializeModalWindowDonateUah();
    this.initializeModalWindowWhomWeHelped();

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
    // document.querySelector(".button--donate-eur").addEventListener("click", (event) => {
    //   event.preventDefault();
    //   this.handleDonateButtonClick({ currency: "eur", donationType: DONATION_TYPES.FONDY });
    // });
    // document.querySelector(".button--donate-monthly").addEventListener("click", (event) => {
    //   event.preventDefault();
    //   this.handleDonateButtonClick({ currency: "uah", donationType: DONATION_TYPES.FONDY_MONTHLY });
    // });
    // document.querySelector(".button--donate-uah").addEventListener("click", (event) => {
    //   event.preventDefault();
    //   this.handleDonateButtonClick({ currency: "uah", donationType: DONATION_TYPES.FONDY });
    // });
  }

  initializeModalWindowWhomWeHelped() {
    this.modalWindowWhomWeHelped = new ModalWindow({
      modalWindowSelector: ".modal-window-whom-we-helped",
      modalWindowCloseSelector: ".modal-window-whom-we-helped .modal-window_close",
      onCloseHandler: this.handleModalWindowWhomWeHelpedClose.bind(this),
    });
    this.modalWindowWhomWeHelpedMarkup = getModalWindowWhomWeHelpedMarkup();

    function getModalWindowWhomWeHelpedMarkup() {
      return cars.map(car => {
        const swiperSlideNodes = car.images.map(image => {
          const swiperSlideNode = document.createElement("div");
          swiperSlideNode.classList.add("swiper-slide");

          const imageNode = document.createElement("div");
          imageNode.classList.add("graphic-content");
          imageNode.style.backgroundImage = `url("${image}")`;

          swiperSlideNode.append(imageNode);

          return swiperSlideNode;
        });

        const ulNode = document.createElement("ul");
        const liNodes = car.description.map(description => {
          const liNode = document.createElement("li");
          const pNode = document.createElement("p");
          const spanNode = document.createElement("span");

          spanNode.append(description.title);
          pNode.append(spanNode, description.value);
          liNode.append(pNode);

          return liNode;
        });

        ulNode.append(...liNodes);

        return {
          descriptionMarkup: ulNode,
          swiperMarkup: swiperSlideNodes
        };
      });
    }
  }

  initializeModalWindowCryptocurrency() {
    this.modalWindowCryptocurrency = new ModalWindow({
      modalWindowSelector: ".modal-window-cryptocurrency",
      modalWindowOpenSelector: ".modal-window-cryptocurrency_open",
    });
  }

  initializeModalWindowDonateEur() {
    this.modalWindowPayPal = new ModalWindow({
      modalWindowSelector: ".modal-window-donate-eur",
      modalWindowOpenSelector: ".modal-window-donate-eur_open",
    });
  }

  initializeModalWindowPayPal() {
    this.modalWindowPayPal = new ModalWindow({
      modalWindowSelector: ".modal-window-donate-paypal",
      modalWindowOpenSelector: ".modal-window-paypal_open",
    });
  }

  initializeModalWindowThanks() {
    this.modalWindowThanks = new ModalWindow({
      modalWindowSelector: ".modal-window-thanks",
      modalWindowOpenSelector: ".modal-window-thanks_open",
    });
  }

  initializeModalWindowDonateUah() {
    this.modalWindowPayPal = new ModalWindow({
      modalWindowSelector: ".modal-window-donate-uah",
      modalWindowOpenSelector: ".modal-window-donate-uah_open",
    });
  }

  initializeScroll() {
    document.querySelectorAll("[data-scroll-target-id]").forEach(node => {
      node.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById(event.target.dataset.scrollTargetId).scrollIntoView();
      });
    });
  }

  initializeSwiperModalWindowWhomWeHelped() {
    this.swiperModalWindowWhomWeHelpedNode = document.querySelector(".swiper-modal-window-whom-we-helped");

    this.swiperModalWindowWhomWeHelped = new Swiper(this.swiperModalWindowWhomWeHelpedNode, {
      loop: true,
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: this.swiperModalWindowWhomWeHelpedNode.querySelector(".swiper-button-next"),
        prevEl: this.swiperModalWindowWhomWeHelpedNode.querySelector(".swiper-button-prev"),
      },
      pagination: {
        el: this.swiperModalWindowWhomWeHelpedNode.querySelector(".swiper-pagination"),
        type: "bullets",
      },
      slidesPerView: 1,
      spaceBetween: 16
    });
  }

  initializeSwiperWhomWeHelped() {
    this.swiperWhomWeHelpedNode = document.querySelector(".swiper-whom-we-helped");

    const swiperWrapperNode = this.swiperWhomWeHelpedNode.querySelector(".swiper-wrapper");

    initializeSwiperSlides(swiperWrapperNode)

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
      loop: false,
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".gallery-whom-we-helped .swiper-button-next",
        prevEl: ".gallery-whom-we-helped .swiper-button-prev",
      },
      on: {
        click: this.handleWhomWeHelpedItemClick.bind(this)
      },
      pagination: {
        el: ".swiper-whom-we-helped .swiper-pagination",
        type: "bullets",
      }
    });

    function initializeSwiperSlides(node) {
      const documentFragment = document.createDocumentFragment();

      cars.forEach(car => {
        const swiperSlideNode = document.createElement("div");
        swiperSlideNode.classList.add("swiper-slide");

        const galleryItemNode = document.createElement("div");
        galleryItemNode.classList.add("gallery_item");

        const galleryGraphicContentNode = document.createElement("div");
        galleryGraphicContentNode.classList.add("gallery_graphic-content");
        galleryGraphicContentNode.style.backgroundImage = `url("${car.image}")`;

        const galleryTextContentNode = document.createElement("div");
        galleryTextContentNode.classList.add("gallery_text-content");

        const ulNode = document.createElement("ul");
        const lis = car.description.map(description => {
          const liNode = document.createElement("li");
          const pNode = document.createElement("p");
          const spanNode = document.createElement("span");

          spanNode.append(description.title);
          pNode.append(spanNode, description.value);
          liNode.append(pNode);

          return liNode;
        });

        ulNode.append(...lis);
        galleryTextContentNode.append(ulNode);
        galleryItemNode.append(galleryGraphicContentNode, galleryTextContentNode);
        swiperSlideNode.append(galleryItemNode);

        documentFragment.append(swiperSlideNode);
      });

      node.append(documentFragment);
    }
  }

  initializeSwiperThanks() {
    this.swiperThanksNode = document.querySelector(".swiper-thanks");

    this.swiperThanks = new Swiper(this.swiperThanksNode, {
      loop: true,
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: this.swiperThanksNode.querySelector(".swiper-button-next"),
        prevEl: this.swiperThanksNode.querySelector(".swiper-button-prev"),
      },
      pagination: {
        el: this.swiperThanksNode.querySelector(".swiper-pagination"),
        type: "bullets",
      },
      slidesPerView: 1,
      spaceBetween: 16
    });
  }
}

new Index();
