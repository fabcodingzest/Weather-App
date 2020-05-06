import './main.css';
const chk = document.getElementById('chk');
const searchInput = document.querySelector('.search__query--input');
const location = document.querySelector('.searched__response--head');
const temp = document.querySelector('.searched__temp--res');
const weatherType = document.querySelector('.weather__type')
const dateToday = document.querySelector('.date__now--text');

const api_key = process.env.API_KEY;
const api = {
  key: api_key,
  baseUrl: "https:/api.openweathermap.org/data/2.5/"
}
// const API_CALL = `api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${api_key}`;
function getSearchResults (query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`).then(response => response.json()).then(displayResults);
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
  location.textContent = `${weather.name}, ${weather.sys.country}`;
  temp.textContent = `${Math.floor(weather.main.temp)}`;
  dateToday.textContent = `${datebuilder(now)}`
  weatherType.textContent = `${weather.weather[0].main}`
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

