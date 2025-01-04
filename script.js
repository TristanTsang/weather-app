const API_KEY = "LGZGQ73P3T967NDXXP7G9S2PX";

let url =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Boston,MA,USA/2025-01-03?key=" +
  API_KEY;

function stringifyDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based (0 = January)
  const day = date.getDate().toString().padStart(2, "0");
  return year + "-" + month + "-" + day;
}

async function getForecast(location) {
  const date1 = new Date();
  const date2 = new Date();
  date2.setDate(date2.getDate() + 6);

  try {
    let url =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      location +
      "/" +
      stringifyDate(date1) +
      "/" +
      stringifyDate(date2) +
      "?key=" +
      API_KEY;
    let response = await fetch(url, { mode: "cors" });
    response = await response.json();
    console.log(response);
    return response;
  } catch {
    console.log("fetch failed!");
  }
}

const dropDown = document.querySelector(".dropdown");
const currentForecast = document.querySelector("#current-forecast");
const forecast = document.querySelector("#forecast");
const body = document.querySelector("body");

dropDown.addEventListener("click", async () => {
  showDropDownMenu();
});

function renderContent(data) {
  currentForecast.innerText =
    "It is currently " +
    data.currentConditions.temp +
    " degrees fahrenheit in " +
    data.resolvedAddress;
  for (let i = 0; i < 7; i++) {
    const div = document.createElement("div");
    div.classList.add("day");
    const title = document.createElement("h3");
    title.textContent = data.days[i].datetime;
    const description = document.createElement("div");
    description.textContent = data.days[i].description;
    const high = document.createElement("h4");
    high.textContent = "High: ";
    const highData = document.createElement("div");
    highData.textContent = data.days[i].tempmax;
    const low = document.createElement("h4");
    low.textContent = "Low: ";
    const lowData = document.createElement("div");
    lowData.textContent = data.days[i].tempmin;

    div.append(title, description, high, highData, low, lowData);
    forecast.appendChild(div);
  }
}
function showLoadingBar() {
  currentForecast.innerText = "Loading...";
}
function hideLoadingBar() {
  currentForecast.innerText = "";
}

function createDropDownMenu() {
  const div = document.createElement("div");
  div.classList.add("dropdown-menu");
  const boston = document.createElement("button");
  const nyc = document.createElement("button");
  const collegePark = document.createElement("button");
  const sanFrancisco = document.createElement("button");

  boston.textContent = "Boston";
  nyc.textContent = "New York City";
  collegePark.textContent = "College Park";
  sanFrancisco.textContent = "San Francisco";

  boston.addEventListener("click", () => {
    handleButtonClick("Boston,MA");
  });
  nyc.addEventListener("click", () => {
    handleButtonClick("NewYorkCity,NY");
  });
  collegePark.addEventListener("click", () => {
    handleButtonClick("CollegePark,MD");
  });
  sanFrancisco.addEventListener("click", () => {
    handleButtonClick("SanFrancisco,CA");
  });
  div.append(collegePark, boston, nyc, sanFrancisco);
  document.querySelector("#dropdown").appendChild(div);
  div.style.display = "none";
  return div;
}

const dropDownMenu = createDropDownMenu();
function showDropDownMenu() {
  dropDownMenu.style.display = "flex";
}
function hideDropDownMenu() {
  dropDownMenu.style.display = "none";
}

async function handleButtonClick(location) {
  hideDropDownMenu();
  forecast.innerHTML = "";
  showLoadingBar();
  let data = await getForecast(location);
  hideLoadingBar();
  renderContent(data);
}
