"use strict";

var spoon_buttom = document.querySelector(".spoon-buttom");
spoon_buttom.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
});