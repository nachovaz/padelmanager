document.addEventListener('DOMContentLoaded', function() {

});

function loadSection (section) {
    const sectionContent = document.getElementById('section-content');
    sectionContent.innerHTML = '';

    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(function(button) {
        button.classList.remove("active");
    });

    const activeButton = document.getElementById(`${section}-button`);
    if (activeButton) {
        activeButton.classList.add("active");
    }

    switch(section) {
        case "home":
            sectionContent.innerHTML = "<h2>Home</h2>";
            break;
        case "players":
            sectionContent.innerHTML = "<h2>Players</h2>";
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
