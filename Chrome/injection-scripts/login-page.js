// Initial injection - checks if dark mode is enabled.
chrome.storage.sync.get(["darkMode"], injectOnLoad);

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
style.textContent = `/* ---------------------------------------------------------- */
/* LOGIN PAGE - Select 'sign-in' in the tree-counter dropdown */
/* ---------------------------------------------------------- */

/* Background & text */
body {
    background: var(--dark-background);
}
.login, h1, .login p {
    color: var(--text) !important;
}

/* Email form */
input {
    background: var(--form);
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