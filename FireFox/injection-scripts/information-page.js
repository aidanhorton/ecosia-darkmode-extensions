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
style.textContent = `* {
    --main-color: #F7F7F7;
    --main-bg-color: #181A1B;
    --second-bg-color: #3F3F3F;
    --border-color: #5F5F5F;
    --color-one: #3dbfbc;
    --color-two: #7A8436;
    --color-three: #cb421f;
    scrollbar-color: #3F3F3F #1C1E1F;
}

.logo-anchor path:nth-child(2) {
    fill: white;
}

.jobs {
	background-color: var(--main-bg-color);
}

.a {
    color: var(--main-color) !important;
}

a.typeahead-link {
    background-color: var(--main-bg-color);
    color: var(--main-color);
}

.typeahead-suggestion, .typeahead-suggestion:not(:last-of-type) {
    border-bottom: 1px solid var(--border-color);
}

.typeahead {
    border: 1px solid var(--border-color);
}

div.lSSlideOuter {
    background-color: var(--color-two);
    color: var(--main-color);
}

div.offcanvas-menu-header {
    background-color: var(--second-bg-color);
}

nav.dropdown-menu.dropdown-menu-right {
    background-color: var(--main-bg-color);
}

.dropdown-menu-group {
    border-bottom: 1px solid var(--border-color);
}

label.js-offcanvas-menu-close.offcanvas-menu-close {
    background-color: none;
}

a.typeahead-link:hover {
    background-color: #2F2F2F;
    color: var(--main-color);
}

a.typeahead-link:visited {
    color: #AAAAAA;
}

h1.h1 {
    color: var(--main-color);
}

p.intro-text {
    color: var(--main-color);
}

p.custom-select-chosen.js-select-chosen {
    background-color: none;
    color: none;
}

input.js-search-input.search-form-input {
    background-color: var(--main-bg-color);
    color: var(--main-color);
}

div.search-form-wrapper {
    background-color: var(--main-bg-color);
}

div.dropdown-menu-group a.dropdown-link:hover {
    background-color: #4D4D4D;
    border-bottom: 1px solid var(--border-color);
}

div.dropdown-menu-group a.dropdown-link {
    color: var(--main-color) !important;
}

div.search-form-addon-button.js-offcanvas-menu-trigger {
    background-color: var(--main-bg-color);
    border-left: none;
}

div.dropdown-menu.custom-select-options {
    background-color: var(--main-bg-color);
    color: var(--main-color);
    box-shadow: inset 0 -1px 2px 0 var(--main-color);
}

nav.search-header.js-search-header.search-header-show {
    background-color: var(--main-bg-color);
}

nav.search-header.js-search-header.search-header-inversed {
    background-color: var(--main-bg-color);
}

section#history.statistics.statistics-history.section-scrolled-to.section-half.section-padding.text-center {
    background-color: var(--main-bg-color);
}

section#reports.reports.section-scrolled-to {
    background-color: var(--main-bg-color);
}

section#contact.contact.section-padding.section-scrolled-to {
    background-color: var(--main-bg-color);
}

section#jobs.jobs.section-padding.section-scrolled-to.text-center {
    background-color: var(--second-bg-color);
}

section#newsletter.section-half.section-padding.section-scrolled-to.newsletter.newsletter.text-center {
    background-color: var(--main-bg-color);
}

footer#footer.site-footer {
    background-color: var(--main-bg-color);
}

span.how-text {
    color: var(--main-color);
}

span.statistics-value-description {
    color: var(--main-color);
}

b.statistics-value-highlight {
    color: var(--main-color);
}

div.col-lg-2.col-md-4.col-sm-12.footer-force-height a {
    color: var(--main-color);
}

div.col-lg-2.col-md-4.col-sm-12.footer-force-height a:hover {
    color: #9b9b9b;
}

div.map-headline {
    opacity: 0.9;
    background-color: var(--color-one);
}

section.map.map-project.section-full.section-padding {
    background-color: var(--color-one);
}

div.snapshot-content {
    background-color: var(--color-two);
}

.btn btn-large btn-primary js-share-button {
    background-color: var(--main-bg-color);
}

section.how.text-center.section-padding.section-scrolled-to.section-half {
    background-color: var(--main-bg-color);
}

section.statistics.statistics-what.section-half.section-padding.text-center {
    background-color: var(--main-bg-color);
}

div.statistics-content {
    background-color: var(--main-bg-color);
}

div.media.desktop.text-center {
    background-color: var(--main-bg-color) !important;
}

input#mce-EMAIL.required.email.newsletter-input {
    background-color: var(--main-bg-color);
    color: var(--main-color);
}

input.contact-element-text.contact-input-element {
    background-color: var(--main-bg-color);
    color: var(--main-color);
}

textarea.contact-message-textarea.contact-input-element {
    background-color: var(--main-bg-color);
    color: var(--main-color);
}

h1, h2, h3, h4, h5, p {
    color: var(--main-color) !important;
}

select.select.form-flex-item {
    background-color: var(--main-bg-color);
    color: var(--main-color);
    scrollbar-color: #2A2C2E #1C1E1F !important;
}

input.input.form-flex-item.form-flex-item-grow {
    background-color: var(--main-bg-color);
    color: var(--main-color);
}

div.hero-mobile {
    background-color: var(--color-three);
}

a.text-small {
    color: var(--main-color);
}

section#privacy-claims.privacy-claims {
    background-color: var(--main-bg-color);
}

section.privacy-small-header.privacy-faq-header {
    background-color: var(--color-one);
}

section#faq.section-padding {
    background-color: var(--main-bg-color);
}

section.privacy-small-header {
    background-color: var(--color-two);
}

main {
    background-color: var(--main-bg-color);
}

div.privacy-faq-answer {
    color: var(--main-color);
}

div.read-more {
    background-color: var(--main-bg-color);
}

div.container.container-fluid {
    color: var(--main-color);
}

a:link {
    color: #60B3CE;
}

a.btn {
    color: white;
}

a.btn.btn-large.btn-primary.js-scroll-to-section {
    color: var(--main-color);
}

a.btn.btn-large.btn-outline-inverse {
    color: var(--main-color);
}

a.btn.btn-outline-secondary {
    color: var(--main-color);
}

a.btn.btn-outline-secondary:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

section#press-materials.materials.section-half.section-padding.text-center {
    background-color: var(--main-bg-color);
}

span.material-text {
    color: var(--main-color);
}

a.typeahead-link {
    color: var(--main-color);
}`;