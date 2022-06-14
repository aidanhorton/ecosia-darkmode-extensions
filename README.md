<img src="Chrome & FireFox\images\EcosiaDarkMode.png" alt="Ecosia Dark Mode">
<hr>


## **About**

**Ecosia Dark Mode** is a simple Chrome, FireFox & Edge extension that sets the Ecosia search engine and related services to dark mode.

Visit the browser extension pages for [<u>Chrome</u>](https://chrome.google.com/webstore/detail/ecosia-dark-mode/hfpbjnmjofmfpnkcmdnkgndahgpjhpih), [<u>FireFox</u>](https://addons.mozilla.org/en-GB/firefox/addon/ecosia-dark-theme/) & [<u>Edge</u>](https://microsoftedge.microsoft.com/addons/detail/ecosia-dark-mode/bcegabpbpglfkoelpjgdoofgfgmicjdk) and install to begin using the dark mode.


## **Development plan**

<ul>
	<li>Keep the extension up-to-date!</li>
	<li>Make sure the extension works with Ecosia's new redesign</li>
	<li>Add a slider for setting Ecosia to be your default browser.</li>
	<li>Add options for colours</li>
	<li>See if it's possible to add tree-counter to Chrome new-tab page.</li>
	<li>Add search suggestions to newtab page.</li>
	<li>Up the ease of the upkeep of the extension</li>
	<li>See more on our 'Issues' section. Raise any suggestions there!</li>
</ul>


## **Permissions & Privacy**

No personal data is collected, no data is sent/shared to third-parties, no data is used outside of this extension.

This extension requires a few permissions in order to function - these are detailed below:

<ul>
	<li><b>Browser tabs</b> - This permission lets the extension see which tabs are open - so it can apply the dark theme to the correct pages.</li>
	<li><b>Browsing history</b> - This is the 'scariest' permission, in reality this permission just allows the extension to display the most visited sites on the new-tab page, much like the default Chrome page, and the Ecosia new-tab page. This data is not collected in any way, it is only used to display the top visited websites.</li>
	<li><b>Read & change data on ...</b> - This allows the extension to inject the dark-mode style into the webpages. Without it there would be no dark mode!</li>
	<li><b>Replace the page that you see when opening a new tab</b> - In the Chrome browser, the new-tab page gets replaced, this is because Ecosia by default with their extension supplies their own new-tab page, but this is not in dark mode. Due to security concerns by Google, you cannot modify another extensions new-tab page, therefore a recreation of this page had to be made to ensure a seamless dark-mode experience. You can disable this new-tab page upon installation if you'd prefer not to have it.</li>
</ul>

You are free to look at the code to verify how this extension uses the above permissions.


## **Contributions**

Contributions are welcome! Look out for the "free to pickup" tag on an issue if you want to pick up an existing issue - or just ask if you're unsure!

If you find a bug please report it, and if you want any new features please add them to the issues list!

In case you want to contribute, here is a brief explanation of how things are done as of right now. the files for the extension lies in "Chrome & FireFox". Styling for pages are kept in "Chrome & FireFox/injection-styling". The CSS-files inside are being loaded into the page by the JavaScript-files in "Chrome & FireFox/injection-scripts". The popup-files are the files for the extension-button in the toolbar with the settings for the extension. "Chrome & FireFox/pages" has the files for the new-tab-page on Chrome. 