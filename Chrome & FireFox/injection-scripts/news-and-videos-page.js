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
style.textContent = `/* --------------------------------------------------------------------------------------- */
/* NEWS & VIDEOS RESULTS - Only separate since styling is done separately for some reason! */
/* --------------------------------------------------------------------------------------- */

.layout__content {
    background: var(--dark-background) !important;
}

/* Main style */
.news {
    background: var(--dark-background) !important;
}
.main-header > header {
    background: var(--dark-background) !important;
}
.search-no-results {
    color: var(--text);
}

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
.list > li {
    background: var(--form);
}

/* Notifications */
.notifications button {
    background: var(--dark-background) !important;
}
.notifications button:hover {
    background: var(--lighter-background) !important;
}
.notifications button:hover path, .notifications button:focus path {
    fill: var(--text) !important;
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
.main-nav button:hover path, .main-nav button:focus path {
    fill: var(--text) !important;
}
/* ---------- */


/* FILTERS & SETTINGS */
/* Filters button */
.search-filters {
    background: var(--dark-background) !important;
}
.search-filters button {
    color: #858484 !important;
}
.search-filters button:hover {
    color: var(--text) !important;
}
.search-filters button {
    background: var(--dark-background) !important;
}

/* ---------- */

/* News cards */
.search-result-title {
    color: var(--link) !important;
}
.search-result-title a, .search-result-title a:hover, .search-result-title a:focus {
    color: var(--link) !important;
}
.search-result-title a:visited {
    color: var(--link-visited) !important;
}
.result-url, .result-url:hover, .result-url:visited, .result-url:focus {
    color: var(--link-green) !important;
}
.search-result__source, .search-result__source:hover, .search-result__source:visited, .search-result__source:focus {
    color: var(--link-green) !important;
}
.search-result__text {
    color: var(--text);
}
.results-info {
    border-color: var(--border) !important;
}
/* ---------- */


/* MOBILE */
/* News & video & filters */
.layout-card__content, .layout-card, .modal-dropdown__content {
    background: var(--dark-background) !important;
}
.search-navigation__divider {
    background: var(--border) !important;
}
.filter__selected {
    background: var(--lighter-background) !important;
}
.panel__content {
	background: var(--form) !important;
}
.list-item:hover, .list-item:active {
	background: var(--lighter-background) !important;
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