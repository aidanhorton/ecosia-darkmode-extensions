function buildPopupDom(mostVisitedURLs) {
	// Uncomment to reset local storage:
	chrome.storage.local.set({"blacklistedUrls": []});
	
	var mostVisited = document.getElementById('mostVisited');
	
	var whitelistedUrls = [];
	
	chrome.storage.local.get({"blacklistedUrls": []}, function (result) {
		var blacklistedUrls = result.blacklistedUrls;
		console.log(blacklistedUrls);
		
		for (var x = 0; x < mostVisitedURLs.length; x++) {
			var isBlacklisted = false;
			for (var i = 0; i < blacklistedUrls.length; i++) {
				if (blacklistedUrls[i] === mostVisitedURLs[x].url) {
					isBlacklisted = true;
				}
			}
			
			if (!isBlacklisted) {
				whitelistedUrls.push(mostVisitedURLs[x]);
			}
		}

		var urls = 7;
		if (urls > whitelistedUrls.length) {
			urls = whitelistedUrls.length;
		}
		
		for (var i = 0; i < urls; i++) {
			var itemAndCloseWrapper = mostVisited.appendChild(document.createElement('div'));
			itemAndCloseWrapper.className += "itemAndCloseWrapper";
			
			var itemWrapper = itemAndCloseWrapper.appendChild(document.createElement('a'));
			itemWrapper.href = whitelistedUrls[i].url;
			itemWrapper.className += "topSite";
	
			var toolTipWrapper = itemWrapper.appendChild(document.createElement('div'));
			toolTipWrapper.className += "toolTipWrapper";
	
			var toolTip = toolTipWrapper.appendChild(document.createElement('span'));
			toolTip.className += "toolTip";    
			toolTip.appendChild(document.createTextNode(whitelistedUrls[i].title));
			
			var close = itemAndCloseWrapper.appendChild(document.createElement('a'));
			close.className = "closeButton";
			
			close.addEventListener('click', function(element) {
				element = element || window.event;
				var target = element.target || element.srcElement;
				
				chrome.storage.local.get({"blacklistedUrls": []}, function (result) {
					var urls = result.blacklistedUrls;
					
					var topSite = target.parentElement.parentElement.querySelector('.topSite').href;
					urls.push(topSite);
					
					chrome.storage.local.set({"blacklistedUrls": urls});
				});
				
				target.parentElement.parentElement.parentElement.removeChild(target.parentElement.parentElement);
			}, false);
			
			var closeImage = close.appendChild(document.createElement('img'));
			closeImage.src = "Close.png";
			closeImage.className = "closeImage";
		
			var icon = itemWrapper.appendChild(document.createElement('img'));
			icon.className += "icon";
			icon.src = "https://www.google.com/s2/favicons?domain=" + whitelistedUrls[i].url;
		}
	});
}

chrome.topSites.get(buildPopupDom);

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('dropdown-button');
	
    link.addEventListener('click', function() {
		var link = document.getElementById('dropdown-button');
        var list = document.getElementById("dropdown-list");
		
		if (list.style.display === "block") {
			list.style.display = "none";
			link.style.background = "#181A1B";
		} else {
			list.style.display = "block";
			link.style.background = "#3F3F3F";
		}
    });
});

function toggleStyle(message, sender, sendResponse) {
	if (message.action == 'on') {
		var element = document.getElementById('EcosiaLightMode');
		element.parentElement.removeChild(element);
	}
	else if (message.action == 'off') {
		document.getElementsByTagName("head")[0].appendChild(style);
	}
}

chrome.storage.local.get(["darkMode"], injectOnLoad);

function injectOnLoad(items){
    if (items["darkMode"] === 'off') {
		(document.body || document.head || document.documentElement).appendChild(style);
	}
}

chrome.runtime.onMessage.addListener(toggleStyle);
var style = document.createElement('style');
style.id = "EcosiaLightMode";
style.className = "EcosiaLightMode";
style.type = "text/css";
style.textContent = `
body, form, input, a, button, .nav-menu-group, #dropdown-list {
	background: #FFF !important;
	border-color: #E0E0E0 !important;
	color: #4A4A4A !important;
}

a:hover, button:hover {
	background: #E0E0E0 !important;
}

.logo:hover {
	background: #FFF !important;
}

.logo-text {
	fill: #4B4A4B;
}`;