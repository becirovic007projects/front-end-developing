const addForm = document.querySelector(".add");
const lista = document.querySelector(".radnje");
const search = document.querySelector(".search input");

const generateTemplate = (agent) => {
  const htmlTemplate = `

    <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${agent}</span>
          <i class="far fa-trash-alt delete"></i>
    </li>
    `;
  lista.innerHTML += htmlTemplate;
  // -> Na bosanskom. Respect for Bosnia forever.
  // const ubaciLi = (agent) => {
  //   const htmlUbacivanjeLi = `
  //   <li
  //           class="list-group-item d-flex justify-content-between align-items-center"
  //         >
  //           <span>${agent}</span>
  //           <i class="delete far fa-trash-alt"></i>
  //    </li>
  //   `;
  //   lista.append(htmlUbacivanjeLi);
  // };
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.dodaj.value.trim(); // -> name = "dodaj" . -> trim() is method, used on strings, to remove any whitespace.
  if (todo.length) {
    // -> for stopping adding empty to list. todo.length, means if this is a positive integer(1,2,3..), BUT Im not here, its a storyy aboout doog very goood doog. Cabrala ludi Youtube. if user entered something it will be, it is going to return true.
    generateTemplate(todo);
    addForm.reset(); // -> reseting all the input fields inside the form. removing text.
  }
  // console.log(todo);
});

//deleting todos.
lista.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // -> when we click it, if e.target class list contains delete class.
    e.target.parentElement.remove(); // -> going to <li> who is parent element and removing it.
  }
});

// -> keyup event.
search.addEventListener("keyup", () => {
  const searchInput = search.value.trim().toLowerCase(); // -> it is users input with cutted spaces.
  filtriraj(searchInput);
});

// const forma = document.querySelector(".add");
// forma.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const tekstUser = forma.dodaj.value.trim(); // -> name = "dodaj"
//   if (tekstUser.length) {
//     lista.append(tekstUser);
//   }
// });

const filtriraj = (agent00) => {
  Array.from(lista.children)
    .filter((agent01) => {
      return !agent01.textContent.toLowerCase().includes(agent00);
    })
    .forEach((agent) => {
      agent.classList.add("nemaa");
    });

  Array.from(lista.children)
    .filter((agent03) => {
      return agent03.textContent.toLowerCase().includes(agent00);
    })
    .forEach((agent02) => {
      agent02.classList.remove("nemaa");
    });
};
