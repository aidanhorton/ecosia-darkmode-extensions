function toggleDark () {
	let body = document.getElementById("main-body");
				
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

function setTransitionFlag () {
	let checkBoxLabel = document.getElementById("toggle");
	checkBoxLabel.classList.add("clicked");
}

let checkBox = document.getElementById("switch");
checkBox.onclick = toggleDark;
chrome.storage.sync.get(["darkMode"], function(items){
    if (items["darkMode"] == 'on') {
		checkBox.checked = true;
	} else {
		checkBox.checked = false;
	}
});

window.setTimeout(setTransitionFlag, 100);