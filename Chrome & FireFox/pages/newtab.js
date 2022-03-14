function buildPopupDom(mostVisitedURLs) {
	// Uncomment to reset local storage:
	// chrome.storage.local.set({"blacklistedUrls": []});
	
	let mostVisited = document.getElementById('mostVisited');
	
	let whitelistedUrls = [];
	
	chrome.storage.local.get({"blacklistedUrls": []}, function (result) {
		let blacklistedUrls = result.blacklistedUrls;
		console.log(blacklistedUrls);
		
		for (let x = 0; x < mostVisitedURLs.length; x++) {
			let isBlacklisted = false;
			for (let i = 0; i < blacklistedUrls.length; i++) {
				if (blacklistedUrls[i] === mostVisitedURLs[x].url) {
					isBlacklisted = true;
				}
			}
			
			if (!isBlacklisted) {
				whitelistedUrls.push(mostVisitedURLs[x]);
			}
		}

		let urls = 7;
		if (urls > whitelistedUrls.length) {
			urls = whitelistedUrls.length;
		}
		
		for (let i = 0; i < urls; i++) {
			let itemAndCloseWrapper = mostVisited.appendChild(document.createElement('div'));
			itemAndCloseWrapper.className += "itemAndCloseWrapper";
			
			let itemWrapper = itemAndCloseWrapper.appendChild(document.createElement('a'));
			itemWrapper.href = whitelistedUrls[i].url;
			itemWrapper.className += "topSite";
	
			let toolTipWrapper = itemWrapper.appendChild(document.createElement('div'));
			toolTipWrapper.className += "toolTipWrapper";
	
			let toolTip = toolTipWrapper.appendChild(document.createElement('span'));
			toolTip.className += "toolTip";    
			toolTip.appendChild(document.createTextNode(whitelistedUrls[i].title));
			
			let close = itemAndCloseWrapper.appendChild(document.createElement('a'));
			close.className = "closeButton";
			
			close.addEventListener('click', function(element) {
				element = element || window.event;
				let target = element.target || element.srcElement;
				
				chrome.storage.local.get({"blacklistedUrls": []}, function (result) {
					let urls = result.blacklistedUrls;
					
					let topSite = target.parentElement.parentElement.querySelector('.topSite').href;
					urls.push(topSite);
					
					chrome.storage.local.set({"blacklistedUrls": urls});
				});
				
				target.parentElement.parentElement.parentElement.removeChild(target.parentElement.parentElement);
			}, false);
			
			let closeImage = close.appendChild(document.createElement('img'));
			closeImage.src = "Close.png";
			closeImage.className = "closeImage";
		
			let icon = itemWrapper.appendChild(document.createElement('img'));
			icon.className += "icon";
			icon.src = "https://www.google.com/s2/favicons?domain=" + whitelistedUrls[i].url;
		}
	});
}

chrome.topSites.get(buildPopupDom);

document.addEventListener('DOMContentLoaded', function() {
    let link = document.getElementById('dropdown-button');
	
    link.addEventListener('click', function() {
		let link = document.getElementById('dropdown-button');
        let list = document.getElementById("dropdown-list");
		
		if (list.style.display === "block") {
			list.style.display = "none";
			link.style.background = "#181A1B";
		} else {
			list.style.display = "block";
			link.style.background = "#3F3F3F";
		}
    });
});

// Updates the style when changes to the settings has been made.
function updateStyle(message, sender, sendResponse) {
	let element = document.getElementById('EcosiaLightMode');
    let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();

	if (((message.data['darkmode'] === 'on') && (message.data['timebasedDarkmode'] === 'on') && (Number(message.data['sunrise']) <= totalMinutes) && (totalMinutes < Number(message.data['sunset']))) || (message.data['darkmode'] === 'off')) {
        if (element === null) {
			document.getElementsByTagName("head")[0].appendChild(style);
        }
		
    } else if ((message.data['darkmode'] === 'on')) {
		if (element !== null) {
			element.parentElement.removeChild(element);
        }
    }
}

chrome.storage.local.get(["settings"], injectOnLoad);

// Sets a timeout to the next minute-change.
setTimeout(function() {
    // Runs it one time first because setInterval has to wait for one minute before it can start.
    chrome.storage.local.get(["settings"], function(items) {
        if (items['settings'] !== undefined) {
            let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
            let element = document.getElementById('EcosiaLightMode');
            if ((items['settings']['darkmode'] !== 'off') && (items['settings']['timebasedDarkmode'] === 'on') && (Number(items['settings']['sunrise']) <= totalMinutes) && (totalMinutes < Number(items['settings']['sunset']))) {
                if (element === null) {
					document.getElementsByTagName("head")[0].appendChild(style);
                };
            } else if ((items['settings']['darkmode'] !== 'off') && (element !== null)) {
				element.parentElement.removeChild(element);
            };
        };
    });

    // Checks the time every minute.
    setInterval(function() {
        chrome.storage.local.get(["settings"], function(items) {
			if (items['settings'] !== undefined) {
				let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
				let element = document.getElementById('EcosiaLightMode');
				if ((items['settings']['darkmode'] !== 'off') && (items['settings']['timebasedDarkmode'] === 'on') && (Number(items['settings']['sunrise']) <= totalMinutes) && (totalMinutes < Number(items['settings']['sunset']))) {
					if (element === null) {
						document.getElementsByTagName("head")[0].appendChild(style);
					};
				} else if ((items['settings']['darkmode'] !== 'off') && (element !== null)) {
					element.parentElement.removeChild(element);
				};
			};
		});
    }, 60000);
}, (60 - (new Date().getSeconds())) * 1000);

function injectOnLoad(items){
    if (items["settings"] !== undefined) {
        let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
        if ((items["settings"]['darkmode'] === 'off')) {
            (document.body || document.head || document.documentElement).appendChild(style);
        } else if ((items['settings']['darkmode'] !== 'off') && (items['settings']['timebasedDarkmode'] === 'on') && (Number(items['settings']['sunrise']) <= totalMinutes) && (totalMinutes < Number(items['settings']['sunset']))) {
            (document.body || document.head || document.documentElement).appendChild(style);
        }
    }
}

chrome.runtime.onMessage.addListener(updateStyle);
let style = document.createElement('style');
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