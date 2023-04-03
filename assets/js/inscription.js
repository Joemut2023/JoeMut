const password = document.getElementById("password");
const btn = document.getElementById("btn-action");

btn.addEventListener("click", function(e){
    e.preventDefault()

     const type = password.getAttribute("type") === "password" ? "text" : "password";
     password.setAttribute("type", type);
     
     if (password.getAttribute("type") === "password") 
        btn.textContent = "Montrer"
     else
        btn.textContent = "Cacher"
})
