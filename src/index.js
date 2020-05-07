import './main.css';
const chk = document.getElementById('chk');
const searchInput = document.querySelector('.search__query--input');
const location = document.querySelector('.searched__response--head');
const searchedRes = document.querySelector('.searched__response');
const temp = document.querySelector('.searched__temp--res');
const weatherType = document.querySelector('.weather__type')
const dateToday = document.querySelector('.date__now--text');

const api_key = process.env.API_KEY;
const api = {
  key: api_key,
  baseUrl: "https:/api.openweathermap.org/data/2.5/"
}
function CheckError (response) {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  } else {
    const dataNotFound = `<p class="default">No results found, Please search for another city</p>`
    searchedRes.innerHTML = dataNotFound;
    throw Error(response.statusText);
  }
}
function getSearchResults (query) {
  const loading = `<div class="box">
                      <div class="loader"></div>
                    </div>`
  searchedRes.innerHTML = loading;
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`).then(CheckError).then(displayResults).catch(error =>console.log(error));
}
function datebuilder (d) {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'
  ];
  const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ];
  const year = d.getFullYear()
  const date = d.getDate()
  const monthName = months[ d.getMonth() ];
  const dayName = days[ d.getDay() ];
  return`${dayName}, ${date} ${monthName} ${year}`;
}

function displayResults (weather) {
  console.log(weather);
  let now = new Date();
  const dataRes = `
  <div class="searched__response--location">
          <div class="icon__box"><i class="fas fa-map-marker-alt"></i></div>
          <h2 class="searched__response--head">${weather.name} ${weather.sys.country}</h2>
        </div>
        <div class="date__now">
          <p class="date__now--text">
            ${datebuilder(now)}
          </p>
        </div>
        <div class="searched__temp">
          <span class="searched__temp--res">${Math.round(weather.main.temp)}</span>°C
        </div>
        <div class="searched__weather--type">
          <div class="weather__icon">
            <i class="fas fa-cloud-sun-rain"></i>
          </div>
          <p class="weather__type">${weather.weather[ 0 ].main}</p>
        </div>
  `
  searchedRes.innerHTML = dataRes;
}
function search (e) {
  if (e.keyCode === 13)
  {
    e.preventDefault();
    getSearchResults(searchInput.value);
    searchInput.value = '';
    console.log(searchInput.value);
  }
}


chk.addEventListener('change', () => {
  document.body.classList.toggle('light-theme');
});
searchInput.addEventListener('keypress', search);

