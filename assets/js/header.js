const topBar = document.querySelector(".top-bar");
const sentinal = document.querySelector(".sentinal");
const headerSticky = document.querySelector("#headerSticky");
console.log(headerSticky);

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
