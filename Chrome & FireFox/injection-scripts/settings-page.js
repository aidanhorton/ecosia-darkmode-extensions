// Initial injection - checks if dark mode is enabled.
chrome.storage.local.get(["darkMode"], injectOnLoad);

function injectOnLoad(items){
    if (items["darkMode"] != 'off') {
		(document.body || document.head || document.documentElement).appendChild(style);
	}
}

// Subscribe to other necessary events.
document.addEventListener('DOMContentLoaded', changeStyleImportance, false);
chrome.runtime.onMessage.addListener(toggleStyle);
 
// Moves style tag to the head once the document has loaded.
function changeStyleImportance(){
	document.removeEventListener('DOMContentLoaded', changeStyleImportance, false);
	
	var darkModeElement = document.getElementById('EcosiaDarkMode');
	if (darkModeElement != null) {
		document.getElementsByTagName('head')[0].appendChild(darkModeElement);
	}
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
style.textContent = `/* -------------------------------------------------------------- */
/* SETTINGS PAGE - Select 'settings' in the tree-counter dropdown */
/* -------------------------------------------------------------- */

/* HEADER BAR */
/* Logo */
.logo path:nth-child(2) {
    fill: white;
}

/* Search bar */
.search-form, .search-form input {
    background: #272727 !important;
    color: var(--text) !important;
}
.suggestions-wrapper li, .suggestion-list {
    background: var(--form) !important;
}
.suggestions-wrapper li:hover {
    background: var(--lighter-background) !important;
}
.suggestions-wrapper a {
    color: var(--text) !important;
}
.main-header__content {
    background: var(--dark-background) !important;
}

/* Main page */
.settings {
    background: var(--dark-background);
}
h1 {
    color: var(--text) !important;
}
.field__details > label {
    color: var(--link);
}
.layout__content {
    background: var(--dark-background) !important;
}

/* Page dropdowns */
input, .list > li, .list > li:focus, .list > li:active {
    background: var(--form);
    color: var(--text) !important;
}
.list > li:hover {
    background: var(--lighter-background);
}
.select__options {
    background: var(--form) !important;
}

/* Nav bar */
.search-navigation a {
    color: var(--text) !important;
}
.search-navigation a:hover, .tab--highlighted a {
    color: #36acb8 !important;
}
[data-track-id="more_wikipedia"] path, [data-track-id="more_amazon"] path {
    fill: var(--text);
}

/* Dropdowns */
.dropdown {
    background: var(--form) !important;
    color: var(--text) !important;
    border: 1px solid;
}
.dropdown li:hover {
    background: var(--lighter-background) !important;
}
.list-item > a {
    color: var(--text) !important;
}

/* Tree counter */
.personal-counter button {
    background: var(--dark-background) !important;
}
.personal-counter button:hover {
    background: var(--lighter-background) !important;
}
.personal-counter span {
    color: var(--text) !important;
}

/* Notifications */
.notifications button {
    background: var(--dark-background) !important;
}
.notifications button:hover {
    background: var(--lighter-background) !important;
}
.notifications-dropdown a {
    background: var(--form) !important;
    color: var(--text) !important;
}
.notifications-dropdown a:hover {
    background: var(--lighter-background) !important;
}

/* Burger menu */
.main-nav button {
    background: var(--dark-background) !important;
}
.main-nav button:hover {
    background: var(--lighter-background) !important;
}

/* Mobile mode */
.settings__content {
    background: var(--dark-background) !important;
}
.panel__content {
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