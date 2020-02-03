let body = document.getElementById("main-body");

let darkLogo = document.getElementById("darkLogo");
darkLogo.src = chrome.runtime.getURL("images/EcosiaLogo48.png");
let lightLogo = document.getElementById("lightLogo");
lightLogo.src = chrome.runtime.getURL("images/EcosiaLogo.png");

let checkBox = document.getElementById("switch");
checkBox.onclick = toggleDark;

chrome.storage.sync.get(["darkMode"], function(items){
    if (items["darkMode"] == 'off') {
		checkBox.checked = false;
		setLightProperties();
	} else {
		checkBox.checked = true;
		setDarkProperties();
	}
});

window.setTimeout(setTransitionFlags, 100);


function toggleDark () {
	if (checkBox.checked == true) {
		setDarkProperties();
		notifyModeChange("on");
	} else {
		setLightProperties();
		notifyModeChange("off");
	}
}

function notifyModeChange (newMode) {
	chrome.storage.sync.set({ "darkMode": newMode });
	chrome.tabs.query({}, function(tabs) {
		for (var i=0; i<tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, {mode: newMode});
		}
	});
}

function setDarkProperties () {
	body.style.backgroundColor = "#262626";
	darkLogo.style.opacity = 1;
	lightLogo.style.opacity = 0;
}

function setLightProperties () {
	body.style.backgroundColor = "#E6E6E6";
	darkLogo.style.opacity = 0;
	lightLogo.style.opacity = 1;
}

function setTransitionFlags () {
	let checkBoxLabel = document.getElementById("toggle");
	checkBoxLabel.classList.add("switch-transition");

	body.classList.add("body-transition");
	
	darkLogo.classList.add("img-transition");
	lightLogo.classList.add("img-transition");
}