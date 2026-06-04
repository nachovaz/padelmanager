import { playerData } from "../data/playerdata.js";
import { calendarData } from "../data/calendardata.js";

window.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("home-button");
  homeBtn.addEventListener("click", () => loadSection("home"));
  if (homeBtn) homeBtn.click();
  document
    .getElementById("players-button")
    .addEventListener("click", () => loadSection("players"));
  document
    .getElementById("calendar-button")
    .addEventListener("click", () => loadSection("calendar"));
});

function loadSection(section) {
  const sectionContent = document.getElementById("section-content");
  sectionContent.innerHTML = "";

  const allButtons = document.querySelectorAll(".nav-btn");
  allButtons.forEach(function (button) {
    button.classList.remove("active");
  });

  const activeButton = document.getElementById(`${section}-button`);
  if (activeButton) {
    activeButton.classList.add("active");
  }

  switch (section) {
    case "home":
      sectionContent.innerHTML = `
        <div id="home-elements-container">
          <h2 id="team-name">Padel Oviedo B</h2>

          <div id="weather-holder">
            <h2>Weather in Oviedo:</h2>
            <div id="weather-data"></div>
            <div id="game-conditions">
              <h2>Ball liveliness:</h2>
              <div id="ball-liveliness-bar">
                <span id="liveleness-low">LOW</span>
                <span id="liveleness-normal">NORMAL</span>
                <span id="liveleness-high">HIGH</span>
              </div>
            </div>
          </div>

          <div id="time-next-match">
            <h2>Next events:</h2>
          </div>
        </div>
        `;
      fetchWeather();
      break;

    case "players":
      let playerTable = `
          <table class="player-data-table">
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Played matches</th>
                  <th>Playoff Locked</th>
              </tr>
        `;
      playerData.forEach(function (player) {
        let hasPlayoff;
        if (player.playoffLocked) {
          hasPlayoff = "yes";
        } else {
          hasPlayoff = "no";
        }

        playerTable += `
              <tr>
                  <td>${player.id}</td>
                  <td>${player.name}</td>
                  <td>${player.playedMatches}</td>
                  <td>${hasPlayoff}</td>
              </tr>
          `;
      });
      playerTable += `</table>`;
      sectionContent.innerHTML = playerTable;
      break;

    case "calendar":
      let calendarTable = `
          <table class="calendar-data-table">
              <tr>
                  <th>Jornada</th>
                  <th>VS</th>
                  <th>Fecha/Hora</th>
                  <th>Lugar</th>
                  <th>Resultado</th>
              </tr>
        `;
      calendarData.forEach(function (matchup) {
        calendarTable += `
              <tr>
                  <td>${matchup.jornada}</td>
                  <td>${matchup.vs}</td>
                  <td>${matchup.fecha}</td>
                  <td>${matchup.lugar}</td>
                  <td>${matchup.resultado}</td>
              </tr>
          `;
      });
      calendarTable += `</table>`;
      sectionContent.innerHTML = calendarTable;
      break;
  }
}

//Función para obtener el tiempo
function fetchWeather() {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=43.36&longitude=-5.85&current=temperature_2m,relative_humidity_2m,weather_code",
  )
    .then((res) => res.json())
    .then((data) => {
      const temperature_2m = data.current.temperature_2m;
      const relative_humidity_2m = data.current.relative_humidity_2m;
      const weather_code = data.current.weather_code;
      const liveliness = BallLiveliness(temperature_2m, relative_humidity_2m);
      const icon = weatherIcon(weather_code);
      const weatherDesc = weatherDescription(weather_code);
      document.getElementById("weather-data").innerHTML = `
              <span class="weather-desc"><i class="fa-solid ${icon} weather-icon"></i>${weatherDesc}</span>
              <span class="temp-humidity-holder">
                <span class="weather-temp"><i class="fa-solid fa-temperature-half"></i> ${temperature_2m}°C</span>
                <span class="weather-humidity"><i class="fa-solid fa-droplet"></i> ${relative_humidity_2m}%</span>
              </span>
        `;

      document
        .querySelectorAll(
          "#liveleness-low, #liveleness-normal, #liveleness-high",
        )
        .forEach((el) => el.classList.remove("active"));
      document
        .getElementById(`liveleness-${liveliness}`)
        .classList.add("active");
    })
    .catch(() => {
      document.getElementById("weather-content").innerHTML =
        `<p class="weather-error">Could not load weather</p>`;
    });
}

function BallLiveliness(temp, humidity) {
  if (temp <= 10) {
    return "low";
  } else if (temp <= 16) {
    if (humidity > 70) {
      return "low";
    } else {
      return "normal";
    }
  } else if (temp <= 26) {
    if (humidity > 75) {
      return "low";
    } else if (humidity < 35) {
      return "high";
    } else {
      return "normal";
    }
  } else if (temp <= 33) {
    if (humidity > 70) {
      return "normal";
    } else {
      return "high";
    }
  } else {
    if (humidity > 60) {
      return "normal";
    } else {
      return "high";
    }
  }
}

//Función para cambiar el icono según el weather code que obtengamos
function weatherIcon(code) {
  switch (true) {
    case code === 0:
      return "fa-sun";
    case code <= 2:
      return "fa-cloud-sun";
    case code <= 3:
      return "fa-cloud";
    case code <= 48:
      return "fa-smog";
    case code <= 67:
      return "fa-cloud-rain";
    case code <= 77:
      return "fa-snowflake";
    case code <= 82:
      return "fa-cloud-showers-heavy";
    case code <= 86:
      return "fa-snowflake";
    default:
      return "fa-cloud-bolt";
  }
}

//Función para devolver un texto descriptivo del tiempo
function weatherDescription(code) {
  if (code === 0) return "Clear sky";
  if (code <= 2) return "Partly cloudy";
  if (code <= 3) return "Overcast";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorm";
}
