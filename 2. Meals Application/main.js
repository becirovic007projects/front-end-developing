const view = document.getElementById("view");

const unlist = document.getElementById("ul");

const srch = document.getElementById("search-id");
const srchBtn = document.getElementById("search");

const popUp = document.getElementById("popup");
const closeBtn = document.getElementById("close");

const info = document.getElementById("info");

getRandom();
getHeart();

async function getRandom() {
  const reach = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const data = await reach.json();
  const randomD = data.meals[0];

  addMeal(randomD, (random = true));
}

async function gettingID(id) {
  const reach = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const reachD = await reach.json();
  const meal = reachD.meals[0];
  return meal;
}

async function gettingSearch(term) {
  const reach = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const reachD = await reach.json();
  const meal = reachD.meals[0];

  return meal;
}

function addMeal(access, random = false) {
  const jsDiv = document.createElement("div");
  jsDiv.classList.add("viewed");

  jsDiv.innerHTML = `
  
  <div class="viewed-header">
    ${
      random === true
        ? `<span class="random"> Random Recipe </span> `
        : "=String Value"
    }
    <img
      src="${access.strMealThumb}"
      alt="${access.strMeal}"
    />
  </div>
  
  <div class="viewed-body">
    <h4>${access.strMeal}</h4>
    <button class="fav-btn">
      <i class="fas fa-heart"></i>
    </button>
  </div>
    

    `;

  const btn = jsDiv.querySelector(".viewed-body .fav-btn");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active") === true) {
      removingLS(access.idMeal);
      btn.classList.remove("active");
    } else {
      setLS(access.idMeal);
      btn.classList.add("active");
    }

    getHeart();
  });

  view.appendChild(jsDiv);
}

function getDataLS() {
  const dataId = JSON.parse(sessionStorage.getItem("key"));

  return dataId === null ? [] : dataId;
}

function setLS(dataID) {
  const key = getDataLS();

  sessionStorage.setItem("key", JSON.stringify([...key, dataID]));
}

function removingLS(dataID) {
  const key = getDataLS();

  sessionStorage.setItem(
    "key",
    JSON.stringify(key.filter((id) => id !== dataID))
  );
}

async function getHeart() {
  unlist.innerHTML = "";

  const key = getDataLS();

  const meals = [];

  for (let i = 0; i < key.length; i++) {
    const dataId = key[i];
    const meal = await gettingID(dataId);

    addingFav(meal);

    meals.push(meal);
  }
}

function addingFav(access) {
  const jsLi = document.createElement("li");

  jsLi.innerHTML = ` 
    <img
    src="${access.strMealThumb}"
    alt="${access.strMeal}"/>          
           
    <span>${access.strMeal}</span>
   
    <button class="clear"> <i class="fa-regular fa-rectangle-xmark"></i> </button>

    `;

  const btn = jsLi.querySelector(".clear");
  btn.addEventListener("click", () => {
    removingLS(access.idMeal);

    getHeart();
  });

  jsLi.addEventListener("click", () => {
    displayInfo(access);
  });

  unlist.appendChild(jsLi);
}

function displayInfo(access) {
  info.innerHTML = "";

  const jsDiv = document.createElement("div");

  const ingredients = [];

  for (let i = 1; i < 20; i++) {
    if (access["strIngredient" + i]) {
      ingredients.push(
        `${access["strIngredient" + i]} - ${access["strMeasure" + i]}`
      );
    } else {
      break;
    }

    jsDiv.innerHTML = `

        <h1>${access.strMeal}</h1>
          <img
            src="${access.strMealThumb}"
            alt="${access.strMeal}"
          />

          <p>
            ${access.strInstructions}
          </p>

        <h3>Ingredients: </h3>
         <ul>
              ${ingredients
                .map(
                  (ing) => ` 
              <li> ${ing} </li>

              `
                )
                .join("")}      
         </ul>
  
  `;

    info.appendChild(jsDiv);

    popUp.classList.remove("hidden");
  }
}

srchBtn.addEventListener("click", async () => {
  view.innerHTML = "";

  const search = srch.value;

  const meals = [await gettingSearch(search)];

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal, (random = true));
    });
  }
});

closeBtn.addEventListener("click", () => {
  popUp.classList.add("hidden");
});
