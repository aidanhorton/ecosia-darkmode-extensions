function buildPopupDom(mostVisitedURLs) {
	
	let mostVisited = document.getElementById('mostVisited');
	while (mostVisited.firstChild) mostVisited.lastChild.remove();
	
	let whitelistedUrls = [];
	
	chrome.storage.local.get({'blacklistedUrls': []}, function(result) {
		let blacklistedUrls = result.blacklistedUrls;
		console.log(blacklistedUrls);
		
		mostVisitedURLs.forEach(url => {
			if (!blacklistedUrls.includes(url.url)) {
				whitelistedUrls.push(url);
			}
		});

		let urls = Math.min(7, whitelistedUrls.length);
		whitelistedUrls.slice(0, urls).forEach(url => {
			let itemAndCloseWrapper = mostVisited.appendChild(document.createElement('div'));
			itemAndCloseWrapper.classList.add('itemAndCloseWrapper');
			
			let itemWrapper = itemAndCloseWrapper.appendChild(document.createElement('a'));
			itemWrapper.href = url.url;
			itemWrapper.classList.add('topSite');
	
			let toolTipWrapper = itemWrapper.appendChild(document.createElement('div'));
			toolTipWrapper.classList.add('toolTipWrapper');
	
			let toolTip = toolTipWrapper.appendChild(document.createElement('span'));
			toolTip.classList.add('toolTip');    
			toolTip.appendChild(document.createTextNode(url.title));
			
			let close = itemAndCloseWrapper.appendChild(document.createElement('a'));
			close.classList.add('closeButton');
			
			close.addEventListener('click', function() {
				let target = this;

				chrome.storage.local.get({'blacklistedUrls': []}, result => {
					let urls = result.blacklistedUrls;
					
					let topSite = target?.parentElement?.querySelector('.topSite')?.href;
					if (topSite) urls.push(topSite);

					chrome.storage.local.set({'blacklistedUrls': urls});
					chrome.topSites.get(buildPopupDom);
				});
				
				this.parentElement.remove();
			}, false);
			
			let closeImage = close.appendChild(document.createElement('img'));
			closeImage.src = 'Close.png';
			closeImage.classList.add('closeImage');
		
			let icon = itemWrapper.appendChild(document.createElement('img'));
			icon.classList.add('icon');
			icon.src = `https://www.google.com/s2/favicons?domain=${url.url}`;
		});
	});
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.topSites.get(buildPopupDom);

	// Handles the dropdown-button
	let link = document.getElementById('dropdown-button');
    link.addEventListener('click', function() {
        let list = document.getElementById("dropdown-list");
		
		if (list.style.display === "block") {
			list.style.display = "none";
		}
		else {
			list.style.display = "block";
		}
    });
	link.addEventListener('focusout', function(event) {
		let list = document.getElementById("dropdown-list");
		
		if (list.contains(event.relatedTarget)) {
			return;
		}
		
		list.style.display = "none";
	});
});

// Updates the style when changes to the settings has been made.
function updateStyle(message, sender, sendResponse) {
	let element = document.getElementById('EcosiaLightMode');
	let settings = message.data;
	let darkmodeOff = settings['darkmode'] === 'off';

	// Time-based
    let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
	let timebasedOn = settings['timebasedDarkmode'] === 'on';
	let afterSunrise = settings['sunrise'] <= totalMinutes;
	let beforeSunset = totalMinutes < settings['sunset'];
	let suntime = !darkmodeOff && timebasedOn && afterSunrise && beforeSunset

	if (darkmodeOff
		|| suntime
	) {
        if (element === null) {
			document.head.appendChild(style);
        }
    }
	else if (!darkmodeOff) {
		if (element) {
			element.remove();
        }
    }
}

chrome.storage.local.get(['settings'], injectOnLoad);

function checkTime() {
	chrome.storage.local.get(['settings'], function(items) {
        if (items['settings']) {
            let element = document.getElementById('EcosiaLightMode');
			let settings = items['settings'];
			let darkmodeOff = settings['darkmode'] === 'off';
		
			// Time-based
			let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
			let timebasedOn = settings['timebasedDarkmode'] === 'on';
			let afterSunrise = settings['sunrise'] <= totalMinutes;
			let beforeSunset = totalMinutes < settings['sunset'];
			let suntime = !darkmodeOff && timebasedOn && afterSunrise && beforeSunset
            
			if (darkmodeOff
				|| suntime
			) {
                if (element === null) {
					document.head.appendChild(style);
                };
            }
			else if (!darkmodeOff && element) {
				element.remove();
            };
        };
    });
}

// Sets a timeout to the next minute-change.
setTimeout(function() {
    // Runs it one time first because setInterval has to wait for one minute before it can start.
    checkTime();

    // Checks the time every minute.
    setInterval(checkTime, 60000);
}, (60 - new Date().getSeconds()) * 1000);

function injectOnLoad(items) {
    if (items['settings'] !== undefined) {
		let settings = items['settings'];
		let darkmodeOff = settings['darkmode'] === 'off';
	
		// Time-based
		let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
		let timebasedOn = settings['timebasedDarkmode'] === 'on';
		let afterSunrise = settings['sunrise'] <= totalMinutes;
		let beforeSunset = totalMinutes < settings['sunset'];
		let suntime = !darkmodeOff && timebasedOn && afterSunrise && beforeSunset
        
		if (darkmodeOff
			|| suntime
		) {
            (document.body || document.head || document.documentElement).appendChild(style);
        }
    }
}

// Messagehandler
function messageReceiver(message, sender, sendResponse) {
	if (message.data) {
		updateStyle(message, sender, sendResponse);
	}
	if (message.resetMostVisited) {
		chrome.topSites.get(buildPopupDom);
	}
}

chrome.runtime.onMessage.addListener(messageReceiver);


let style = document.createElement('style');
style.id = 'EcosiaLightMode';
style.classList.add('EcosiaLightMode');
style.type = 'text/css';
style.textContent = `
:root {
	--color-background-quaternary: #f0f0eb !important;
	--color-highlight-primary: #cff2d0 !important;
	--color-form-border-default: #bebeb9 !important;
	--color-button-background-primary-hover: #060;
	--color-button-background-secondary: #fff !important;
	--color-button-background-secondary-hover: #deded9 !important;
	--color-button-content-secondary: black !important;
	--color-brand-primary: #008009 !important;
	--color-elevation-layer-1: rgba(15, 15, 15, 0.18) !important;
	--color-elevation-layer-2: rgba(15, 15, 15, 0.06) !important;
}`;
