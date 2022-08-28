const key = "iZ8f7GskDVxYDIPR4JYLYSO1MMMAmAVB";

//get weather info
const getWeather = async (agent) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/"; // ->{33028} // -> url is from web.
  const queryKey = `${agent}?apikey=${key}`;

  const response = await fetch(base + queryKey);
  const data = await response.json();

  // console.log(data);

  return data[0]; // -> returning [0] object in [array web]. better that returning all.
};

//get city info
const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search"; // -> base url of the api end point we want to make request.
  const queryKey = `?apikey=${key}&q=${city}`; // -> query parameter. we add it to the end in url, uppthere.

  //combine it together and fetch that resorse

  const response = await fetch(base + queryKey);
  const data = await response.json();

  // console.log(data[0]);

  return data[0];
};

// getCity("sarajevo")
//   .then((agent) => {
//     //console.log(agent);

//     return getWeather(agent.Key);
//   })
//   .then((agent) => {
//     console.log(agent);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// getWeather("33028"); -> instead of 33028 we want S A R A J E V O.

//LOCAL STORAGE. -> using to stay last city when refreshing  -> transfer it to forecast.js
if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
