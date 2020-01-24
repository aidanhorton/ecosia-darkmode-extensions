function toggleDark () {
	let body = document.getElementById("main-body");
				
	if (checkBox.checked == true) {
		body.style.backgroundColor = "#262626";
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {mode: "on"});
		});
	} else {
		body.style.backgroundColor = "#F2F2F2";
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {mode: "off"});
		});
	}
}

let checkBox = document.getElementById("switch");
checkBox.onclick = toggleDark;
checkBox.checked = true;