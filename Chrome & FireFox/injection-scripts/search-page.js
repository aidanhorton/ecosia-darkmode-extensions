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
style.textContent = `/* ------------------------------------------------------- */
/* SEARCH ENGINE - The main Ecosia search engine & results */
/* ------------------------------------------------------- */

/* MAIN BACKGROUND */
body {
    background: var(--dark-background);
}
.search-header, .navbar-row, .results-wrapper {
    background: var(--dark-background) !important;
}

/* Background fix for 'Add Ecosia to Chrome' button */
.col-lg-4 .margin-top-base {
    background: var(--dark-background);
}
/* ---------- */


/* LOGO & SEARCH BAR */
/* Normal logo */
.logo-anchor path:nth-child(2) {
    fill: white;
}

/* Search bar */
.search-box .search-form-field {
    background: #292929;
}
.search-form input {
    color: var(--text) !important;
}
.search-form-button:focus svg path {
    fill: #767676;
}
.search-form-button:hover svg path {
    fill: #adadad;
}

/* Typeahead suggestions */
.typeahead {
    background: var(--form);
    box-shadow: 0 0px 5px 0 rgba(255, 255, 255, 0.15), 0 0px 4px 0 rgba(255, 255, 255, 0.15);
}
.typeahead a {
    color: var(--text);
}
.typeahead a:hover {
    background: var(--lighter-background);
    color: var(--text);
}
.typeahead a:visited {
    color: #8d8d8d;
}
/* ---------- */


/* NAVBAR */
/* Main navbar style */
.navbar-container a, .navbar-container a:visited {
    color: var(--text);
}
.navbar-container a:hover {
    color: #36acb8;
}
.navbar-container button {
    color: var(--text);
}

/* Navbar dropdowns */
.icons-dropdown-list li:hover {
    background: var(--lighter-background);
}
.icons-dropdown-list li:hover a, .icons-dropdown-list a:focus, .icons-dropdown-list a:active {
    color: var(--text);
}
[data-track-id="more_wikipedia"] path, [data-track-id="more_amazon"] path {
    fill: var(--text);
}

/* Filters & settings */
.flags-dropdown {
    color: var(--text);
}
.flags-dropdown-chosen {
    background: var(--form);
}
.flags-dropdown li:hover {
    background: var(--lighter-background);
}
.filter-list, .filter-list > li:focus, .filter-list a, .filter-trigger {
    background: var(--form);
    color: var(--text) !important;
}
.filter-list a:hover, .filter-list .active a {
    background: var(--lighter-background) !important;
}
.filter-trigger:hover {
    color: #8d8d8d !important;
}
/* ---------- */


/* MENU BUTTONS */
/* Tree-counter, menu main styling */
.search-header-menu-group button {
    background: var(--dark-background) !important;
}
.search-header-menu-group button:hover {
    background: var(--lighter-background) !important;
}
.notifications-center button:hover path, .notifications-center.is-open path, .search-header-dropdown button:hover path, .search-header-dropdown.is-open path {
    fill: var(--text) !important;
}
.pill-text {
    color: var(--text) !important;
}
.pill {
    background: var(--main-background-color) !important;
}

/* Tree-counter popover */
#treeCountPopover {
    background: var(--form);
    border: 1px solid;
    color: var(--text);
}

/* Notifications center */
.notifications-center-container {
    background: var(--form);
    border: 1px solid;
}
.notifications-item, .notifications-item:active, .notifications-item:focus, .notifications-item:visited {
    background: var(--form);
    color: var(--text) !important;
}
.notifications-item:hover {
    background: var(--lighter-background);
    color: var(--text);
}
.dropdown-footer-simple {
    background: var(--form);
}

/* Notifications banner */
.notifications-banner {
	background: var(--form);
}
.notifications-banner-content {
	color: var(--text) !important;
}
.notifications-banner-close:hover::after {
	background: var(--form);
}
.notifications-banner-close::after {
	background: var(--lighter-background);
}
.notifications-banner-close {
	color: var(--text) !important;
}

/* Dropdown menu */
.dropdown-menu {
    background: var(--form);
    border-bottom: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
}
.dropdown-link {
    color: var(--text) !important;
}
.dropdown-item:hover {
    background: var(--lighter-background);
}
/* ---------- */


/* RESULTS */
/* Main text result color */
.result-title, .result-title:hover, .result-title:focus {
    color: var(--link);
}
.result-title:visited {
    color: var(--link-visited);
}
.result-url, .result-url:hover, .result-url:visited, .result-url:focus {
    color: var(--link-green);
}
.result-snippet, .query-context-text, .no-results {
    color: var(--text);
}

/* Text results extra media */
.card-web .result-media .result-url {
    background: var(--form);
    border: 1px solid var(--lighter-background);
}
.result-media .thumbnail-title, .result-media-video .thumbnail-title:hover {
    color: var(--link);
}
.result-media .result-url:visited .thumbnail-title {
    color: var(--link-visited);
}
.result-media .thumbnail-publisher {
    color: var(--link-green);
}
.callout-with-image {
	background-color: var(--form) !important;
	color: var(--text) !important;
	border: 1px solid var(--border);
}
[title="Wikipedia"] path {
    fill: #CCCCCC !important;
}

/* Extra results buttons */
.result-media .slider-control {
    background: #272727;
    box-shadow: 0 0px 5px 0 rgba(255, 255, 255, 0.15), 0 0px 3px 0 rgba(255, 255, 255, 0.15);
}
.icon-button:hover {
    color: var(--text) !important;
    background: var(--lighter-background);
}
.icon-button:focus {
    color: #828282;
}

/* More results links */
.more-results-link, .more-results-link:hover, .more-results-link:visited, .more-results-link:focus {
    color: var(--link);
}
.more-results-link:visited {
    color: var(--link-visited);
}

/* Results footer */
.pagination-button:hover, .pagination-button.active, .small-footer-link:hover {
    color: var(--text);
}

/* Image results */
.image-result {
    border-color: var(--dark-background) !important;
}

/* Climate impact */
.entity-extra {
    color: var(--text);
}
.entity-extra::before {
    border-color: var(--border);
}
/* ---------- */


/* INLINE WIDGETS */
.card-news li, .card-videos li {
    background: var(--form);
    border: 1px solid;
}
.widget-container {
    border: 1px solid;
}
.widget-container div {
    background: var(--form);
    color: var(--text);
}

/* Flights */
.card-flights {
    background: var(--form);
    border: 1px solid;
}
.card-flights div, .card-flights input {
    background: var(--form) !important;
    color: var(--text);
}
.bpk-button, .ReferralButton__cta___2Yxt0 {
    background: var(--form) !important;
    color: var(--text) !important;
}

/* Polluter */
.highlighted-domain-hint-wrapper .popover {
    border: 1px solid !important;
    background: #272727 !important;
}
.highlighted-domain-hint-wrapper .popover-text {
    color: var(--text);
}

/* Attraction */
.business-listing__section {
    color: var(--text) !important;
}
.business-listing__tel-link, .business-listing-reviews__more {
	color: var(--link);
}
.business-listing__tel-link:visited, .business-listing-reviews__more:visited {
	color: var(--link-visited);
}

/* Weather */
.widget{
	background: var(--form) !important;
}
.weather-details-unit.active, .forecast-tab.active {
	color: var(--text) !important;
	font-weight: demi-bold;
}
.weather-details-unit, .forecast-tab {
	color: #4a4a4a !important;
}
.weather-details-unit:hover, .forecast-tab:hover {
	color: #666666 !important;
}
.weather-tile:hover {
	transition: background-color .1s ease-in-out;
	background: var(--lighter-background) !important;
}
.weather-tile-condition, .weather-tile-temperatures {
	background: transparent !important;
}
.weather-tile-time {
	color: #666666 !important;
}
.weather-tile.selected > .weather-tile-condition {
	background: grey !important;
}
.weather-tile.selected > time, .weather-tile:hover > .weather-tile-time {
	color: var(--text) !important;
}
/* ---------- */


/* MOBILE */
/* Main results */
.mainline-results .result, .results-page-stretcher {
    background: var(--dark-background);
}
.search-form-addon .search-form-addon-button {
    background: var(--dark-background);
    color: var(--text);
}

/* Hamburger & tree counter */
.popover-mobile {
    background: var(--form);
    color: var(--text);
}
.popover-treecounter {
    border: 1px solid;
}
.offcanvas-menu-header {
    background: var(--form);
}

/* Maps & more */
.card-desktop .card-mobile {
    background: var(--dark-background);
}
.navbar-item.hidden-desktop .navbar-link {
    color: var(--text);
}
.container.hidden-desktop .row div {
    background: var(--form);
}
#moreLinks.hidden-desktop li {
    background: var(--form);
}
#moreLinks.hidden-desktop li:hover {
    background: var(--lighter-background);
}
#moreLinks.hidden-desktop a {
    color: var(--text);
}
#mapLinks.hidden-desktop li {
    background: var(--form);
}
#mapLinks.hidden-desktop li:hover {
    background: var(--lighter-background);
}
#mapLinks.hidden-desktop a {
    color: var(--text);
}
.navbar-item-divider::before {
    border-color: var(--border);
}

/* Filters & settings */
.hidden-desktop .flags-dropdown-content {
    color: var(--text);
}
.hidden-desktop .flags-dropdown-content li:hover {
    background: var(--lighter-background);
}
/* ---------- */


/* ADVERTISEMENTS */
/* Sidebar ads */
.entity {
    border: 1px solid;
    background: var(--form);
}
.entity-disambiguation-title, .entity-disambiguation-title:hover, .entity-disambiguation-title:focus, .entity-disambiguation-title:active {
    color: var(--link);
}
.entity-description-more, .entity-description-more:hover, .entity-description-more:focus, .entity-description-more:active {
    color: var(--link);
}
.entity-disambiguation-title:visited, .entity-description-more:visited {
    color: var(--link-visited);
}
.entity-disambiguation-text, .entity-disambiguation-headline, .entity-title, .entity p {
    color: var(--text);
}
.card-top {
    background: var(--darker-background);
}

/* Sidebar shop */
.sidebar-product-ad-container {
    border: 1px solid;
    background: var(--form);
}
.sidebar-product-ad-title, .sidebar-product-ad-title:hover, .sidebar-product-ad-title:focus, .sidebar-product-ad-title:active {
    color: var(--link);
}
.sidebar-product-ad-title:visited {
    color: var(--link-visited);
}
.sidebar-product-ad-seller {
    color: var(--link-green);
}

/* Inline */
.card-productads {
    background: var(--dark-background);
}
.product-ad-heading {
    color: var(--text);
}
.product-ad li {
    background: var(--form);
    border: 1px solid;
}
.thumbnail-extra {
    color: var(--text);
}
/* ---------- */


/* MISCELLANEOUS */
/* Install add-on banner Chrome */
.serp-cta-wrapper {
    background: var(--form);
    color: var(--text);
}







/* --------------------- */
/* NEW SEARCH PAGE STYLE */
/* --------------------- */

/* LOGO & MAIN STYLES */
/* Main */
.main-header__content, .layout__content {
    background: var(--dark-background) !important;
}

/* Logo */
.logo__icon > g > path:nth-child(2) {
    fill: white !important;
}

/* Search bar */
.search-form {
    background: #292929 !important;
    color: var(--text) !important;
}

.search-form input {
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
    color: #888;
}
.query-expansions__button {
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 12%, .8) 42%, var(--dark-background) 74%) !important;
}

/* Search results */
.mainline__result {
    background: var(--dark-background) !important;
    color: var(--text); 
}
.result-title {
    color: var(--link) !important;
}
.result-title a, .result-title a:hover, .result-title a:focus {
    color: var(--link) !important;
}
.result-title a:visited {
    color: var(--link-visited) !important;
}
.result-url, .result-url:hover, .result-url:visited, .result-url:focus {
    color: var(--link-green) !important;
}
.result__source, .result__source:hover, .result__source:visited, .result__source:focus {
    color: var(--link-green) !important;
}
.result__description {
    color: var(--text);
}
.results-info {
    border-color: var(--border) !important;
}

/* Loading button */
.loading-button {
    background: var(--dark-background) !important;
}
.loading-button__content {
    color: var(--text) !important;
}

/* Country dropdown */
.dropdown {
    color: var(--text) !important;
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
.main-nav-menu {
    background: var(--form) !important;
    border: 1px solid;
}

.main-nav-menu li:hover {
    background: var(--lighter-background) !important;
}

/* No results */
.search-no-results {
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
.search-header-logo-group {
	background: var(--dark-background);
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
