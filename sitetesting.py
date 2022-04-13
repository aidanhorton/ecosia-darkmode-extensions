__auther__ = 'OppnedKatt'
__version__ = 1.0

import subprocess
import webbrowser


# List of supported sites
urls = [
    'https://www.ecosia.org/search?q=ecosia dark mode',
    'https://www.ecosia.org/images?q=ecosia dark mode',
    'https://www.ecosia.org/news?q=ecosia dark mode',
    'https://www.ecosia.org/videos?q=ecosia dark mode',
    'https://www.ecosia.org/settings',
    'https://www.ecosia.org/account/login',
    'https://blog.ecosia.org/',
    'https://ecosia.zendesk.com/hc/en-us'
]


# Allows the creation of browser-objects
class search_class:
    def __init__(self, browsername: str, browserpath: str, browser_temp_extention_url: str, opens_settings: bool):
        self.name = browsername
        self.tempurl = browser_temp_extention_url
        self.opens_settings = opens_settings
        
        webbrowser.register(browsername, None, webbrowser.BackgroundBrowser(browserpath))

# Creates objects for browsers, and adds them to a list
firefox = search_class('firefox', r'C:\Program Files\Mozilla Firefox\firefox.exe', 'about:debugging#/runtime/this-firefox', True)
chrome = search_class('chrome', r'C:\Program Files\Google\Chrome\Application\chrome.exe', 'chrome://extensions', False)
browsers = [firefox, chrome]


# Goes through all the browsers, and opens the supported urls in them
for browser in browsers:
    print(f'=== Current browser: {browser.name.capitalize()} ===')
    
    # Tries to open the page where you can load in local extentions
    if browser.opens_settings:
        webbrowser.get(browser.name).open_new(browser.tempurl)
    else:
        webbrowser.get(browser.name).open_new('Replace_this')
        subprocess.check_call(f'echo {browser.tempurl}|clip', shell=True) # '|pbcopy' on mac
        print(f'A link to the page for temporary extensions on {browser.name.capitalize()} has been copied to your clipboard!')
    input('Make sure the extension is on, and then press enter to continue: ')
    
    # Goes through all the supported urls
    for url in urls:
        webbrowser.get(browser.name).open_new_tab(url)
        input('Press enter to continue: ')
