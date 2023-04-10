const alert = document.querySelector(".mssg");
const btn_envoi = document.querySelector(".btn_envoi");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert.style.display = "block";
});

// btn_envoi.addEventListener("click", () => {
//   alert.style.display = "block";
// });
