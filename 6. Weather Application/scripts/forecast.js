const key = "iZ8f7GskDVxYDIPR4JYLYSO1MMMAmAVB";

const getWeather = async (agent) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const queryKey = `${agent}?apikey=${key}`;

  const response = await fetch(base + queryKey);
  const data = await response.json();

  return data[0];
};

const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const queryKey = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + queryKey);
  const data = await response.json();

  return data[0];
};

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
