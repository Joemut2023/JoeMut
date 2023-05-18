const inputActivation = document.querySelectorAll(".inputActivation");
const inputPartenaire = document.querySelectorAll(".inputPartenaire");
const inputNewsletter = document.querySelectorAll(".inputNewsletter");

const updateClient = async (data) => {
  try {
    axios.post(`${SITE_URL}/admin/clients/updateByCheckbox`, {
      data,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  } catch (error) {}
};
console.log(inputActivation[0]);
inputActivation.forEach((element) => {
  element.addEventListener("change", async (event) => {
    let data = {
      cli_activation: event.currentTarget.checked ? true : false,
      cli_id: element.dataset.id,
    };
    await updateClient(data);
  });
});
inputPartenaire.forEach((element) => {
  element.addEventListener("change", async (event) => {
    let data = {
      cli_partenaire: event.currentTarget.checked ? true : false,
      cli_id: element.dataset.id,
    };
    await updateClient(data);
  });
});
inputNewsletter.forEach((element) => {
  element.addEventListener("change", async (event) => {
    let data = {
      cli_newsletter: event.currentTarget.checked ? true : false,
      cli_id: element.dataset.id,
    };
    await updateClient(data);
  });
});
