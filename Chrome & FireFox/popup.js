// Gets the Ecosia logo and the Ecosia_darkmode logo elements, and applys their corresponding image to them
let darkLogo = document.getElementById('darkLogo');
darkLogo.src = chrome.runtime.getURL('images/EcosiaLogo32.png');
let lightLogo = document.getElementById('lightLogo');
lightLogo.src = chrome.runtime.getURL('images/EcosiaLogo.png');

// Sets the source of an empty img element to the Ecosia darkmode logo
document.getElementById('logoText').src = chrome.runtime.getURL('images/EcosiaDarkMode.png');


// Makes the dictionary for the settings
let settings = {};

function changeLogoBasedOnTime(settings) {
    let totalMinutes = new Date().getHours()*60 + new Date().getMinutes();
    if ((settings['darkmode'] !== 'off') && (settings['timebasedDarkmode'] === 'on') && (settings['sunrise'] <= totalMinutes) && (totalMinutes < settings['sunset'])) {
        lightLogo.style.opacity = '1';
        darkLogo.style.opacity = '0';
    } else if ((settings['darkmode'] !== 'off')) {
        lightLogo.style.opacity = '0';
        darkLogo.style.opacity = '1';
    };
}

// Gets the pre-existing settings if there are any
chrome.storage.local.get(['settings'], function(items) {
    if (items['settings'] !== undefined) { // If there are any pre-existing settings
        settings = {
            darkmode: (items['settings']['darkmode'] !== undefined) ? items['settings']['darkmode'] : 'on',
            timebasedDarkmode: (items['settings']['timebasedDarkmode'] !== undefined) ? items['settings']['timebasedDarkmode'] : 'off',
            sunrise: (items['settings']['sunrise'] !== undefined) ? items['settings']['sunrise'] : 360,
            sunset: (items['settings']['sunset'] !== undefined) ? items['settings']['sunset'] : 1080
        };

    } else { // If there are no pre-existing settings
        settings = {
            darkmode: 'on',
            timebasedDarkmode: 'off',
            sunrise: 360,
            sunset: 1080
        };
    };


    // Updates the popup with the current settings
    let darkmodeOnOff = document.getElementById('darkmodeOnOff');
    if (settings['darkmode'] == 'on') {
        darkmodeOnOff.checked = true;
        lightLogo.style.opacity = '0';
    } else {
        darkLogo.style.opacity = '0';
    };

    let timebasedDarkmode = document.getElementById('timebasedActivationOnOff');
    let sunrise = document.getElementById('sunrise');
    let sunset = document.getElementById('sunset');
    if (settings['timebasedDarkmode'] == 'on') {
        timebasedDarkmode.checked = true;
        sunrise.disabled = false;
        sunset.disabled = false;
    };

    function convertToTime(time) {
        let hour = Math.floor(time/60);
        let minute = time%60;
        return `${(String(hour).length == 1) ? `0${hour}` : hour}:${(String(minute).length == 1) ? `0${minute}` : minute}`;
    };

    if (settings['sunrise'] != '360') { sunrise.value = convertToTime(Number(settings['sunrise'])) };

    if (settings['sunset'] != '1080') { sunset.value = convertToTime(Number(settings['sunset'])) };

    // Gives the checkboxes their transition (hopefully after the checkboxes has been changed)
    setTimeout(function() {
        let sliders = document.querySelectorAll('.slider');
        sliders.forEach(element => {
            element.classList.add('slider-transition');
        });
        darkLogo.classList.add('slider-transition');
        lightLogo.classList.add('slider-transition');
    }, 10);


    // Adds inputevents to the settings in order to detect changes
    darkmodeOnOff.addEventListener('input', (event) => {
        if (darkmodeOnOff.checked === false) {
            settings['darkmode'] = 'off';
            lightLogo.style.opacity = '1';
            darkLogo.style.opacity = '0';
        } else {
            settings['darkmode'] = 'on';
            lightLogo.style.opacity = '0';
            darkLogo.style.opacity = '1';
        };
        notifySettingsChange(settings);
        changeLogoBasedOnTime(settings);
    });

    timebasedDarkmode.addEventListener('input', (event) => {
        if (settings['timebasedDarkmode'] == 'on') {
            settings['timebasedDarkmode'] = 'off';
            sunrise.disabled = true;
            sunset.disabled = true;
        } else {
            settings['timebasedDarkmode'] = 'on';
            sunrise.disabled = false;
            sunset.disabled = false;
        };
        notifySettingsChange(settings);
        changeLogoBasedOnTime(settings);
    });

    function correctTime(time) {
        let correct = false;
        time = [...time.matchAll(/[0-9]|:/g)].join('').replace(':', 'Q').replaceAll(':', '').replace('Q', ':');
        if (time.length >= 4) {
            let match = time.match(/[0-9][0-9]:[0-9][0-9]/);
            let match2 = time.match(/[0-9]:[0-9][0-9]/);

            if (match !== null) {
                correct = true;
            } else if (match2 !== null) {
                time = `0${match2[0]}`;
                correct = true;
            };
        };

        if (correct) {
            let totalMinutes = Number(time.substring(3)) + Number(time.substring(0, 2)*60);
            if (totalMinutes > 1439) { totalMinutes = 1439 };
            let hour = Math.floor(totalMinutes/60);
            let minute = totalMinutes%60;
            time = `${(String(hour).length === 1) ? `0${hour}` : hour}:${(String(minute).length === 1) ? `0${minute}` : minute}`; /* (String(hour).length === 1) ? `0${hour}` : hour */
        };

        return [time, correct];
    };

    sunrise.addEventListener('input', (event) => {
        let correctedSunriseTime = correctTime(sunrise.value);
        sunrise.value = correctedSunriseTime[0];
        let correct = correctedSunriseTime[1];

        if (correct) {
            sunrise.style.color = '';
            settings['sunrise'] = Number(sunrise.value.substring(3)) + Number(sunrise.value.substring(0, 2))*60;
            notifySettingsChange(settings);
        } else {
            sunrise.style.color = 'hsl(0, 90%, 50%)';
        };

        if (sunrise.value === '') {
            sunrise.style.color = '';
            settings['sunrise'] = 360;
            notifySettingsChange(settings);
        };

        changeLogoBasedOnTime(settings);
    });

    sunset.addEventListener('input', (event) => {
        let correctedSunsetTime = correctTime(sunset.value);
        sunset.value = correctedSunsetTime[0];
        let correct = correctedSunsetTime[1];

        if (correct) {
            sunset.style.color = '';
            settings['sunset'] = Number(sunset.value.substring(3)) + Number(sunset.value.substring(0, 2))*60;
            notifySettingsChange(settings);
        } else {
            sunset.style.color = 'hsl(0, 90%, 50%)';
        };

        if (sunset.value === '') {
            sunset.style.color = '';
            settings['sunset'] = 1080;
            notifySettingsChange(settings);
        };

        changeLogoBasedOnTime(settings);
    });

    // Updates the logo every minute
    setTimeout(function() {
        // Runs it one time first because setInterval has to wait for one minute before it can start.
        changeLogoBasedOnTime(settings);

        // Checks the time every minute.
        setInterval(function() {
            changeLogoBasedOnTime(settings);
        }, 60000);
    }, (60 - (new Date().getSeconds())) * 1000);

    // Updates all the tabs' data, and current state
    function notifySettingsChange(settings) {
        chrome.storage.local.set({'settings': settings});
        chrome.tabs.query({}, function(tabs) {
            for (let i = 0; i < tabs.length; i++) {
                chrome.tabs.sendMessage(tabs[i].id, {data: settings});
            };
        });
    };

});