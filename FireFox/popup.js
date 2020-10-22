let darkLogo = document.getElementById("darkLogo");
darkLogo.src = browser.runtime.getURL("images/EcosiaLogo32.png");
let lightLogo = document.getElementById("lightLogo");
lightLogo.src = browser.runtime.getURL("images/EcosiaLogo.png");

let logoText = document.getElementById("logoText");
logoText.src = browser.runtime.getURL("images/EcosiaDarkMode.png");

let checkBox = document.getElementById("switch");
checkBox.onclick = toggleDark;

browser.storage.local.get(["darkMode"], function(items){
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
	browser.storage.local.set({ "darkMode": newMode });
	browser.tabs.query({}, function(tabs) {
		for (var i=0; i<tabs.length; ++i) {
			browser.tabs.sendMessage(tabs[i].id, {action: newMode});
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

	darkLogo.classList.add("img-transition");
	lightLogo.classList.add("img-transition");
}