const button1 = document.querySelector(".btn-tab-1");
const button2 = document.querySelector(".btn-tab-2");
const button3 = document.querySelector(".btn-tab-3");
const button4 = document.querySelector(".btn-tab-4");

const input_file = document.querySelector(".inputfile");

const lines = document.querySelector(".lines");
const btn_add = document.querySelector(".btn-add-caracteristic");
const btns_delete = document.querySelectorAll(".delete");

console.log("buttons ", btns_delete);

// console.log("mon pere ", deleteParent);
button1.addEventListener("click", function () {
  button1.classList.add("clicked");
  button2.classList.remove("clicked");
  button3.classList.remove("clicked");
  button4.classList.remove("clicked");
});

button2.addEventListener("click", function () {
  button1.classList.remove("clicked");
  button2.classList.add("clicked");
  button3.classList.remove("clicked");
  button4.classList.remove("clicked");
});

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

function appendLine() {
  const line = document.createElement("div");
  line.classList.add("row");
  line.classList.add("line");

  line.innerHTML = `
  <div class="col-md-4">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Choisissez une caracteristique</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group has-feedback has-feedback-left">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Choisissez une valeur"
                      />
                    </div>
                  </div>
                  <div class="col-md-4 person">
                    <div class="form-group">
                      <input type="text" class="form-control" />
                      <span class="delete delete-add col-md-1">
                        <i class="fa-solid fa-trash"></i>
                      </span>
                    </div>
                  </div>
                </div>
  `;
  lines.appendChild(line);
}

btn_add.addEventListener("click", function () {
  // e.preventDefault();
  appendLine();
  console.log("buttons", btns_delete)
});

btns_delete.forEach((element) => {
  element.addEventListener("click", function () {
    console.log("BONJOUR ");
  });
});
