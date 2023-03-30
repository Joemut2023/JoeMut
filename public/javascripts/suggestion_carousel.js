"use strict";

var items = document.querySelectorAll('.carousel .carousel-item');
items.forEach(function (el) {
  var minPerSlide = 4;
  var next = el.nextElementSibling;
  for (var i = 1; i < minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = items[0];
    }
    var cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }
});