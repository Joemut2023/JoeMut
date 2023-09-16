const password = document.getElementById("password");
const show = document.getElementById("btn-password");
const formElt = document.querySelector('#form');

show.addEventListener("click", function (e) {
  e.preventDefault();

  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  if (password.getAttribute("type") === "password") show.textContent = "Show";
  else show.textContent = "Hide";
});

// formElt.addEventListener('submit',async (e)=>{
//   e.preventDefault();
//   await login_process('mon-compte');
// })
