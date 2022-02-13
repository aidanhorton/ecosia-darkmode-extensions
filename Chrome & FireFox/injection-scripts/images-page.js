// Initial injection - checks if dark mode is enabled.
chrome.storage.local.get(["settings"], injectOnLoad);

// Sets a timeout to the next minute-change.
setTimeout(function() {
    // Runs it one time first because setInterval has to wait for one minute before it can start.
    chrome.storage.local.get(["settings"], function(items) {
        if (items['settings'] !== undefined) {
            let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
            let element = document.getElementById('EcosiaDarkMode');
            if ((items['settings']['darkmode'] !== 'off') && (items['settings']['timebasedDarkmode'] === 'on') && (Number(items['settings']['sunrise']) <= totalMinutes) && (totalMinutes < Number(items['settings']['sunset']))) {
                if (element !== null) {
                    element.parentElement.removeChild(element);
                };
            } else if ((items['settings']['darkmode'] !== 'off') && (element === null)) {
                document.getElementsByTagName("head")[0].appendChild(style);
            };
        };
    });

    // Checks the time every minute.
    setInterval(function() {
        chrome.storage.local.get(["settings"], function(items) {
            if (items['settings'] !== undefined) {
                let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
                let element = document.getElementById('EcosiaDarkMode');
                if ((items['settings']['darkmode'] !== 'off') && (items['settings']['timebasedDarkmode'] === 'on') && (Number(items['settings']['sunrise']) <= totalMinutes) && (totalMinutes < Number(items['settings']['sunset']))) {
		            if (element !== null) {
                        element.parentElement.removeChild(element);
                    };
                } else if ((items['settings']['darkmode'] !== 'off') && (element === null)) {
                    document.getElementsByTagName("head")[0].appendChild(style);
                };
            };
        });
    }, 60000);
}, (60 - (new Date().getSeconds())) * 1000);

function injectOnLoad(items){
    if (items["settings"] !== undefined) {
        let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
        if ((items["settings"]['darkmode'] !== 'off') && (items["settings"]['timebasedDarkmode'] !== 'on')) {
            (document.body || document.head || document.documentElement).appendChild(style);
        } else if ((items['settings']['darkmode'] !== 'off') && (items['settings']['timebasedDarkmode'] === 'on') && !((Number(items['settings']['sunrise']) <= totalMinutes) && (totalMinutes < Number(items['settings']['sunset'])))) {
            (document.body || document.head || document.documentElement).appendChild(style);
        }
    } else {
        (document.body || document.head || document.documentElement).appendChild(style);
    }
}

// Subscribe to other necessary events.
document.addEventListener('DOMContentLoaded', changeStyleImportance, false);
chrome.runtime.onMessage.addListener(updateStyle);
 
// Moves style tag to the head once the document has loaded.
function changeStyleImportance() {
	document.removeEventListener('DOMContentLoaded', changeStyleImportance, false);
	
	let darkModeElement = document.getElementById('EcosiaDarkMode');
	if (darkModeElement != null) {
		document.getElementsByTagName('head')[0].appendChild(darkModeElement);
	}
}

// Updates the style when changes to the settings has been made.
function updateStyle(message, sender, sendResponse) {
	let element = document.getElementById('EcosiaDarkMode');
    let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();

	if (((message.data['darkmode'] === 'on') && (message.data['timebasedDarkmode'] === 'on') && (Number(message.data['sunrise']) <= totalMinutes) && (totalMinutes < Number(message.data['sunset']))) || (message.data['darkmode'] === 'off')) {
        if (element !== null) {
            element.parentElement.removeChild(element);
        }

    } else if ((message.data['darkmode'] === 'on')) {
        if (element === null) {
            document.getElementsByTagName("head")[0].appendChild(style);
        }
    }
}

