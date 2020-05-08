import './main.css';
const chk = document.getElementById('chk');
const searchInput = document.querySelector('.search__query--input');
const searchedRes = document.querySelector('.searched__response');
const iconData = {
  '01d': { icon: '<i class="fas fa-sun"></i>' },
  '01n': { icon: '<i class="fas fa-sun"></i>'},
  '02d': { icon: '<i class="fas fa-cloud-sun"></i>' },
  '02n': { icon: '<i class="fas fa-cloud-sun"></i>'},
  '03d': { icon: '<i class="fas fa-cloud"></i>' },
  '03n': { icon: '<i class="fas fa-cloud"></i>'},
  '04d': { icon: '<i class="fas fa-cloud-meatball"></i>' },
  '04n': { icon: '<i class="fas fa-cloud-meatball"></i>'},
  '09d': { icon: '<i class="fas fa-cloud-showers-heavy"></i>' },
  '09n': { icon: '<i class="fas fa-cloud-showers-heavy"></i>'},
  '10d': { icon: '<i class="fas fa-cloud-sun-rain"></i>' },
  '10n': { icon: '<i class="fas fa-cloud-sun-rain"></i>'},
  '11d': { icon: '<i class="fas fa-bolt"></i>' },
  '11n': { icon: '<i class="fas fa-bolt"></i>'},
  '13d': { icon: '<i class="far fa-snowflake"></i>' },
  '13n': { icon: '<i class="far fa-snowflake"></i>'},
  '50d': { icon: '<i class="fas fa-smog"></i>' },
  '50n': { icon: '<i class="fas fa-smog"></i>'},
}
const api_key = process.env.API_KEY;
const api = {
  key: api_key,
  baseUrl: "api.openweathermap.org/data/2.5/"
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
async function getSearchResults (query) {
  const loading = `<div class="box">
                      <div class="loader"></div>
                    </div>`
  searchedRes.innerHTML = loading;
  let response = await fetch(`${process.env.PROXY}${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
  let data = await CheckError(response)
  return data;
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
            ${iconData[`${weather.weather[0].icon}`].icon}
          </div>
          <p class="weather__type">${weather.weather[0].main}</p>
        </div>
  `
  searchedRes.innerHTML = dataRes;
}
function search (e) {
  if (e.keyCode === 13)
  {
    e.preventDefault();
    getSearchResults(searchInput.value).then(displayResults).catch(error=>console.log(error));
    searchInput.value = '';
    searchInput.blur();
    console.log(searchInput.value);
  }
}


chk.addEventListener('change', () => {
  document.body.classList.toggle('light-theme');
});
searchInput.addEventListener('keypress', search);

