let darkLogo = document.getElementById("darkLogo");
darkLogo.src = chrome.runtime.getURL("images/EcosiaLogo32.png");
let lightLogo = document.getElementById("lightLogo");
lightLogo.src = chrome.runtime.getURL("images/EcosiaLogo.png");

let logoText = document.getElementById("logoText");
logoText.src = chrome.runtime.getURL("images/EcosiaDarkMode.png");

let checkBox = document.getElementById("switch");
checkBox.onclick = toggleDark;

chrome.storage.local.get(["darkMode"], function(items){
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

function toggleNewTab () {
	if (checkBox.checked == true) {
		setDarkProperties();
		notifyModeChange("on");
	} else {
		setLightProperties();
		notifyModeChange("off");
	}
}

function notifyModeChange (newMode) {
	chrome.storage.local.set({ "darkMode": newMode });
	chrome.tabs.query({}, function(tabs) {
		for (var i=0; i<tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, {action: newMode});
		}
	});
}

function setDarkProperties () {
	darkLogo.style.opacity = 1;
	lightLogo.style.opacity = 0;
}

function setLightProperties () {
	darkLogo.style.opacity = 0;
	lightLogo.style.opacity = 1;
}

function setTransitionFlags () {
	let checkBoxLabel = document.getElementById("toggle");
	checkBoxLabel.classList.add("switch-transition");
	
	let checkBoxLabel2 = document.getElementById("toggle2");
	checkBoxLabel2.classList.add("switch-transition");

	darkLogo.classList.add("img-transition");
	lightLogo.classList.add("img-transition");
}