let style = document.createElement('style');
style.id = "EcosiaDarkMode";
style.className = "EcosiaDarkMode";
style.type = "text/css";
style.textContent = `/* ------------------------------------------------ */
/* IMAGES - The main Ecosia search engine & results */
/* ------------------------------------------------ */

/* LOGO & MAIN STYLES */

/* Main */
.main-header__content, .layout__content {
    background: var(--dark-background) !important;
}

/* Logo */
.logo__icon > g > path:nth-child(2) {
    fill: white !important;
}

/* Notifications banner */
.banner {
	background: var(--form) !important;
}
.banner__content {
	color: var(--text) !important;
}
.banner__close:hover::after {
	background: var(--form);
}
.banner__close {
	background: var(--lighter-background) !important;
}

/* Search bar */
.search-form, input {
    background: #292929 !important;
    color: var(--text) !important;
}

/* Search suggestions */
.search-form__suggestions-list {
    background: var(--form) !important;
}
.search-form__suggestions-list a {
    color: var(--text) !important;
}
.suggestion-item.selected {
    background: var(--lighter-background) !important;
}

/* Navigation bar */
.search-navigation__item a {
    color: var(--text) !important;
}
.search-navigation__item > .tab > a:focus, .search-navigation__item > .tab > a:hover, .search-navigation__item:nth-child(2) > .tab > a {
    color: #36acb8 !important;
}
[data-track-id="nav_shopping"] {
	background: #153031 !important;
}

/* Filters */
.search-filters, .main-header {
    background: var(--dark-background);
}

/* Query chips */
.query-expansions__item {
    background: var(--form) !important;
}
.chip__text {
    color: var(--text) !important;
}
.chip__text > mark {
    color: #888 !important;
}
.query-expansions__control {
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 12%, .8) 42%, var(--dark-background) 74%) !important;
}

/* Image results */
.image-result__details-title {
    color: var(--text);
}

/* Country dropdown */
.dropdown {
    background: var(--form) !important;
    color: var(--text) !important;
    border: 1px solid;
}
.dropdown li:hover {
    background: var(--lighter-background);
}

/* Search filters */
.search-filters button {
    background: var(--dark-background) !important;
    color: var(--text) !important;
}
.search-filters button:hover {
    color: #949494 !important;
}

/* Navbar dropdowns (maps, more) */
.dropdown li:hover {
    background: var(--lighter-background) !important;
}
[data-track-id="more_wikipedia"] path, [data-track-id="more_amazon"] path {
    fill: white;
}

/* Pill buttons */
.pill {
    background: var(--dark-background) !important;
}
.personal-counter__text {
    color: var(--text) !important;
}
.icon-button:hover, .icon-button:focus {
    background: var(--lighter-background) !important;
}
.icon-button:hover path, .icon-button:focus path {
    fill: var(--text) !important;
}
.notification-pill:hover path, .notification-pill:focus path {
    fill: var(--text) !important;
}

/* Notifications dropdown */
.notifications-dropdown a {
    background: var(--form) !important;
    color: var(--text) !important;
}
.notifications-dropdown a:hover {
    background: var(--lighter-background) !important;
}

/* Hamburger dropdown */
.main-nav-menu li:hover {
    background: var(--lighter-background) !important;
}

/* No results */
.no-results {
    color: var(--text);
}

/* Mobile mode */
.panel__content {
    background: var(--form) !important;
    color: var(--text);
}
.list-item:hover {
    background: var(--lighter-background);
}
.settings-dropdown__content {
    background: var(--form);
}
.modal-dropdown__content {
    background: var(--form) !important;
}

/* ----------------------------------------------------------------------- */
/* UNIVERSAL CODE - Code used between pages -> scrollbar, variables etc... */
/* ----------------------------------------------------------------------- */

* {
    border-color: var(--border) !important; 
    scrollbar-color: #3F3F3F #1C1E1F;
    --dark-background: #181A1B;
    --form: #1F1F1F;
    --border: #595959;
    --text: #CCCCCC;
    --link: #6E9BF4;
    --link-visited: #CF70FF;
    --link-green: #71D89A;
    --lighter-background: #3F3F3F;
}
:focus {
    outline: 0;
}

/* Logo */
[aria-label="Ecosia logo"] path:nth-child(2) {
    fill: white;
}
.land-background path {
    fill: var(--dark-background);
}

/* Footer */
footer {
    background: var(--form) !important;
}

/* Scrollbar Chrome */
::-webkit-scrollbar {
    width: 15px;
}
::-webkit-scrollbar-track {
    background: #2a2a2a;
}
::-webkit-scrollbar-thumb:hover {
    background: #868686;
}
::-webkit-scrollbar-thumb {
    background: #626262;
}

::-moz-selection, ::selection {
    background: #696969;
}`;