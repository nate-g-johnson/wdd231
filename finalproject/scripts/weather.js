export async function loadWeather() {
  const weatherDiv = document.getElementById('weatherWidget');
  const apiKey = 'e642a38e855bddc7357f1ac4b8f22a54';
  const city = 'Fort Mill';
  const countryCode = 'US';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=imperial&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data.');
    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherDiv.innerHTML = `
      <h3>Current Weather</h3>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" loading="lazy" />
      <p><strong>${temp}°F</strong></p>
      <p style="text-transform: capitalize;">${description}</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = `<p>Error loading weather data.</p>`;
  }
}
