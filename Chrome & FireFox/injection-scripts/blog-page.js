// Creates the link-elements
let spesificStyle = document.createElement('link');
spesificStyle.id = "EcosiaDarkMode";
spesificStyle.className = "EcosiaDarkMode";
spesificStyle.rel = 'stylesheet';
spesificStyle.href = chrome.runtime.getURL('injection-styling/blog-page.css');

styles.push(spesificStyle);
