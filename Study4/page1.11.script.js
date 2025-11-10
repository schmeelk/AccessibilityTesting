document.addEventListener('DOMContentLoaded', () => {
    const soundsMenu = document.getElementById('sounds');
    const soundChoiceMenu = document.getElementById('soundChoice');
    const playButton = document.querySelector('.play-button');
    const submitButton = document.querySelector('.submit-button');
    const reloadButton = document.querySelector('.reload-button'); // NEW
    const statusMessage = document.getElementById('statusMessage');
    const sounds = {
        Animal: ['Bird', 'Cat', 'Dog', 'Duck'],
        Instrument: ['Piano', 'Drum', 'Trumpet', 'Guitar'],
        MorseCode: ['Dit', 'Dit-Dah', 'Dah-Dah-Dit', 'Dah-Dit-Dit-Dit']
    };

    let categoryChoice = 'Animal';
    let selectedAudio = '';
    let randomNum = 0;
    let audio = new Audio();
    let inputMethod = 'mouse';
    let touchStartY = 0;
    let isScrolling = false;

    function updateSoundChoices() {
        soundsMenu.focus();
        touchStartY = 0;
        isScrolling = false;
        soundChoiceMenu.innerHTML = '';
        sounds[categoryChoice].forEach(soundName => {
            const option = document.createElement('option');
            option.value = soundName;
            option.textContent = soundName;
            soundChoiceMenu.appendChild(option);
        });
        randomNum = Math.floor(Math.random() * sounds[categoryChoice].length);
    }

    function logMessage(msg) {
        console.log(msg);
        const debugEl = document.getElementById('debug');
        if (debugEl) {
            debugEl.textContent += msg + '\n';
        }
    }

    function soundChange(event) {
        categoryChoice = event.target.value;
        updateSoundChoices();
        statusMessage.textContent = `Sound category changed to ${categoryChoice}.`;
        statusMessage.style.backgroundColor = '#f0f0f0';
        statusMessage.style.color = '#000';
        playButton.focus();
    }

    // Initial setup
    document.getElementById('sounds').selectedIndex = 0;
    document.getElementById('soundChoice').selectedIndex = 0;

    // Detect input method
    window.addEventListener('keydown', () => inputMethod = 'keyboard');
    window.addEventListener('mousedown', () => inputMethod = 'mouse');
    window.addEventListener('touchstart', (e) => {
        inputMethod = 'touchstart';
        touchStartY = e.touches[0].clientY;
    });
    window.addEventListener('touchmove', () => inputMethod = 'touchmove');
    window.addEventListener('touchend', () => inputMethod = 'touchend');

    updateSoundChoices();

    // Mouse & keyboard events
    soundsMenu.addEventListener('change', (event) => {
        if (inputMethod === 'mouse' || event.key === 'Enter') {
            soundChange(event);
        }
    });

    soundsMenu.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            soundChange(event);
        }
    });

    // Touch events
    soundsMenu.addEventListener('touchmove', (e) => {
        const touchCurrentY = e.touches[0].clientY;
        if (Math.abs(touchCurrentY - touchStartY) > 10) {
            isScrolling = true;
        }
		logMessage("in touchmove");
    });

    soundsMenu.addEventListener('touchend', (event) => {
        if (!isScrolling) {
            soundChange(event);
        }
		logMessage("in touchend");
    });

    // Play button
    playButton.addEventListener('click', () => {
        selectedAudio = sounds[categoryChoice][randomNum].toLowerCase();
        const soundPath = `./media/captcha-sounds/pixabay-com-sound-effects/Med/${categoryChoice}/${selectedAudio}.mp3`;
        audio.src = soundPath;
        audio.pause();
        audio.currentTime = 0;
        audio.play();
        statusMessage.textContent = `Playing sound for ${categoryChoice}.`;
        statusMessage.style.backgroundColor = '#000';
        statusMessage.style.color = '#fff';
        soundChoiceMenu.focus();
    });

    // Sound choice menu
    soundChoiceMenu.addEventListener('change', (event) => {
        if (inputMethod === 'mouse' || event.key === 'Enter') {
            soundChange(event);
        }
    });

    soundChoiceMenu.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            submitButton.focus();
        }
    });

    // Submit button
    submitButton.addEventListener('click', () => {
        audio.pause();
        const selectedValue = soundChoiceMenu.value;
        if (selectedAudio.toLowerCase() === selectedValue.toLowerCase()) {
            statusMessage.textContent = 'Success! Your choice matches the sound.';
            reloadButton.focus();
        } else {
            statusMessage.textContent = 'Incorrect. Please try again.';
            soundChoiceMenu.focus();
        }
        statusMessage.style.backgroundColor = '#000';
        statusMessage.style.color = '#fff';
    });


	// Reload button
	reloadButton.addEventListener('click', () => {
		console.log("Reload button click detected");
        console.log("Current URL before reload:", window.location.href);
        setTimeout(() => {
                const cleanUrl = window.location.origin + window.location.pathname;
                console.log("Reloading with clean URL:", cleanUrl);
                window.location.href = cleanUrl;
            }, 5000);
        });



    // Keyboard accessibility for buttons
    [playButton, submitButton, reloadButton].forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Accessibility for dropdowns
    [soundsMenu, soundChoiceMenu].forEach(select => {
        select.addEventListener('focus', () => select.setAttribute('aria-expanded', 'true'));
        select.addEventListener('blur', () => select.setAttribute('aria-expanded', 'false'));
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                select.blur();
            }
        });
    });
});