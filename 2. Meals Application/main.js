const mealsEl = document.getElementById("meals");

const favoriteContainer = document.getElementById("fav-meals");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

const mealPopup = document.getElementById("meal-popup");
const popupCloseBtn = document.getElementById("close-popup");

const mealInfoEl = document.getElementById("meal-info");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const respp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const respData = await respp.json();
  const randomMeal = respData.meals[0];

  // console.log(randomMeal);

  addMeal(randomMeal, (random = true));
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const respData = await resp.json();
  const meal = respData.meals[0]; /* why always [0] */
  return meal;
}

async function getMealsBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const meal = respData.meals[0]; //[0] => error [1] => not, but undefined

  console.log(meal);

  return meal;
}

function addMeal(mealData, random = false) {
  console.log(mealData);

  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
  
  <div class="meal-header">
    ${
      random === true
        ? `<span class="random"> Random Recipe </span> `
        : "=String Value"
    }
    <img
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
    />
  </div>
  
  <div class="meal-body">
    <h4>${mealData.strMeal}</h4>
    <button class="fav-btn">
      <i class="fas fa-heart"></i>
    </button>
  </div>
    

    `;

  const btn = meal.querySelector(".meal-body .fav-btn");

  btn.addEventListener("click", () => {
    // alert("You choosed favorite meal.");

    if (btn.classList.contains("activee") === true) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("activee");
    } else {
      setMealLS(mealData.idMeal);
      btn.classList.add("activee");
    }

    //clean the container, but we can do this upper
    // favoriteContainer.innerHTML = "";
    fetchFavMeals(); //we need to clean it from local storage.

    // btn.classList.toggle("active");
  });

  ///displaying <3 in proper way, without this code.
  // meal.addEventListener("click", () => {
  //   showMealInfo(mealData);
  // });

  mealsEl.appendChild(meal);
}

//////////////////////////// Async and await function. More Informations?.
////////////////////////////

function getMealsLS() {
  const mealIdsss = JSON.parse(sessionStorage.getItem("key"));

  // if(mealIdsss === null){
  // return [];
  // } else {
  //   return mealIdsss;
  // }

  return mealIdsss === null ? [] : mealIdsss;
}

function setMealLS(mealId) {
  const key = getMealsLS();

  // key.push(mealId);
  // sessionStorage.setItem("key", key);

  sessionStorage.setItem("key", JSON.stringify([...key, mealId])); /* ...key? */
  //CANNOT ACCEES key before initialiyation const key = getMealsLS();
}

function removeMealLS(mealId) {
  const key = getMealsLS();

  sessionStorage.setItem(
    "key",
    JSON.stringify(
      key.filter((id) => id !== mealId)
    ) /* details about this princip? */
  );
}

async function fetchFavMeals() {
  //clean the container. Specify logic about cleaning.
  favoriteContainer.innerHTML = "";

  const key = getMealsLS();

  const meals = [];

  for (let i = 0; i < key.length; i++) {
    const mealId = key[i];
    const meal = await getMealById(mealId);

    addMealToFav(meal);

    meals.push(meal); /* details of this principe */
  }
  // console.log(meals);
}

function addMealToFav(mealData) {
  //console.log(mealData);

  const favMeal = document.createElement("li");

  favMeal.innerHTML = ` 
    <img
    src="${mealData.strMealThumb}"
    alt="${mealData.strMeal}"/>          
           
    <span>${mealData.strMeal}</span>
   
    <button class="clear"> <i class="fa-regular fa-rectangle-xmark"></i> </button>

    `;

  const btn = favMeal.querySelector(".clear"); //Targeting the button.
  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);

    fetchFavMeals(); /*realoding again favorite meals */
  });

  favMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  favoriteContainer.appendChild(favMeal);
}

///////////////////////////////
///////////////////////////////
function showMealInfo(mealData) {
  //cleaning. More informations about cleaning principle.
  mealInfoEl.innerHTML = "";

  //update meal first, and then show it.
  const mealEl = document.createElement("div");

  const ingredients = [];
  //getting ingredients and measures.
  for (let i = 1; i < 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }

    mealEl.innerHTML = `

        <h1>${mealData.strMeal}</h1>
          <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
          />

          <p>
            ${mealData.strInstructions}
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

    mealInfoEl.appendChild(mealEl);

    //mealPopup.classList.remove("hidden");  => Kada sve isprobas, ukljuci ovaj
    mealPopup.classList.remove("hidden");
  }
}

searchBtn.addEventListener("click", async () => {
  //cleaning the space, for other values from server.
  mealsEl.innerHTML = "";

  const search = searchTerm.value;

  // console.log(await getMealsBySearch(search));

  const meals = [await getMealsBySearch(search)]; // PROBLEM SOLVED

  //meal undefined?
  //console.log(meal);

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal, (random = true));
    });
  }
});

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});
