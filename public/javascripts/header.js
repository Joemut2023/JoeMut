"use strict";

var topBar = document.querySelector(".top-bar");
var sentinal = document.querySelector(".sentinal");
var headerSticky = document.querySelector("#headerSticky");
var userIcone = document.querySelector("#user-title-Dropdown");
var dropDown = document.querySelector("#user-menu-Dropdown");
var handler = function handler(entries) {
  if (!entries[0].isIntersecting) {
    headerSticky.style.display = "block";
    sentinal.style.display = "none";
  } else {
    headerSticky.style.display = "none";
    sentinal.style.display = "flex";
  }
};

// create the observer
var observer = new window.IntersectionObserver(handler);
// give the observer some dom nodes to keep an eye on
observer.observe(topBar);
userIcone.addEventListener("mouseenter", function (event) {
  dropDown.style.display = "block";
  dropDown.style.opacity = "1";
  dropDown.style.transform = "scaleY(1)";
  dropDown.style.transformOrigin = "top";
}
// highlight the mouseenter target
);

dropDown.addEventListener("mouseout", function (event) {
  // dropDown.style.opacity = "0";
  // dropDown.style.transform="scaleY(0)";
  dropDown.style.display = "none";
}
// highlight the mouseenter target
);