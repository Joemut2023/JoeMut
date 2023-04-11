const myModal = document.getElementById("myModal");
const close = document.getElementById("close");
const btn_add = document.querySelectorAll(".button-ajouter");
const btn_continuer = document.querySelectorAll(".continuer");

close.addEventListener("click", () => {
  myModal.style.display = "none";
});

btn_add.forEach((element) => {
  element.addEventListener("click", async () => {
    let itemId = element.dataset.id;
    let produit = await axios.get(`${SITE_URL}/article/${itemId}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    Kart.addItem(produit.data);
    myModal.style.display = "flex";
  });
});
btn_continuer.forEach((element) => {
  element.addEventListener("click", function () {
    myModal.style.display = "none";
  });
});
