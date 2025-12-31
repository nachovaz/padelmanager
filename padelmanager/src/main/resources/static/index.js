document.addEventListener('DOMContentLoaded', function() {

});

function loadSection (section) {
    const sectionContent = document.getElementById('section-content');
    sectionContent.innerHTML = '';

    switch(section) {
        case 'home':
            sectionContent.innerHTML = '<h2>Home</h2>';
            break;
        case 'players':
            sectionContent.innerHTML = '<h2>Players</h2>';
            break;
        case 'calendar':
            sectionContent.innerHTML = '<h2>Calendar</h2>';
            break;
        case 'match-history':
            sectionContent.innerHTML = '<h2>Match history</h2>';
            break;
    }
}
