# Ecosia Dark Mode

**Ecosia Dark Mode** is a simple Chrome & FireFox extension that sets the Ecosia search engine and related services to dark mode.

Visit the browser extension pages for [Chrome](https://chrome.google.com/webstore/detail/ecosia-dark-mode/hfpbjnmjofmfpnkcmdnkgndahgpjhpih?hl=en&authuser=0) and [FireFox](https://addons.mozilla.org/en-GB/firefox/addon/ecosia-dark-theme/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search) and install to begin using the dark mode.


## Development plan

<ul>
	<li>Keep the theme up-to-date!</li>
	<li>Fix occasional bug where style only applies to part of the page.</li>
	<li>Fix very rare bug where page flashes default colours on load before turning dark.</li>
	<li>Add a settings page with customizable options such as dark theme colours.</li>
	<li>Add a slider for setting Ecosia to be your default browser.</li>
	<li>See if it's possible to add tree-counter to Chrome new-tab page.</li>
	<li>Contact Ecosia directly to see if any integration or partnership is possible.</li>
</ul>


## Contributions

Contributions are welcome! If you find a bug please report it, and if you want any new features please add them to the issues list!

## Permissions & Privacy

No personal data is collected, no data is sent/shared to third-parties, no data is used outside of this extension.

This extension requires a few permissions in order to function - these are detailed below:


<ul>
	<li>Browser tabs - This permission lets the extension see which tab is active - so it can apply the dark theme to the correct pages.</li>
	<li>Browsing history - This is the 'scariest' permission, in reality this permission just lets me display the most visited sites on the new-tab page, much like the default Chrome page, and the Ecosia new-tab page. This data is not collected in any way, it is only used to display the top visited websites.</li>
	<li>Read & change data on blog.ecosia.org, info.ecosia.org, www.ecosia.org - This allows us to inject the dark-mode style into the webpages - without it there would be no dark mode!</li>
	<li>Replace the page that you see when opening a new tab - In the Chrome browser, we replace the new-tab page, this is because Ecosia by default with their extension supplies their own new-tab page, but this is not in dark mode. Due to security concerns by Google, you cannot modify another extensions new-tab page, therefore I had to create my own version of this page to ensure a seamless dark-mode experience. You can disable this new-tab page upon installation if you'd prefer not to have it.</li>
</ul>


You are free to look at the code to verify how this extension uses the above permissions.
