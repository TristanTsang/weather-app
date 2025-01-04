const API_KEY = "LGZGQ73P3T967NDXXP7G9S2PX";

let url =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Boston,MA,USA/2025-01-03?key=" +
  API_KEY;

async function getForecast(location) {
  try {
    let url =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      location +
      "/2025-01-03?key=" +
      API_KEY;
    let response = await fetch(url, { mode: "cors" });
    response = await response.json();
    console.log(response);
    return response;
  } catch {
    console.log("fetch failed!");
  }
}

let data = getForecast("Boston,MA,USA");
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
    console.log(data.days[0]);
    const div = document.createElement("div");
    div.classList.add("day");
    const title = document.createElement("h3");
    title.textContent = data.days[0].datetime;
    const description = document.createElement("div");
    description.textContent = data.days[0].description;
    const high = document.createElement("h4");
    high.textContent = "High: ";
    const highData = document.createElement("div");
    highData.textContent = data.days[0].tempmax;
    const low = document.createElement("h4");
    low.textContent = "Low: ";
    const lowData = document.createElement("div");
    lowData.textContent = data.days[0].tempmin;

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
  div.append(boston, nyc, collegePark, sanFrancisco);
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
  console.log(location);
  hideDropDownMenu();
  forecast.innerHTML = "";
  showLoadingBar();
  let data = await getForecast(location);
  hideLoadingBar();
  renderContent(data);
}