const chk = document.getElementById('chk');
require('dotenv').config();

const api_key = process.env.API_KEY;

chk.addEventListener('change', () => {
  document.body.classList.toggle('light-theme');
});
