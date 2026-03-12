import { playerData } from "./playerdata.js";
import { calendarData } from "./calendardata.js";


window.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("home-button")
  homeBtn.addEventListener("click", () => loadSection("home"))
  if (homeBtn) homeBtn.click()
  document.getElementById("players-button").addEventListener("click", () => loadSection("players"))
  document.getElementById("calendar-button").addEventListener("click", () => loadSection("calendar"))
})


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
      const homeTemplate = document.getElementById("home-section-template");
      sectionContent.appendChild(homeTemplate.content.cloneNode(true));
      break;
    
    case "players":
      let playerTable =
        `
          <table class="player-data-table">
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Played matches</th>
                  <th>Playoff Locked</th>
              </tr>
        `
      playerData.forEach(function (player) {
        
        let hasPlayoff
        if (player.playoffLocked) {
          hasPlayoff = "yes"
        } else {
          hasPlayoff = "no"
        }
        
        playerTable +=
          `
              <tr>
                  <td>${player.id}</td>
                  <td>${player.name}</td>
                  <td>${player.playedMatches}</td>
                  <td>${hasPlayoff}</td>
              </tr>
          `
      })
      playerTable += `</table>`
      sectionContent.innerHTML = playerTable
      break;
    
    case "calendar":
      let calendarTable =
        `
          <table class="calendar-data-table">
              <tr>
                  <th>Jornada</th>
                  <th>VS</th>
                  <th>Fecha</th>
                  <th>Lugar</th>
                  <th>Resultado</th>
              </tr>
        ` 
      calendarData.forEach(function (matchup) {    
        calendarTable +=
          `
              <tr>
                  <td>${matchup.jornada}</td>
                  <td>${matchup.vs}</td>
                  <td>${matchup.fecha}</td>
                  <td>${matchup.lugar}</td>
                  <td>${matchup.resultado}</td>
              </tr>
          `
      })
      calendarTable += `</table>`
      sectionContent.innerHTML = calendarTable
      break;
  }
}
