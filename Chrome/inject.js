chrome.runtime.onMessage.addListener(gotMessage);
  
function gotMessage(message, sender, sendResponse) {
	if (message.mode == 'on') {
		var link = document.createElement("link");
		link.href = chrome.extension.getURL("darktheme.css");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.className = "darktheme";
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	else if (message.mode == 'off') {
		var element = document.querySelector('link.darktheme');
		element.parentElement.removeChild(element);
	}
}