import { playerData } from "./playerdata.js";


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
      const template = document.getElementById("calendar-section-template");
      sectionContent.appendChild(template.content.cloneNode(true));
      break;
    
    case "match-history":
      sectionContent.innerHTML = "<h2>Match history</h2>";
      break;
  }
}
