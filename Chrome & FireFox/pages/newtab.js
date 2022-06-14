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
				
				chrome.storage.local.get({"blacklistedUrls": []}, result => {
					let urls = result.blacklistedUrls;
					
					let topSite = target.parentElement.querySelector('.topSite').href;
					urls.push(topSite);
					
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
			icon.src = 'https://www.google.com/s2/favicons?domain=' + url.url;
		});
	});
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.topSites.get(buildPopupDom);

	// Handles the dropdown-button
	let link = document.getElementById('dropdown-button');
    link.addEventListener('click', function() {
        let list = document.getElementById('dropdown-list');
		
		if (list.style.display === 'block') {
			list.style.display = 'none';
			this.style.background = '';
		}
		else {
			list.style.display = 'block';
			this.style.background = '#3F3F3F';
		}
    });
	link.addEventListener('focusout', function() {
		if (!link.matches(':focus-within:not(:focus)')) {
			let link = document.getElementById('dropdown-button');
			let list = document.getElementById('dropdown-list');

			list.style.display = 'none';
			link.style.background = '';
		}
	});
});

// Updates the style when changes to the settings has been made.
function updateStyle(message, sender, sendResponse) {
	let element = document.getElementById('EcosiaLightMode');
    let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
	let settings = message.data;
	if ((settings['darkmode'] === 'on'
		&& settings['timebasedDarkmode'] === 'on'
		&& settings['sunrise'] <= totalMinutes
		&& totalMinutes < settings['sunset']
		)
		|| settings['darkmode'] === 'off'
	) {
        if (element === null) {
			document.head.appendChild(style);
        }
		
    }
	else if (settings['darkmode'] === 'on') {
		if (element) {
			element.remove();
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
			let settings = items['settings'];
            if (settings['darkmode'] !== 'off'
				&& settings['timebasedDarkmode'] === 'on'
				&& settings['sunrise'] <= totalMinutes
				&& totalMinutes < settings['sunset']
			) {
                if (element === null) {
					document.head.appendChild(style);
                };
            }
			else if (settings['darkmode'] !== 'off' && element) {
				element.remove();
            };
        };
    });

    // Checks the time every minute.
    setInterval(function() {
        chrome.storage.local.get(["settings"], function(items) {
			if (items['settings'] !== undefined) {
				let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
				let element = document.getElementById('EcosiaLightMode');
				let settings = items['settings'];
				if (settings['darkmode'] !== 'off'
					&& settings['timebasedDarkmode'] === 'on'
					&& settings['sunrise'] <= totalMinutes
					&& totalMinutes < settings['sunset']
				) {
					if (element === null) {
						document.head.appendChild(style);
					};
				} else if (settings['darkmode'] !== 'off' && element) {
					element.remove();
				};
			};
		});
    }, 60000);
}, (60 - (new Date().getSeconds())) * 1000);

function injectOnLoad(items) {
    if (items["settings"] !== undefined) {
        let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
		let settings = items['settings'];
        if ((settings['darkmode'] === 'off')) {
            (document.body || document.head || document.documentElement).appendChild(style);
        }
		else if (settings['darkmode'] !== 'off'
			&& settings['timebasedDarkmode'] === 'on'
			&& settings['sunrise'] <= totalMinutes
			&& totalMinutes < settings['sunset']
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
body, form, input, a, button, .nav-menu-group, #dropdown-list {
	background: #FFF !important;
	border-color: #E0E0E0 !important;
	color: #4A4A4A !important;
}

a.nav-link:hover, a.topSite:hover, button.dropdown-button:hover {
	background: #E0E0E0 !important;
}

.closeButton:hover > img, .topSite:hover ~ .closeButton > img {
    filter: brightness(0.2) !important;
}

.button-submit:hover > svg > path {
    fill: #353535 !important;
}

.logo-text {
	fill: #4B4A4B;
}`;
