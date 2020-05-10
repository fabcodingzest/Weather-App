import './main.css';
// Selecting Theme toggle, search Form and div where fetched API results are to be displayed from DOM
const chk = document.querySelector('.label');
const searchInput = document.querySelector('.search__query--input');
const searchedRes = document.querySelector('.searched__response');

// Icons to display according to the icon-ID recieved by API
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
// Accessing API from environment variables
const api_key = process.env.API_KEY;
const api = {
  key: api_key,
  baseUrl: "api.openweathermap.org/data/2.5/"
}
// Function to display No results found when the search query is invalid
function CheckError (response) {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  } else {
    const dataNotFound = `<p class="default">No results found, Please search for another city</p>`
    searchedRes.innerHTML = dataNotFound;
    throw Error(response.statusText);
  }
}
// Asynchronous function to display loader till it fetches data from API acc to the input
async function getSearchResults (query) {
  const loading = `<div class="box">
                      <div class="loader"></div>
                    </div>`
  searchedRes.innerHTML = loading;
  let response = await fetch(`${process.env.PROXY}${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
  let data = await CheckError(response)
  return data;
}
// A date function to display date in 'Day, date month year' format from date recieved from API
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
// Results fetched from the API and injecting them into DOM
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
// Search function when enter/return is pressed
function search (e) {
  if (e.keyCode === 13)
  {
    e.preventDefault();
    // Get results from api asynchronously and catching any error if it exists 
    getSearchResults(searchInput.value).then(displayResults).catch(error=>console.log(error));
    searchInput.value = '';
    // Remove the keyboard after pressing enter on mobile devices
    searchInput.blur();
  }
}

// Event Listener for dark-light theme toggle
chk.addEventListener('click', () => {
  console.log(document.querySelector('.ball').classList.toggle('toggle'))
  document.body.classList.toggle('light-theme');
});
// Event listener for search 
searchInput.addEventListener('keypress', search);

