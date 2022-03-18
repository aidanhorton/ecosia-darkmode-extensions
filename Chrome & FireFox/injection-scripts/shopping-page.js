// Creates the link-elements
let spesificStyle = document.createElement('link');
spesificStyle.id = "EcosiaDarkMode";
spesificStyle.className = "EcosiaDarkMode";
spesificStyle.rel = 'stylesheet';
spesificStyle.href = chrome.runtime.getURL('injection-styling/shopping-page.css');

let universalStyle = document.createElement('link');
universalStyle.id = "EcosiaDarkModeUniversal";
universalStyle.className = "EcosiaDarkMode";
universalStyle.rel = 'stylesheet';
universalStyle.href = chrome.runtime.getURL('injection-styling/universal-styling.css');

let styles = [spesificStyle, universalStyle];


// Initial injection - gets the settings and apply them.
chrome.storage.local.get(["settings"], injectOnLoad);

// Sets a timeout to the next minute-change.
setTimeout(function() {
    // Runs it one time first because setInterval has to wait for one minute before it can start.
    chrome.storage.local.get(["settings"], function(items) {
        if (items['settings'] !== undefined) {
            let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
            let elements = document.querySelectorAll('.EcosiaDarkMode');
            if ((items['settings']['darkmode'] !== 'off') && (items['settings']['timebasedDarkmode'] === 'on') && (Number(items['settings']['sunrise']) <= totalMinutes) && (totalMinutes < Number(items['settings']['sunset']))) {
                if (elements.length !== 0) {
                    elements.forEach((element) => {
                        element.parentElement.removeChild(element);
                    });
                };
            } else if ((items['settings']['darkmode'] !== 'off') && (elements.length === 0)) {
                styles.forEach((style) => {
                    document.getElementsByTagName("head")[0].appendChild(style);
                });
            };
        };
    });

    // Checks the time every minute.
    setInterval(function() {
        chrome.storage.local.get(["settings"], function(items) {
            if (items['settings'] !== undefined) {
                let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
                let elements = document.querySelectorAll('.EcosiaDarkMode');
                if ((items['settings']['darkmode'] !== 'off') && (items['settings']['timebasedDarkmode'] === 'on') && (Number(items['settings']['sunrise']) <= totalMinutes) && (totalMinutes < Number(items['settings']['sunset']))) {
		            if (elements.length !== 0) {
                        elements.forEach((element) => {
                            element.parentElement.removeChild(element);
                        });
                    };
                } else if ((items['settings']['darkmode'] !== 'off') && (elements.length === 0)) {
                    styles.forEach((style) => {
                        document.getElementsByTagName("head")[0].appendChild(style);
                    });
                };
            };
        });
    }, 60000);
}, (60 - (new Date().getSeconds())) * 1000);

function injectOnLoad(items){
    if (items["settings"] !== undefined) {
        let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
        if ((items["settings"]['darkmode'] !== 'off') && (items["settings"]['timebasedDarkmode'] !== 'on')) {
            styles.forEach((style) => {
                (document.body || document.head || document.documentElement).appendChild(style);
            });
        } else if ((items['settings']['darkmode'] !== 'off') && (items['settings']['timebasedDarkmode'] === 'on') && !((Number(items['settings']['sunrise']) <= totalMinutes) && (totalMinutes < Number(items['settings']['sunset'])))) {
            styles.forEach((style) => {
                (document.body || document.head || document.documentElement).appendChild(style);
            });
        }
    } else {
        styles.forEach((style) => {
            (document.body || document.head || document.documentElement).appendChild(style);
        });
    }
}

// Subscribe to other necessary events.
document.addEventListener('DOMContentLoaded', changeStyleImportance, false);
chrome.runtime.onMessage.addListener(updateStyle);

// Moves style tag to the head once the document has loaded.
function changeStyleImportance() {
	document.removeEventListener('DOMContentLoaded', changeStyleImportance, false);

	let darkModeElements = document.querySelectorAll('.EcosiaDarkMode');
	if (darkModeElements.length !== 0) {
		darkModeElements.forEach((darkModeElement) => {
            document.getElementsByTagName('head')[0].appendChild(darkModeElement);
        });
	}
}

// Updates the style when changes to the settings has been made.
function updateStyle(message, sender, sendResponse) {
	let elements = document.querySelectorAll('.EcosiaDarkMode');
    let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();

	if (((message.data['darkmode'] === 'on') && (message.data['timebasedDarkmode'] === 'on') && (Number(message.data['sunrise']) <= totalMinutes) && (totalMinutes < Number(message.data['sunset']))) || (message.data['darkmode'] === 'off')) {
        if (elements.length !== 0) {
            elements.forEach((element) => {
                element.parentElement.removeChild(element);
            });
        }

    } else if ((message.data['darkmode'] === 'on')) {
        if (elements.length === 0) {
            styles.forEach((style) => {
                document.getElementsByTagName("head")[0].appendChild(style);
            });
        }
    }
}
