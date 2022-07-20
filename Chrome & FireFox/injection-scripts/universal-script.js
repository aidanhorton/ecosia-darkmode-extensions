// Makes the background dark avoid a white flash at load.
let rootstyle = document.querySelector(':root').style;
rootstyle.setProperty('--color-background-primary', '#181A1B');

// Creates the link-elements.
let specificStyle = document.createElement('link');
specificStyle.id = 'EcosiaDarkModeSpecific';
specificStyle.className = 'EcosiaDarkMode';
specificStyle.rel = 'stylesheet';

let universalStyle = document.createElement('link');
universalStyle.id = 'EcosiaDarkModeUniversal';
universalStyle.className = 'EcosiaDarkMode';
universalStyle.rel = 'stylesheet';
universalStyle.href = chrome.runtime.getURL('injection-styling/universal-styling.css');

let styles = [universalStyle];

styles.addSpecificStyle = function(...items) {
    this.push(...items);
}


// Initial injection - gets the settings and applies them.
chrome.storage.local.get(['settings'], injectOnLoad);

// Sets a timeout to the next minute-change.
setTimeout(() => {
    // Runs it one time first because setInterval has to wait for one minute before it can start.
    intervalcheck();

    // Checks the time every minute.
    setInterval(() => {
        intervalcheck();
    }, 60000);
}, (60 - (new Date().getSeconds())) * 1000);

// Subscribe to other necessary events.
document.addEventListener('DOMContentLoaded', changeStyleImportance, false);
chrome.runtime.onMessage.addListener(updateStyle);


// Adding the styles.
function injection() {
    styles.forEach(style => {
        (document.body ?? document.head ?? document.documentElement).appendChild(style);
    });
    setTimeout(() => {
        // Removes pre-applied dark background.
        document.querySelector(':root').style = '';
    }, 200);
}


// Inject the style into the document.
function inject(styles) {
    if (styles.find(style => style.id === specificStyle.id)) {
        injection();
    }
    else {
        styles.addSpecificStyle = function(...items) {
            this.push(...items);
            injection();
        }
    }
}

// Calculate if injection should be applied, and apply if so.
function injectOnLoad(items) {
    let settings = items['settings'];
    if (settings) {
        let darkmodeOff = settings['darkmode'] === 'off';
        
        // Time-based
        let totalMinutes = new Date().getHours() * 60 + new Date().getMinutes();
        let timebasedOn = settings['timebasedDarkmode'] === 'on';
        let afterSunrise = settings['sunrise'] <= totalMinutes;
        let beforeSunset = totalMinutes < settings['sunset'];
        let notSun = timebasedOn && !(afterSunrise && beforeSunset)

        if (!darkmodeOff && (!timebasedOn || notSun)) {
            inject(styles);
        }
        else {
            // Removes pre-applied dark background.
            document.querySelector(':root').style = '';
        }
    }
    else {
        inject(styles);
    }
}

// Applied the correct theme.
function checkStyling(data) {
    let elements = document.querySelectorAll('.EcosiaDarkMode');
    let darkmodeOff = data['darkmode'] === 'off';
    
    // Time-based
    let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
    let timebasedOn = data['timebasedDarkmode'] === 'on';
    let afterSunrise = data['sunrise'] <= totalMinutes;
    let beforeSunset = totalMinutes < data['sunset'];
    let isDaytime = !darkmodeOff && timebasedOn && afterSunrise && beforeSunset;

    if (isDaytime
        || darkmodeOff
    ) {
        elements.forEach(element => {
            element.remove();
        });
    }
    else if (!darkmodeOff && !elements.length) {
        styles.forEach(style => {
            document.head.appendChild(style);
        });
    }
}

// Checks the time every minute to see if the theme needs changing.
function intervalcheck() {
    chrome.storage.local.get(['settings'], function(items) {
        checkStyling(items['settings']);
    });
}

// Moves style tag to the head once the document has loaded.
function changeStyleImportance() {
	document.removeEventListener('DOMContentLoaded', changeStyleImportance, false);

	let darkModeElements = document.querySelectorAll('.EcosiaDarkMode');
	if (darkModeElements.length) {
		darkModeElements.forEach(darkModeElement => {
            document.head.appendChild(darkModeElement);
        });
	}
}

// Updates the style when changes to the settings has been made.
function updateStyle(message, sender, sendResponse) {
	checkStyling(message.data);
}
