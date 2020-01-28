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
link.href = chrome.extension.getURL("stylesheets/blog-page.css");
link.type = "text/css";
link.rel = "stylesheet";
link.className = "darktheme";

// Buffer style
style.textContent = `
* {
    --main-color: #F7F7F7 !important;
    --main-bg-color: #181A1B !important;
    --second-bg-color: #3F3F3F !important;
    --color-one: #3dbfbc !important;
    --color-two: #7A8436 !important;
    --color-three: #cb421f !important;
    scrollbar-color: #2A2C2E #1C1E1F !important;
}

.c-logo__img {
    width: 315px !important;
    height: 128px !important;
    box-sizing: border-box !important;
    padding-left: 630px !important;
    background: url(https://i.ibb.co/QNLYq5c/ecosia-blog-logo-2x-1.png) center top no-repeat !important;
    background-size: auto 100% !important;
}

::-webkit-scrollbar {
    width: 25px !important;
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
    background-color: var(--main-bg-color) !important;
}

div.c-install-banner.c-install-banner--desktop.c-install-banner--active {
    background-color: var(--color-one) !important;
    color: var(--main-color) !important;
}

header.c-header {
    background-color: var(--main-bg-color) !important;
}

nav.c-nav-wrap {
    background-color: var(--main-bg-color) !important;
}

ul.c-nav.o-plain-list {
    background-color: var(--main-bg-color) !important;
}

a.c-nav__link.c-nav__link--current {
    color: var(--color-three) !important;
}

option {
    background-color: var(--main-bg-color) !important;
}

.home-template .c-nav__link--current:not(:hover) {
    color: var(--color-three) !important;
}

a {
    color: var(--color-three) !important;
}

a:hover {
    color: var(--color-three) !important;
}

a.c-post-card__title-link {
    color: var(--main-color) !important;
}

a.c-ecosia-search {
    color: var(--main-color) !important;
}

a.c-nav__link {
    color: var(--main-color) !important;
}

select.c-language-select {
    color: var(--main-color) !important;
}

select.c-language-select:active {
    border-color: var(--color-three) !important;
}

select.c-language-select:focus {
    border-color: var(--color-three) !important;
}

select.c-language-select:hover {
    border-color: var(--color-three) !important;
}

div.c-archive {
    background-color: var(--second-bg-color) !important;
    border: none !important;
}

div.c-search.js-search.is-active {
    background-color: var(--main-bg-color) !important;
}

input.c-search__input.js-search-input {
    color: var(--main-color) !important;
    background-color: var(--second-bg-color) !important;
}

svg.icon__cnt {
    color: var(--main-color) !important;
}

div.c-search__close.js-search-close {
    background-color: var(--second-bg-color) !important;
}

a.c-search-result {
    background-color: var(--second-bg-color) !important;
}

footer.c-footer {
    background-color: #151515 !important;
    border-top: none !important;
}

div.c-footer__bottom {
    border-top: none !important;
}

div.c-post-hero__content {
    background-color: var(--second-bg-color) !important;
    border: none !important;
}

div.js-off-canvas-toggle.c-off-canvas-toggle {
    background-color: var(--second-bg-color) !important;
    border-radius: 4px !important;
}

div.js-off-canvas-toggle.c-off-canvas-toggle.c-off-canvas-toggle--close {
    color: var(--main-color) !important;
}

div.c-off-canvas-content.js-off-canvas-content.is-active {
    background-color: var(--main-bg-color) !important;
}

div.c-widget.c-widget-author {
    border-color: var(--second-bg-color) !important;
}

div.c-widget {
    border-color: var(--second-bg-color) !important;
}

span.c-country__fact--name {
    color: var(--main-color) !important;
}

div.c-country__trees--item-name {
    color: var(--main-color) !important;
}

li.c-share__item {
    background-color: var(--main-bg-color) !important;
}

li.c-share__item:not(:last-child) {
    border-color: var(--main-bg-color) !important;
}

li {
    color: var(--main-color) !important;
}

div.c-tags a {
    color: var(--main-color) !important;
    background-color: var(--second-bg-color) !important;
}

blockquote {
    color: var(--main-color) !important;
}

span.c-widget-shop__claim {
    color: var(--main-color) !important;
}

div.c-related {
    background-color: #151515 !important;
    border-bottom: solid !important;
    border-bottom: 2px !important;
    border-color: var(--main-color) !important;
}

div.c-post-card {
    background-color: var(--main-bg-color) !important;
    border: 1px solid var(--main-bg-color) !important;
}

button.c-btn.js-load-disqus {
    color: var(--main-color) !important;
    background-color: var(--second-bg-color) !important;
}

div.c-author {
    background-color: var(--main-bg-color) !important;
    border: 1px solid var(--second-bg-color) !important;
}
`;