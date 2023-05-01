const button1 = document.querySelector(".btn-tab-1");
const button2 = document.querySelector(".btn-tab-2");
const button3 = document.querySelector(".btn-tab-3");
const button4 = document.querySelector(".btn-tab-4");

const input_file = document.querySelector(".inputfile");


button1.addEventListener("click", function () {
  button1.classList.add("clicked");
  button2.classList.remove("clicked");
  button3.classList.remove("clicked");
  button4.classList.remove("clicked");
});

button2.addEventListener("click", function(){
    button1.classList.remove("clicked")
    button2.classList.add("clicked")
    button3.classList.remove("clicked")
    button4.classList.remove("clicked")
})

button3.addEventListener("click", function () {
  button1.classList.remove("clicked");
  button3.classList.add("clicked");
  button2.classList.remove("clicked");
  button4.classList.remove("clicked");
});

button4.addEventListener("click", function () {
  button1.classList.remove("clicked");
  button4.classList.add("clicked");
  button2.classList.remove("clicked");
  button3.classList.remove("clicked");
});

