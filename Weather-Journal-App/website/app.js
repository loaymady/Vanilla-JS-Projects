/* Global Variables */
const APIKEY = "03f62ead357132013adf1a7c52271b84&units=metric";
const BASEURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Main Functions
// Getting Data From https://openweathermap.org/ by apikey from it 
const getWeatherData = async (zip) => {
  const res = await fetch(`${BASEURL}${zip}&appid=${APIKEY}`).then((res) =>
    res.json()
  );
  return res;
};

//posting the data and sava that to application

const saveData = async (url, data) => {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const updateUi = async (url) => {
  const dateHolder = document.getElementById('date');
  const tempHolder = document.getElementById('temp');
  const contentHolder = document.getElementById('content');
  const response = await fetch(url)
  .then((res) => res.json())
  .then((res) => {return res})
  .catch((err) => console.error(err))

  dateHolder.innerHTML = response.date
  tempHolder.innerText = response.temperature
  contentHolder.innerHTML = response.userResponse
}
// Creating a generate data from getting it from website 
// and that function start when clicking on button generate
const generateResponse = async () => {
  const zip = document.getElementById("zip").value;
  const userResponse = document.getElementById("feelings").value;
  const temperature = await getWeatherData(zip);
  console.log(temperature);

  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = d.getMonth()+1 + "." + d.getDate() + "." + d.getFullYear();

  const data = {
    temperature: temperature.main.temp,
    date: newDate,
    userResponse,
  };
  saveData("http://localhost:3000/data", data);
  updateUi("http://localhost:3000/data")
};

// event listener when clicking on the button calling the function

document.getElementById("generate").addEventListener("click", generateResponse);
