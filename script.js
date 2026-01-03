const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".Time_location p");
const dateandTimeField = document.querySelector(".Time_location span");
const weatherField = document.querySelector(".condition");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

let target = "Mumbai";

form.addEventListener("submit", searchForLocation);

const fetchResults = async (targetLocation) => {
  let url = `http://api.weatherapi.com/v1/current.json?key=a41b8e3d02ba4fb999863254260301&q=${targetLocation}&aqi=no`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  let locationName = data.location.name;
  let time = data.location.localtime;
  let temp = data.current.temp_c;
  let condition = data.current.condition.text;

  updateDetails(temp, locationName, time, condition);
};

function updateDetails(temp, locationName, time, condition) {
  let splitDate = time.split(" ")[0];
  let splitTime = time.split(" ")[1];
  let currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.innerText = `${temp} °C`;
  locationField.innerText = locationName;
  dateandTimeField.innerText = `${currentDay}, ${splitDate} ${splitTime}`;
  weatherField.innerText = condition;
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchResults(target);
}

function getDayName(number) {
  switch (number) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
  }
}

fetchResults(target);