const addInput = document.querySelector(".add");
const unlist = document.querySelector(".unlist");
const search = document.querySelector(".search input");

const template = (agent) => {
  const htmlTemplate = `

    <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${agent}</span>
          <i class="far fa-trash-alt delete"></i>
    </li>
    `;
  unlist.innerHTML += htmlTemplate;
};

addInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addInput.typed.value.trim();
  if (todo.length) {
    template(todo);
    addInput.reset();
  }
});

unlist.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

search.addEventListener("keyup", () => {
  const searchInput = search.value.trim().toLowerCase();
  filterOut(searchInput);
});

const filterOut = (agent00) => {
  Array.from(unlist.children)
    .filter((agent01) => {
      return !agent01.textContent.toLowerCase().includes(agent00);
    })
    .forEach((agent) => {
      agent.classList.add("hidden");
    });

  Array.from(unlist.children)
    .filter((agent03) => {
      return agent03.textContent.toLowerCase().includes(agent00);
    })
    .forEach((agent02) => {
      agent02.classList.remove("hidden");
    });
};
