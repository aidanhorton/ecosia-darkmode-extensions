// Makes the background dark avoid a white flash at load
let rootstyle = document.querySelector(':root').style;
rootstyle.setProperty('--color-background-primary', '#181A1B');


// Creates the link-elements
let spesificStyle = document.createElement('link');
spesificStyle.id = "EcosiaDarkMode";
spesificStyle.className = "EcosiaDarkMode";
spesificStyle.rel = 'stylesheet';

let universalStyle = document.createElement('link');
universalStyle.id = "EcosiaDarkModeUniversal";
universalStyle.className = "EcosiaDarkMode";
universalStyle.rel = 'stylesheet';
universalStyle.href = chrome.runtime.getURL('injection-styling/universal-styling.css');

let styles = [universalStyle];


// Initial injection - gets the settings and applies them.
chrome.storage.local.get(["settings"], injectOnLoad);

function inject(styles) {
    styles.forEach(style => {
        (document.body || document.head || document.documentElement).appendChild(style);
    });
    setTimeout(() => {
        document.querySelector(':root').style = '';
    }, 200);
}

function injectOnLoad(items) {
    if (items['settings']) {
        let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();

        let darkmodeOff = items['settings']['darkmode'] === 'off';
        let timebasedOn = items['settings']['timebasedDarkmode'] === 'on';
        let afterSunrise = Number(items['settings']['sunrise']) <= totalMinutes;
        let beforeSunset = totalMinutes < Number(items['settings']['sunset']);
        
        if (!darkmodeOff && !timebasedOn) {
            inject(styles);
        }
        else if (!darkmodeOff && timebasedOn && !(afterSunrise && beforeSunset)) {
            inject(styles);
        }
        else {
            document.querySelector(':root').style = '';
        }
    }
    else {
        inject(styles);
    }
}


// Applied the correct theme
function checkStyling(data) {
    let elements = document.querySelectorAll('.EcosiaDarkMode');
    let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
        
    let darkmodeOff = data['darkmode'] === 'off';
    let timebasedOn = data['timebasedDarkmode'] === 'on';
    let afterSunrise = Number(data['sunrise']) <= totalMinutes;
    let beforeSunset = totalMinutes < Number(data['sunset']);
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

// Checks the time every minute to see if the theme needs changing
function intervalcheck() {
    chrome.storage.local.get(["settings"], function(items) {
        checkStyling(items['settings']);
    });
}

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
