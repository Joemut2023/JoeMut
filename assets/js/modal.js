const myModal = document.getElementById("myModal");
const close = document.getElementById("close");
const btn_add = document.querySelectorAll(".button-ajouter");

close.addEventListener("click", () => {
  myModal.style.display = "none";
});

btn_add.forEach((element) => {
  element.addEventListener("click", function () {
    myModal.style.display = "flex";
  });
});
