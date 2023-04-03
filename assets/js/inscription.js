const password = document.getElementById("password");
const btn_hide_cache = document.getElementById(".btn-action");
const form = document.querySelector('#form')

form.addEventListener("submit", function(e){
    e.preventDefault()
})

btn_hide_cache.addEventListener("click", function (e) {
  console.log("bonjour");
  //   if (password.type === "password") {
  //     password.type = "text";
  //     btn_hide_cache.textContent = "Cacher";
  //   } else {
  //     password.type = "password";
  //     btn_hide_cache.textContent = "Montrer";
  //   }
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
});
