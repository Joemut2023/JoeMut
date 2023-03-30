"use strict";

var topBar = document.querySelector(".top-bar");
var sentinal = document.querySelector(".sentinal");
var headerSticky = document.querySelector("#headerSticky");
console.log(headerSticky);
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