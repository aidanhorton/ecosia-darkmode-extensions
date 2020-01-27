function toggleDark () {
	if (checkBox.checked == true) {
		body.style.backgroundColor = "#262626";
		chrome.storage.sync.set({ "darkMode": "on" });
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {mode: "on"});
		});
	} else {
		body.style.backgroundColor = "#F2F2F2";
		chrome.storage.sync.set({ "darkMode": "off" });
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {mode: "off"});
		});
	}
}

function setTransitionFlags () {
	let checkBoxLabel = document.getElementById("toggle");
	checkBoxLabel.classList.add("clicked");

	body.classList.add("body-transition");
}

let body = document.getElementById("main-body");

var image = document.getElementById("logo");
image.src = chrome.runtime.getURL("images/EcosiaLogo48.png");

let checkBox = document.getElementById("switch");
checkBox.onclick = toggleDark;

chrome.storage.sync.get(["darkMode"], function(items){
    if (items["darkMode"] == 'on') {
		checkBox.checked = true;
		body.style.backgroundColor = "#262626";
		
	} else {
		checkBox.checked = false;
		body.style.backgroundColor = "#F2F2F2";
	}
});

window.setTimeout(setTransitionFlags, 100);