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
link.href = chrome.extension.getURL("stylesheets/information-page.css");
link.type = "text/css";
link.rel = "stylesheet";
link.className = "darktheme";

// Buffer style
style.textContent = `
* {
    --main-color: #F7F7F7 !important;
    --main-bg-color: #181A1B !important;
    --second-bg-color: #3F3F3F !important;
    --border-color: #5F5F5F !important;
    --color-one: #3dbfbc !important;
    --color-two: #7A8436 !important;
    --color-three: #cb421f !important;
    scrollbar-color: #2A2C2E #1C1E1F !important;
}

.logo-anchor path:nth-child(2) {
    fill: white !important;
}

.a {
    color: var(--main-color) !important;
}

a.typeahead-link {
    background-color: var(--main-bg-color) !important;
    color: var(--main-color) !important;
}

.typeahead-suggestion, .typeahead-suggestion:not(:last-of-type) {
    border-bottom: 1px solid var(--border-color) !important;
}

.typeahead {
    border: 1px solid var(--border-color) !important;
}

div.lSSlideOuter {
    background-color: var(--color-two) !important;
    color: var(--main-color) !important;
}

div.offcanvas-menu-header {
    background-color: var(--second-bg-color) !important;
}

nav.dropdown-menu.dropdown-menu-right {
    background-color: var(--main-bg-color) !important;
}

.dropdown-menu-group {
    border-bottom: 1px solid var(--border-color) !important;
}

label.js-offcanvas-menu-close.offcanvas-menu-close {
    background-color: none !important;
}

a.typeahead-link:hover {
    background-color: #2F2F2F !important;
    color: var(--main-color) !important;
}

a.typeahead-link:visited {
    color: #AAAAAA !important;
}

h1.h1 {
    color: var(--main-color) !important;
}

p.intro-text {
    color: var(--main-color) !important;
}

p.custom-select-chosen.js-select-chosen {
    background-color: none !important;
    color: none !important;
}

input.js-search-input.search-form-input {
    background-color: var(--main-bg-color) !important;
    color: var(--main-color) !important;
}

div.search-form-wrapper {
    background-color: var(--main-bg-color) !important;
}

div.dropdown-menu-group a.dropdown-link:hover {
    background-color: #4D4D4D !important;
    border-bottom: 1px solid var(--border-color) !important;
}

div.dropdown-menu-group a.dropdown-link {
    color: var(--main-color) !important;
}

div.search-form-addon-button.js-offcanvas-menu-trigger {
    background-color: var(--main-bg-color) !important;
    border-left: none !important;
}

div.dropdown-menu.custom-select-options {
    background-color: var(--main-bg-color) !important;
    color: var(--main-color) !important;
    box-shadow: inset 0 -1px 2px 0 var(--main-color) !important;
}

nav.search-header.js-search-header.search-header-show {
    background-color: var(--main-bg-color) !important;
}

nav.search-header.js-search-header.search-header-inversed {
    background-color: var(--main-bg-color) !important;
}

section#history.statistics.statistics-history.section-scrolled-to.section-half.section-padding.text-center {
    background-color: var(--main-bg-color) !important;
}

section#reports.reports.section-scrolled-to {
    background-color: var(--main-bg-color) !important;
}

section#contact.contact.section-padding.section-scrolled-to {
    background-color: var(--main-bg-color) !important;
}

section#jobs.jobs.section-padding.section-scrolled-to.text-center {
    background-color: var(--second-bg-color) !important;
}

section#newsletter.section-half.section-padding.section-scrolled-to.newsletter.newsletter.text-center {
    background-color: var(--main-bg-color) !important;
}

footer#footer.site-footer {
    background-color: var(--main-bg-color) !important;
}

span.how-text {
    color: var(--main-color) !important;
}

span.statistics-value-description {
    color: var(--main-color) !important;
}

b.statistics-value-highlight {
    color: var(--main-color) !important;
}

div.col-lg-2.col-md-4.col-sm-12.footer-force-height a {
    color: var(--main-color) !important;
}

div.col-lg-2.col-md-4.col-sm-12.footer-force-height a:hover {
    color: #9b9b9b !important;
}

div.map-headline {
    opacity: 0.9 !important;
    background-color: var(--color-one) !important;
}

section.map.map-project.section-full.section-padding {
    background-color: var(--color-one) !important;
}

div.snapshot-content {
    background-color: var(--color-two) !important;
}

.btn btn-large btn-primary js-share-button {
    background-color: var(--main-bg-color) !important;
}

section.how.text-center.section-padding.section-scrolled-to.section-half {
    background-color: var(--main-bg-color) !important;
}

section.statistics.statistics-what.section-half.section-padding.text-center {
    background-color: var(--main-bg-color) !important;
}

div.statistics-content {
    background-color: var(--main-bg-color) !important;
}

div.media.desktop.text-center {
    background-color: var(--main-bg-color) !important;
}

input#mce-EMAIL.required.email.newsletter-input {
    background-color: var(--main-bg-color) !important;
    color: var(--main-color) !important;
}

input.contact-element-text.contact-input-element {
    background-color: var(--main-bg-color) !important;
    color: var(--main-color) !important;
}

textarea.contact-message-textarea.contact-input-element {
    background-color: var(--main-bg-color) !important;
    color: var(--main-color) !important;
}

h1, h2, h3, h4, h5, p {
    color: var(--main-color) !important;
}

select.select.form-flex-item {
    background-color: var(--main-bg-color) !important;
    color: var(--main-color) !important;
    scrollbar-color: #2A2C2E #1C1E1F !important;
}

input.input.form-flex-item.form-flex-item-grow {
    background-color: var(--main-bg-color) !important;
    color: var(--main-color) !important;
}

div.hero-mobile {
    background-color: var(--color-three) !important;
}

a.text-small {
    color: var(--main-color) !important;
}

section#privacy-claims.privacy-claims {
    background-color: var(--main-bg-color) !important;
}

section.privacy-small-header.privacy-faq-header {
    background-color: var(--color-one) !important;
}

section#faq.section-padding {
    background-color: var(--main-bg-color) !important;
}

section.privacy-small-header {
    background-color: var(--color-two) !important;
}

main {
    background-color: var(--main-bg-color) !important;
}

div.privacy-faq-answer {
    color: var(--main-color) !important;
}

div.read-more {
    background-color: var(--main-bg-color) !important;
}

div.container.container-fluid {
    color: var(--main-color) !important;
}

a:link {
    color: #60B3CE !important;
}

a.btn {
    color: white !important;
}

a.btn.btn-large.btn-primary.js-scroll-to-section {
    color: var(--main-color) !important;
}

a.btn.btn-large.btn-outline-inverse {
    color: var(--main-color) !important;
}

a.btn.btn-outline-secondary {
    color: var(--main-color) !important;
}

a.btn.btn-outline-secondary:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
}

section#press-materials.materials.section-half.section-padding.text-center {
    background-color: var(--main-bg-color) !important;
}

span.material-text {
    color: var(--main-color) !important;
}

a.typeahead-link {
    color: var(--main-color) !important;
}
`;