const navlink_one = document.querySelector(".btn-tab-one");
const navlink_two = document.querySelector(".btn-tab-two");

const btn_up = document.querySelector(".btn-up");
const btn_down = document.querySelector(".btn-down");
const number = parseInt(document.querySelector(".number-value").value);
const input = document.querySelector(".number-value");

const image_grand = document.querySelector(".img-grand");
const image_small = document.querySelectorAll(".img-small");

navlink_one.addEventListener("click", function () {
  navlink_one.classList.add("button-add");
  navlink_two.classList.remove("button-add");
});

navlink_two.addEventListener("click", function () {
  navlink_two.classList.add("button-add");
  navlink_one.classList.remove("button-add");
});

// Incrementation
btn_up.addEventListener("click", function () {
  number = parseInt(isNaN(number)) ? 1 : parseInt(number);
  number++;
  input.value = number
  
});

// Images
image_small.forEach(element => {
  element.addEventListener("click", function () {
    // alert("click yes !")
    image_grand.src = element.src
  });
});

