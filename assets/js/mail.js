 
// import nodemailer from "nodemailer"
const mail = document.getElementById("mail");
const sender = document.querySelector(".btn-send");

sender.addEventListener("click", async function () {
//   console.log(mail);
   await axios.post(`${SITE_URL}/mail`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  // window.location.href = `${SITE_URL}/mon-compte`
  console.log('ok')

 
});
 