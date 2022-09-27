const cityForm = document.querySelector("form");

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityForm.cityTzSalt.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((detailWeather) => {
      console.log(detailWeather);
      updateUI(detailWeather);
    })
    .catch((error) => {
      console.log(error);
    });

  localStorage.setItem("city", city);
});

const card = document.querySelector(".card");
const details = document.querySelector(".details");

const updateUI = (data) => {
  const { cityDetails, weather } = data;

  details.innerHTML = `
         <h5 class="my-3">${cityDetails.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText} </div>
          <div class="display-4 my-4">
            <span> ${weather.Temperature.Metric.Value} </span>
            <span>&deg;C</span>
          </div>
  `;

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
