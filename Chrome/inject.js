var style = document.createElement('style');
style.type = 'text/css';
style.className = 'darktheme';

chrome.storage.sync.get(["darkMode"], function(items){
    if (items["darkMode"] == 'on') {
		document.documentElement.appendChild(style);
		document.getElementsByTagName("head")[0].appendChild(link);
	}
});

window.setTimeout(injectCSS, 100);

chrome.runtime.onMessage.addListener(gotMessage);

function injectCSS(){
	chrome.storage.sync.get(["darkMode"], function(items){
		if (items["darkMode"] == 'on') {
			var element = document.querySelector('style.darktheme');
			element.parentElement.removeChild(element);
		}
	})
}

function gotMessage(message, sender, sendResponse) {
	if (message.mode == 'on') {
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	else if (message.mode == 'off') {
		var element = document.querySelector('link.darktheme');
		element.parentElement.removeChild(element);
	}
}

var link = document.createElement("link");
link.href = chrome.extension.getURL("darktheme.css");
link.type = "text/css";
link.rel = "stylesheet";
link.className = "darktheme";

// Buffer style
style.textContent = `
* {
    scrollbar-color: #3F3F3F #1C1E1F;
    --main-background-color: #181A1B;
    --form-color: #1F1F1F;
    --border-color: #595959;
    --text-color: #CCCCCC;
    --link-color: #6E9BF4;
    --link-visited-color: #CF70FF;
    --link-green-color: #71D89A;
    --darker-background-color: #3F3F3F;
}

/* Banner */
.content[target="_blank"] {
    background: transparent !important;
}

/* SVG */
.background[data-v-9cc6f52e] > path, .background[data-v-c06d85e8] path {
    fill: #404040 !important;
}

.pagination-button > svg > g > g, .video-slider-controls button > svg > g > g, .logo-anchor path:nth-child(2), .logo path:nth-child(2) {
    fill: white !important;
}

.pagination-button:hover > svg > g > g {
    transition: fill 0.2s ease-in-out !important;
    fill: var(--border-color) !important;
}

.is-open .pill svg > path, .pill:hover svg > path {
    fill: var(--text-color) !important;
}

.land-background > svg > path {
    fill: var(--darker-background-color) !important;
}

.svg-icon .background {
	fill: var(--main-background-color) !important;
}

/* Side results */
.entity-title {
    color: var(--text-color) !important;
}

[aria-label="sources"] {
    background: var(--form-color) !important;
}

/* Maths widget */
.card-computation {
    background: var(--form-color) !important;
    border: 1px solid var(--border-color) !important;
    box-shadow: 0 0 3px 0 rgba(255, 255, 255, 0.2), 0 0 3px 0 rgba(255, 255, 255, 0.2) !important;
}

.widget {
    background: var(--main-background-color) !important;
}

.widget__footer-item {
    border-top: 1px solid var(--border-color) !important;
}

/* Flights widget */
.widget-flights {
    background: var(--form-color) !important;
    box-shadow: 0 0 3px 0 rgba(255, 255, 255, 0.2), 0 0 3px 0 rgba(255, 255, 255, 0.2) !important;
}

.widget-flights__footer {
    border-top: 1px solid rgb(59, 59, 59) !important;
}

.widget-flights, .SearchWidget__searchWidgetFieldsWrap___6HsSR {
    background: var(--form-color) !important;
}

/* Pill buttons */
.pill {
    background: var(--main-background-color) !important;
    border: 0 !important;
    color: var(--text-color) !important;
    box-shadow: 0 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 2px 0 rgba(255, 255, 255, 0.3) !important;
    transition: background-color 0.2s ease-in-out !important;
}

.pill:hover {
    background: var(--border-color) !important;
    color: var(--text-color) !important;
}

.is-open .pill, .pill.is-open {
    background: var(--darker-background-color) !important;
    color: var(--text-color) !important;
}

[data-track-id="personal-counter"] > .text {
    color: var(--text-color) !important;
}

/* Pagination */
.pagination, .pagination-next, .pagination-prev {
    background: var(--main-background-color) !important;
}

.pagination-button.active {
    color: white !important;
}

.pagination-next.enabled:hover {
    background-image: none !important;
}

.pagination-button:hover {
    background-image: none !important;
    color: var(--text-color) !important;
}

.pagination-button, .pagination-button.active {
    background-image: none !important;
}

[aria-controls="tns1"] {
    background: var(--form-color) !important;
    box-shadow: 0 0 2px 0 rgba(255, 255, 255, 0.15), 0 0 2px 0 rgba(255, 255, 255, 0.15) !important;
    transition: opacity .24s ease-out,box-shadow .24s ease,-webkit-box-shadow .24s ease !important;
}

[data-controls="next"]:hover, [data-controls="prev"]:hover {
    background: var(--border-color) !important;
    box-shadow: 0 0 7px 0 rgba(255, 255, 255, 0.15), 0 0 7px 0 rgba(255, 255, 255, 0.15) !important;
}

[data-controls="next"]:hover > svg > g > circle, [data-controls="prev"]:hover > svg > g > circle {
	fill: var(--border-color) !important;
}

/* Dropdowns */
[data-track-id="menu"] {
    color: white !important;
}

.dropdown-item:hover, [data-update="mc"] > div {
    background: var(--form-color) !important;
}

.dropdown-menu-group {
    border-bottom: 1px solid var(--border-color) !important;
    background: var(--form-color) !important;
}

.dropdown-link:hover {
    color: #E6E6E6 !important;
    background: #4D4D4D !important;
    border-bottom: 1px solid var(--border-color)
}

#treeCountPopover {
    box-shadow: 0 0 3px 0 rgba(255, 255, 255, 0.15), 0 0 3px 0 rgba(255, 255, 255, 0.15) !important;
    border-top: none !important;
}

.popover {
    background-color: var(--form-color) !important;
}

.popover-learnmore {
    border: 1px solid var(--border-color) !important;
}

.popover-section, .popover-learnmore-footer {
    background: var(--form-color) !important;
    border-top: 1px solid var(--border-color) !important;
}

.flags-dropdown-more {
    border-top: 1px solid var(--border-color) !important;
    background: var(--form-color) !important;
}

.flags-dropdown-list > li:hover {
    background: var(--darker-background-color) !important;
}

.flags-dropdown-chosen {
    background: transparent url(https://i.ibb.co/FY3RvQS/PNG-Image-16-16-pixels.png) no-repeat 268px 16px !important;
    border-bottom: 1px solid var(--border-color) !important;
}

.flags-dropdown-header {
    border-bottom: 1px solid var(--border-color) !important;
}

.filter-trigger {
    background: var(--darker-background-color) !important;
    color: var(--text-color) !important;
    border: 1px solid var(--border-color) !important;
}

.filter-trigger:hover {
    color: var(--text-color) !important;
    background: var(--border-color) !important;
}

.filter-list {
    background: var(--darker-background-color) !important;
    color: var(--text-color) !important;
    box-shadow: 0 2px 8px 0 rgba(255, 255, 255, 0.15), 0 1px 4px 0 rgba(255, 255, 255, 0.15) !important;
}

.arrow-down > g > g {
    fill: var(--text-color) !important;
}

.filter-link {
    color: var(--text-color) !important;
    background: var(--darker-background-color) !important;
}

.filter-link:hover, .filter-link:focus {
    background: var(--form-color) !important;
    color: var(--text-color) !important;
}

.filter-list > .active > .filter-link {
    background: var(--border-color) !important;
}

.dropdown-menu {
    box-shadow: 0 0 4px 0 rgba(255, 255, 255, 0.15), 0 0 4px 0 rgba(255, 255, 255, 0.15) !important;
}

.icons-dropdown-list {
    background: var(--main-background-color) !important;
}

.icons-dropdown-link, .icons-dropdown-link:visited {
    color: var(--text-color) !important;
}

.icons-dropdown-list > li:hover {
    background: var(--border-color) !important;
}

.notifications-center-container {
    border: 1px solid #5F5F5F !important;
    box-shadow: 0 0 3px 0 rgba(255, 255, 255, 0.15), 0 0 3px 0 rgba(255, 255, 255, 0.15) !important;
}

.notifications-item, .notifications-item:active, .notifications-item:focus, .notifications-item:visited {
    background: var(--form-color) !important;
    border-bottom: 1px solid #5F5F5F !important;
}

.notifications-item:hover {
    background: #4D4D4D !important;
}

.notifications-center-more {
    background: var(--form-color) !important;
}

.dropdown-footer-simple, .dropdown-footer-double {
    background: var(--main-background-color) !important;
    border-top: 1px solid var(--border-color)
}

/* Popups */

.main-popup, .followup-popup, .followup-popup.fade-out {
    background: var(--main-background-color) !important;
    border: 2px solid #595959 !important;
    color: var(--text-color) !important;
}

/* Navbar search types */
.navbar-row {
    background-color: var(--main-background-color) !important;
    background-image: none !important;
    border-bottom: 1px solid #373737 !important;
}

.navbar-link {
    color: #CAC6BE !important;
}

.navbar-link:visited {
    color: var(--text-color) !important;
}

/* Search bar */
.search-form-field {
    background: transparent !important;
    border: 1px solid var(--border-color) !important;
}

form[action="/search"] {
    box-shadow: none !important;
}

.search-form {
    border: 1px solid #5F5F5F !important;
}

.search-form-input {
    background: transparent !important;
}

/* Results */
.result-title, .result-title:hover, .result-title:focus, .result-title:active, .thumbnail-title, .more-results-link {
    color: var(--link-color) !important;
}

.results-page {
    background: var(--main-background-color) !important;
}

.result-title:visited, .card-mobile > a:visited {
    color: var(--link-visited-color) !important;
}

.result-url, .result-url:hover, .result-url:focus, .result-url:active, .result-url:visited, .thumbnail-publisher, .news-publisher, .video-publisher {
    color: var(--link-green-color) !important;
}

.thumbnail-item {
    background: #292929 !important;
    border: 1px solid var(--border-color) !important;
}

time {
    color: #898989 !important;
}

.card-desktop + .card-desktop {
    margin-top: 20px !important;
}

/* Typeahead */
.typeahead-link {
    background: var(--form-color) !important;
    color: white !important;
}

.typeahead-link:hover {
    background: #2F2F2F !important;
    color: white !important;
}

.typeahead-link:visited {
    background: var(--form-color) !important;
    color: #AAAAAA !important;
}

.typeahead-suggestion, .typeahead-suggestion:not(:last-of-type) {
    border-bottom: 1px solid var(--border-color) !important;
}

.typeahead {
    border: 1px solid var(--border-color) !important;
}

/* Mobile */
.hidden-desktop .flags-dropdown-list, .flags-dropdown-header {
    color: var(--text-color) !important;
}

.hidden-desktop .icons-dropdown-list {
    border-bottom: 1px solid var(--border-color) !important;
    border-left: 1px solid var(--border-color) !important;
    border-right: 1px solid var(--border-color) !important;
}

.navbar-container {
    background: var(--main-background-color) !important;
}

.navbar-item-button {
    border-left: 3px solid var(--main-background-color) !important;
}

.search-form-addon-button {
    background: var(--form-color) !important;
    border-left: 3px solid var(--form-color) !important;
}

.card-mobile {
    background-color: transparent !important;
}

.offcanvas-menu-header {
    background: var(--form-color) !important;
}

.filter-select {
    background: #404040 !important;
    color: var(--text-color) !important;
}

.panel[data-v-63c7948a] {
    background: #333333 !important;
    border-left: 1px solid var(--border-color) !important;
}

.panel-header[data-v-3d767220] {
    background: #333333 !important;
}

.group[data-v-5ee46ea2] {
    border-bottom: 1px solid var(--border-color) !important;
}

.suggestion-list[data-v-73dda3c2] {
    border: 1px solid var(--border-color) !important;
}

.suggestion-item[data-v-73dda3c2]:not(:last-of-type) {
    border-bottom: 1px solid var(--border-color) !important;
}

.offcanvas-menu .dropdown-menu {
    background: var(--form-color) !important;
}

/* Settings page */
.settings-headline {
    color: #9F9F9F !important;
}

.form-with-labels {
    color: #b2ccff !important;
}

.form-label-subtitle {
    color: white !important;
}

.custom-select-list, .custom-select-options {
    background: #333333 !important;
}

.form-with-labels .is-changed .custom-select-trigger {
    border-color: #00e6ac !important;
    color: white !important;
}

.settings-form {
    border: 0 !important;
    box-shadow: none !important;
    background: var(--main-background-color) !important;
}

[type="submit"] {
    color: #bfbfbf !important;
}

/* Homepage */
.title, .text, .claim-title, .claim-text {
    color: #CAC6BE !important;
}

.land-background[data-v-0a5129dd]::after {
    background: linear-gradient(rgba(25, 13, 13, 0) 80%, var(--border-color)) bottom no-repeat, url(https://cdn.ecosia.org/indexpage/img/5a18884.png) bottom repeat-x !important;
}

.notification {
    border-bottom: 1px solid var(--border-color) !important;
}

.background > path {
    fill: var(--darker-background-color) !important;
}

.content {
    background: linear-gradient(var(--main-background-color), var(--main-background-color) 90%, hsla(0, 0%, 100%, 0)) bottom no-repeat !important;
}

.content[data-v-18ef2b10] {
    background: transparent !important;
}

.dropdown--side-right {
    border: 1px solid #5F5F5F !important;
}

.description, .text[data-v-4f0e76aa] {
    color: var(--text-color) !important;
}

.personal-counter-dropdown {
    background: var(--form-color) !important;
    border: 1px solid var(--border-color) !important;
}

.personal-counter-content-actions {
    border-top: 1px solid var(--border-color) !important;
}

.link-more {
    background: var(--form-color) !important;
    border-top: none !important;
}

.link, .link:active, .link:focus, .link:visited {
    background: var(--form-color) !important;
}

.link:hover {
    background: #4D4D4D !important;
}

.suggestion-link[data-v-26502e69]:visited {
    color: #CAC6BE !important;
}

.suggestion-link[data-v-90260324], .suggestion-link[data-v-90260324]:active, .suggestion-link[data-v-90260324]:visited {
    color: var(--text-color) !important;
    background: var(--main-background-color) !important;
}

.suggestion-link[data-v-90260324]:hover {
    color: var(--text-color) !important;
    background: var(--darker-background-color) !important;
}

.suggestion-list[data-v-90260324] {
    border: 1px solid var(--darker-background-color) !important;
}

.suggestion-item[data-v-90260324]:not(:last-of-type) {
    border-bottom: 1px solid var(--darker-background-color) !important;
}

.link[data-v-16f3fc98]:hover {
    background: #4D4D4D !important;
}

.panel-header, .panel {
    background: var(--form-color) !important;
    border-bottom: 1px solid var(--border-color) !important;
    border-left: 1px solid var(--border-color) !important;
}

.claim {
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.2) !important; 
}

/* Main settings */
.disclaimer {
    border-top: 1px solid var(--border-color) !important;
}

.image-result {
    border: 2px solid var(--main-background-color) !important;
}

nav[role="menu"] {
    color: white !important;
    background: var(--darker-background-color) !important;
}

.link[role="menuitem"] {
    background: var(--darker-background-color) !important;
}

input {
    background: var(--form-color) !important;
    color: var(--text-color) !important;
}

nav {
    background: var(--main-background-color) !important;
    color: white !important;
}

form, article {
    background: var(--form-color) !important;
    box-shadow: 0 0 4px 0 rgba(255, 255, 255, 0.2), 0 0 4px 0 rgba(255, 255, 255, 0.2) !important;
}

form[action="/search"], form[action="/images"], form[action="/news"], form[action="/videos"]  {
    border: 0 !important;
	box-shadow: none !important;
}

footer {
    background: var(--main-background-color) !important;
    border-top: 1px solid #393939 !important;
}

p, h3 {
    color: var(--text-color) !important;
}

p > a {
    color: var(--link-color) !important;
}

main {
    background: var(--main-background-color) !important;
}

body, .row {
    background: var(--main-background-color) !important;
}

::-moz-selection, ::selection {
    background: #696969 !important;
}

/* Ads */
.product-ad {
    background: var(--main-background-color) !important;
}

.ad-download, .ad-download:hover, .ad-download:focus, .ad-download:active,
.entity-disambiguation-title, .entity-disambiguation-title:hover, .entity-disambiguation-title:focus, .entity-disambiguation-title:active {
    color: var(--link-color) !important;
}

.entity-disambiguation-container {
    box-shadow: 0 0 4px 0 rgba(255, 255, 255, 0.2), 0 0 4px 0 rgba(255, 255, 255, 0.2)
}

.entity-disambiguation-item {
    border-bottom: 1px solid var(--border-color) !important;
}

.ad-download:visited, .entity-disambiguation-title:visited {
    color: var(--link-visited-color) !important;
}

.sidebar-product-ad-title, .sidebar-product-ad-title:hover, .sidebar-product-ad-title:focus, .sidebar-product-ad-title:active {
    color: var(--link-color) !important;
}

.sidebar-product-ad-title:visited {
    color: var(--link-visited-color) !important;
}

.sidebar-product-ad-price {
    color: var(--text-color) !important;
}

.sidebar-product-ad-seller-name {
    color: var(--link-green-color) !important;
}

.sidebar-product-ad-item {
    border-bottom: 1px solid var(--border-color) !important;
}

.funnel-treedaybox, .card-ad, .card-productads, .product-ad, .js-sidebar-ad {
    display: none !important;
}
`;