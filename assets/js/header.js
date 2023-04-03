const topBar = document.querySelector(".top-bar");
const sentinal = document.querySelector(".sentinal");
const headerSticky = document.querySelector("#headerSticky");
const userIcone = document.querySelector("#user-title-Dropdown");
const dropDown = document.querySelector("#user-menu-Dropdown");

const handler = (entries) => {
  if (!entries[0].isIntersecting) {
    headerSticky.style.display = "block";
    sentinal.style.display = "none";
  } else {
    headerSticky.style.display = "none";
    sentinal.style.display = "flex";
  }
};

// create the observer
const observer = new window.IntersectionObserver(handler);
// give the observer some dom nodes to keep an eye on
observer.observe(topBar);
userIcone.addEventListener(
  "mouseenter",
  (event) => {
    dropDown.style.display = "block";
    dropDown.style.opacity = "1";
    dropDown.style.transform = "scaleY(1)";
    dropDown.style.transformOrigin = "top";
  }
  // highlight the mouseenter target
);
dropDown.addEventListener(
  "mouseout",
  (event) => {
    // dropDown.style.opacity = "0";
    // dropDown.style.transform="scaleY(0)";
    dropDown.style.display = "none";
  }
  // highlight the mouseenter target
);
