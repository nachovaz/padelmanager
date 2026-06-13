import { playerData } from "../data/playerdata.js";
import { calendarData } from "../data/calendardata.js";
import {
  BallLiveliness,
  weatherIcon,
  weatherDescription,
} from "./weatherConditions.js";

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

          <div id="weather-holder" class="dashboard-card">
            <h2 class="card-title">Conditions</h2>
            <div id="weather-data"></div>
          </div>

          <div id="upcoming-events-holder" class="dashboard-card">
            <h2 class="card-title">Upcoming events</h2>
            <ul id="upcoming-events-list"></ul>
          </div>

          <div id="game-conditions" class="dashboard-card">
            <h2 class="card-title">Ball liveliness</h2>
            <div id="ball-liveliness-bar">
              <span id="liveleness-low">LOW</span>
              <span id="liveleness-normal">NORMAL</span>
              <span id="liveleness-high">HIGH</span>
            </div>
          </div>
        </div>
        `;
      fetchWeather();
      fetchNextEvents();
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
                  <th>Match</th>
                  <th>VS</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Venue</th>
                  <th>Result</th>
              </tr>
        `;
      calendarData.forEach(function (matchup) {
        calendarTable += `
              <tr>
                  <td>${matchup.jornada}</td>
                  <td>${matchup.vs}</td>
                  <td>${matchup.fecha}</td>
                  <td>${matchup.hora}</td>
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
      const temperature2m = data.current.temperature_2m;
      const relativeHumidity2m = data.current.relative_humidity_2m;
      const weatherCode = data.current.weather_code;
      const liveliness = BallLiveliness(temperature2m, relativeHumidity2m);
      const icon = weatherIcon(weatherCode);
      const weatherDesc = weatherDescription(weatherCode);
      document.getElementById("weather-data").innerHTML = `
              <span class="weather-desc"><i class="fa-solid ${icon} weather-icon"></i>${weatherDesc}</span>
              <span class="weather-temp"><i class="fa-solid fa-temperature-half"></i> ${temperature2m}°C</span>
              <span class="weather-humidity"><i class="fa-solid fa-droplet"></i> ${relativeHumidity2m}%</span>
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
      document.getElementById("weather-data").innerHTML =
        `<p class="weather-error">Could not load weather</p>`;
    });
}

//Función para obtener la lista de próximos eventos
function fetchNextEvents() {
  const actualDate = new Date();
  const upcomingEvents = calendarData
    .map((matchup) => {
      const [d, m, y] = matchup.fecha.split("/").map(Number);
      const [h, min] = matchup.hora.split(":").map(Number);
      return { ...matchup, dateObj: new Date(y, m - 1, d, h, min) };
    })
    .filter((matchup) => matchup.dateObj >= actualDate)
    .sort((a, b) => a.dateObj - b.dateObj)
    .slice(0, 3);

  const eventList = document.getElementById("upcoming-events-list");

  if (upcomingEvents.length === 0) {
    eventList.innerHTML = `<li class="no-events">No upcoming events</li>`;
  } else {
    upcomingEvents.forEach((match) => {
      eventList.innerHTML += `
      <li>
        vs <span class="event-vs"> ${match.vs} </span>
        on <span class="event-date"> ${match.fecha.split("/").slice(0, 2).join("/")} </span>
        at <span class="event-time"> ${match.hora} </span>
        - <span class="event-place"> ${match.lugar} </span>
      </li>`;
    });
  }
}
