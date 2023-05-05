// (function() {
//     var carousels = document.querySelectorAll('.js-product-carousel');

//     [].forEach.call(carousels, function(carousel) {
//       carouselize(carousel);
//     });

//   })();

//   function carouselize(carousel) {
//     var productList = carousel.querySelector('.js-product-list');
//     var productListWidth = 0;
//     var productListSteps = 0;
//     var products = carousel.querySelectorAll('.product');
//     var productAmount = 0;
//     var productAmountVisible = 4;
//     var carouselPrev = carousel.querySelector('.js-carousel-prev');
//     var carouselNext = carousel.querySelector('.js-carousel-next');

//     //Count all the products
//     [].forEach.call(products, function(product) {
//       productAmount++;
//       productListWidth += 250;
//       productList.style.width = productListWidth+"px";
//     });

//     carouselNext.onclick = function() {
//       if(productListSteps < productAmount-productAmountVisible) {
//         productListSteps++;
//         moveProductList();
//       }
//     }
//     carouselPrev.onclick = function() {
//       if(productListSteps > 0) {
//         productListSteps--;
//         moveProductList();
//       }
//     }

//     // This is a bit hacky, let me know if you find a better way to do this!
//     // Move the carousels product-list
//     function moveProductList() {
//       productList.style.transform = "translateX(-"+205*productListSteps+"px)";
//     }
//   }

var swiper = new Swiper(".carousel__view", {
  loop: true,
  spaceBetween: 20,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1020: {
      slidesPerView: 4,
    },
  },
});
