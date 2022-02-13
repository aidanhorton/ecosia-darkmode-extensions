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
style.textContent = `* {
    --main-color: #F7F7F7;
    --main-bg-color: #181A1B;
    --second-bg-color: #3F3F3F;
    --color-one: #3dbfbc;
    --color-two: #7A8436;
    --color-three: #cb421f;
    scrollbar-color: #3F3F3F #1C1E1F;
}

.c-author-card {
	background: var(--main-bg-color) !important;
	border-color: var(--second-bg-color) !important;
}

.c-logo__img {
    width: 315px;
    height: 128px;
    box-sizing: border-box;
    padding-left: 630px;
    background: url(https://i.ibb.co/QNLYq5c/ecosia-blog-logo-2x-1.png) center top no-repeat;
    background-size: auto 100%;
}

::-webkit-scrollbar {
    width: 25px;
}

h1, h2, h3, h4, h5, p {
    color: var(--main-color) !important;
}

body.home-template.js-enabled {
    background-color: var(--main-bg-color) !important;
    border: none !important;
}

body {
    background-color: var(--main-bg-color) !important;
    border: none !important;
}

div.c-nav--collapsed.c-nav--collapsed--active {
    background-color: var(--main-bg-color);
}

div.c-install-banner.c-install-banner--desktop.c-install-banner--active {
    background-color: var(--color-one);
    color: var(--main-color);
}

header.c-header {
    background-color: var(--main-bg-color);
}

nav.c-nav-wrap {
    background-color: var(--main-bg-color);
}

ul.c-nav.o-plain-list {
    background-color: var(--main-bg-color);
}

a.c-nav__link.c-nav__link--current {
    color: var(--color-three);
}

option {
    background-color: var(--main-bg-color);
}

.home-template .c-nav__link--current:not(:hover) {
    color: var(--color-three);
}

a {
    color: var(--color-three);
}

a:hover {
    color: var(--color-three);
}

a.c-post-card__title-link {
    color: var(--main-color);
}

a.c-ecosia-search {
    color: var(--main-color);
}

a.c-nav__link {
    color: var(--main-color);
}

select.c-language-select {
    color: var(--main-color);
}

select.c-language-select:active {
    border-color: var(--color-three);
}

select.c-language-select:focus {
    border-color: var(--color-three);
}

select.c-language-select:hover {
    border-color: var(--color-three);
}

div.c-archive {
    background-color: var(--second-bg-color);
    border: none !important;
}

div.c-search.js-search.is-active {
    background-color: var(--main-bg-color);
}

input.c-search__input.js-search-input {
    color: var(--main-color);
    background-color: var(--second-bg-color);
}

svg.icon__cnt {
    color: var(--main-color);
}

div.c-search__close.js-search-close {
    background-color: var(--second-bg-color);
}

a.c-search-result {
    background-color: var(--second-bg-color);
}

footer.c-footer {
    background-color: #151515;
    border-top: none;
}

div.c-footer__bottom {
    border-top: none;
}

div.c-post-hero__content {
    background-color: var(--second-bg-color);
    border: none;
}

div.js-off-canvas-toggle.c-off-canvas-toggle {
    background-color: var(--second-bg-color);
    border-radius: 4px;
}

div.js-off-canvas-toggle.c-off-canvas-toggle.c-off-canvas-toggle--close {
    color: var(--main-color);
}

div.c-off-canvas-content.js-off-canvas-content.is-active {
    background-color: var(--main-bg-color);
}

div.c-widget.c-widget-author {
    border-color: var(--second-bg-color);
}

div.c-widget {
    border-color: var(--second-bg-color);
}

span.c-country__fact--name {
    color: var(--main-color);
}

div.c-country__trees--item-name {
    color: var(--main-color);
}

li.c-share__item {
    background-color: var(--main-bg-color);
}

li.c-share__item:not(:last-child) {
    border-color: var(--main-bg-color);
}

li {
    color: var(--main-color);
}

div.c-tags a {
    color: var(--main-color);
    background-color: var(--second-bg-color);
}

blockquote {
    color: var(--main-color);
}

span.c-widget-shop__claim {
    color: var(--main-color);
}

div.c-related {
    background-color: #151515;
    border-bottom: solid;
    border-bottom: 2px;
    border-color: var(--main-color);
}

div.c-post-card {
    background-color: var(--main-bg-color) !important;
    border: 1px solid var(--main-bg-color) !important;
}

button.c-btn.js-load-disqus {
    color: var(--main-color);
    background-color: var(--second-bg-color);
}

div.c-author {
    background-color: var(--main-bg-color);
    border: 1px solid var(--second-bg-color);
}

.c-tree-report__project-placeholder__text, .c-tree-report__project-info__hint-headline, .c-financial-report__graph-placeholder-desktop, .c-financial-report__graph-placeholder-mobile {
    color: #72ebaf;
}

.c-financial-report__data, .c-financial-report__category, .c-tree-report__project-country, .c-tree-report__project-amount, .c-tree-report span, .c-tree-report__project-info__hint-project, .c-financial-report__details-headline, .c-financial-report__details-content {
    color: var(--main-color) !important;
}

.c-financial-report__category-amount, .c-financial-report__total-hint {
    color: #ababab !important;
}

.c-tree-report__number > span, .c-tree-report__number > div {
    color: #ababab !important;
}

.c-tree-report__pill, .c-tree-report__pill > span {
    color: #000 !important;
}

.c-financial-report__total-icon > path {
    fill: var(--main-color);
}

.c-financial-report__select > select > option {
    color: var(--main-color) !important;
}

.c-comments {
    color: #b7b7b7;
}

hr {
    background-color: #595959;
}

#map > g > g > path {
    fill: #2e3e35;
}`;