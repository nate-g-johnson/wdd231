const apiKey = 'e642a38e855bddc7357f1ac4b8f22a54';
const city = 'Fort Mill';
const units = 'imperial';
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

const spotlightURL = 'data/members.json';

document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  fetchSpotlights();
});

// Weather: Get current + 3-day forecast
async function fetchWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) throw new Error('Weather fetch failed');

    const data = await response.json();

    const current = data.list[0];
    document.getElementById('current-temp').textContent = `Temp: ${Math.round(current.main.temp)}°F`;
    document.getElementById('current-desc').textContent = current.weather[0].description;

    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';

    const noonForecasts = data.list.filter(entry => entry.dt_txt.includes('12:00:00')).slice(0, 3);

    noonForecasts.forEach(day => {
      const li = document.createElement('li');
      const date = new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'short' });
      li.textContent = `${date}: ${Math.round(day.main.temp)}°F`;
      forecastList.appendChild(li);
    });
  } catch (err) {
    console.error('Error fetching weather:', err);
    document.getElementById('current-temp').textContent = 'Weather unavailable';
  }
}

// Spotlight members: pick 2 or 3 random gold/silver members
async function fetchSpotlights() {
  try {
    const response = await fetch(spotlightURL);
    if (!response.ok) throw new Error('Member fetch failed');

    const data = await response.json();
    const spotlightContainer = document.getElementById('spotlight-container');

    const spotlightMembers = data.filter(member =>
      ['Gold', 'Silver'].includes(member.membership)
    );

    const randomMembers = getRandomItems(spotlightMembers, 3);
    randomMembers.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('member-card');

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
        <div class="member-info">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p><strong>${member.membership} Member</strong></p>
        </div>
      `;

      spotlightContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Error fetching spotlights:', err);
  }
}

// Helper to get N random items from array
function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
