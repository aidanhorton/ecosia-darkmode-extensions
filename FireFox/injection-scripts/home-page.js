// Initial injection - checks if dark mode is enabled.
browser.storage.local.get(["darkMode"], injectOnLoad);

function injectOnLoad(items){
    if (items["darkMode"] != 'off') {
		(document.body || document.head || document.documentElement).appendChild(style);
	}
}

// Subscribe to other necessary events.
document.addEventListener('DOMContentLoaded', changeStyleImportance, false);
browser.runtime.onMessage.addListener(toggleStyle);
 
// Moves style tag to the head once the document has loaded.
function changeStyleImportance(){
	document.removeEventListener('DOMContentLoaded', changeStyleImportance, false);
	
	document.getElementsByTagName('head')[0].appendChild(document.getElementById('EcosiaDarkMode'));
}

// Toggle style on/off when toggle is activated.
function toggleStyle(message, sender, sendResponse) {
	if (message.action == 'on') {
		document.getElementsByTagName("head")[0].appendChild(style);
	}
	else if (message.action == 'off') {
		var element = document.getElementById('EcosiaDarkMode');
		element.parentElement.removeChild(element);
	}
}

var style = document.createElement('style');
style.id = "EcosiaDarkMode";
style.className = "EcosiaDarkMode";
style.type = "text/css";
style.textContent = `/* ---------------------------------------- */
/* HOMEPAGE - The main Ecosia homepage only */
/* ---------------------------------------- */

/* MAIN STYLING */
/* Main content */
body {
    background: var(--dark-background);
}
.search-section .content {
    background: linear-gradient(var(--dark-background), var(--dark-background) 90%, hsla(0, 0%, 100%, 0)) bottom no-repeat !important;
}
.search-section .content, .search-section .content h2 {
    color: var(--text);
}
.map-section {
    color: var(--text);
}
.claims-section {
    color: var(--text);
}
.land-background:after {
    background: linear-gradient(rgba(0, 0, 0, 0) 80%, var(--dark-background)) bottom no-repeat, url(https://index-assets-cdn.ecosia.org/img/5a18884.png) bottom repeat-x !important;
}
.info-section > .background {
    color: var(--lighter-background);
    background: var(--dark-background);
}
.info-section > .content {
    color: var(--text);
}
.claim.card {
    box-shadow: 0 0px 7px 0 rgba(255, 255, 255, 0.2);
    background: var(--form);
}
.container {
    background: var(--dark-background) !important;
}

/* Logo */
.logo > svg > g > path:nth-child(2) {
    fill: white;
}

/* Notifications */
.popup a {
    background: var(--form) !important;
    color: var(--text) !important;
}
.popup {
    border: 1px solid;
}
/* ---------- */


/* MENU BUTTONS */
/* Menu buttons */
.index-header button {
    background: var(--dark-background) !important;
}
.index-header button:hover, .main-nav button:focus {
    background: var(--lighter-background) !important;
}
.notifications button:hover path, .main-nav button:hover path, .notifications button:focus path, .main-nav button:focus path {
    fill: var(--text) !important;
}
.personal-counter span {
    color: var(--text) !important;
}
.personal-counter-content__notify {
    color: var(--link);
}

/* Tree dropdown */
.personal-counter__dropdown {
    background: var(--form) !important;
}

/* Notifications dropdown */
.notifications-dropdown {
    border: 1px solid var(--lighter-background) !important;
    background: var(--dark-background) !important;
}
.notifications a {
    background: var(--form) !important;
    color: var(--text) !important;
}
.notifications a:hover {
    background: var(--lighter-background) !important;
    color: var(--text) !important;
}

/* Burger dropdown */
.main-nav-menu {
    background: var(--form);
    color: var(--text);
    border: 1px solid var(--lighter-background);
}
.main-nav-menu li:hover {
    background: var(--lighter-background);
}
/* ---------- */


/* SEARCH BAR */
/* Search form */
[aria-label="Search Form"] {
    background: #272727 !important;
    color: var(--text) !important;
}

/* Typeahead */
.suggestion-list {
    background: var(--form) !important;
}
.suggestions-wrapper li {
    background: var(--form) !important;
}
.suggestions-wrapper li:hover {
    background: var(--lighter-background) !important;
}
.suggestions-wrapper a {
    color: var(--text) !important;
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