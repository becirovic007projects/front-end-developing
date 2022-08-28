const cityForm = document.querySelector("form");

const updateCity = async (city) => {
  // console.log(city);
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    // cityDetails: cityDetails,
    // weather: weather,
    //when propery name and value have same name, we can do this

    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (event) => {
  //stopping the refreshing the page
  event.preventDefault();

  //get the city value -> what user typed in form.
  const city = cityForm.cityTzSalt.value.trim(); // name of input name = "city" // cutting white space.
  cityForm.reset(); // cleaning form fields

  //update browser with that city informations
  updateCity(city)
    .then((agentDetailWeather) => {
      console.log(agentDetailWeather);
      updateUI(agentDetailWeather);
    })
    .catch((error) => {
      console.log(error);
    });

  // LOCAL STORAGE SECTION. setting users input into local storage.
  localStorage.setItem("city", city);
});

const card = document.querySelector(".card");
const details = document.querySelector(".details");

const updateUI = (data) => {
  //   console.log(data);

  //   const cityDetails = data.cityDetails;
  //   const weather = data.weather;

  //destructure properties, doing same thing as this before.

  const { cityDetails, weather } = data;

  //update details template
  details.innerHTML = `
         <h5 class="my-3">${cityDetails.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText} </div>
          <div class="display-4 my-4">
            <span> ${weather.Temperature.Metric.Value} </span>
            <span>&deg;C</span>
          </div>
  `;

  //update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  // umjesto ovoga koristiti cemo ternary operator.
  // let timeSrc = null;
  // // if (weather.IsDayTime) {
  // //   timeSrc = "img/day.svg";
  // // } else {
  // //   timeSrc = "img/night.svg";
  // // }

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSrc);

  //removing the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

//adding images, references
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

// // logic of ternary operator, this is how it works.
// const result = true ? "value 1" : "value 2";
// console.log(result);
