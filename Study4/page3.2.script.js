document.addEventListener('DOMContentLoaded', () => {
    const soundsMenu = document.getElementById('sounds');
    const soundChoiceMenu = document.getElementById('soundChoice');
    const playButton = document.querySelector('.play-button');
    const submitButton = document.querySelector('.submit-button');
    const reloadButton = document.querySelector('.reload-button'); // NEW
    const statusMessage = document.getElementById('statusMessage');
    
	const sounds = {
		Words: [
			'Alfa', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 
			'Juliett', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 
			'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'
		],
		Letters: [
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
			'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		],
		Numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
	};


    let categoryChoice = 'Words';
    let selectedAudio = '';
    let randomNum = 0;
    let audio = new Audio();
    let inputMethod = 'mouse';
	let touch = 0;
	let dx = 0;
	let dy = 0;
	let distance = 0;
	let touchStartX = 0;
	let touchStartY = 0;
	let touchEndX = 0;
	let touchEndY = 0;
	let isMoving = false;

  
 if (window.location.search) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }



    function updateSoundChoices() {
        soundsMenu.focus();
        touchStartY = 0;
		touchStartY = 0;
        isMoving = false;
        soundChoiceMenu.innerHTML = '';
		console.log("UpdateSoundChoices with sounds[categoryChoice] " + sounds[categoryChoice]);
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
		console.log("In soundChange and event.target.value is " + event.target.value);
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
    window.addEventListener('touchstart', () => inputMethod = 'touchstart');
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
    soundsMenu.addEventListener('touchstart', (e) => {
		touch = e.touches[0];
		touchStartX = touch.clientX;
		touchStartY = touch.clientY;
		isMoving = false;
		logMessage("in touchmove");
    });
	
    soundsMenu.addEventListener('touchmove', (e) => {
		isMoving = true;
		touch = e.touches[0];
		touchEndX = touch.clientX;
		touchEndY = touch.clientY;
		logMessage("in touchmove");
    });

    soundsMenu.addEventListener('touchend', (event) => {
		if (isMoving) {
			dx = Math.abs(touchEndX - touchStartX);
			dy = Math.abs(touchEndY - touchStartY);
			distance = Math.sqrt(dx * dx + dy * dy);

			if (distance > 10) { // threshold to avoid false positives
				console.log("Selection or gesture detected");
				// trigger selection logic
				soundChange(event);
			}
		}
		logMessage("in touchend");
    });

    // Play button
    playButton.addEventListener('click', () => {
        selectedAudio = sounds[categoryChoice][randomNum].toLowerCase();
        const soundPath = `./media/captcha-sounds/openart-ai/Dave_British/${categoryChoice}/audio-${selectedAudio}.mp3`;
        console.log(soundPath);
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
            submitButton.focus();
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
        window.location.href = "https://schmeelk.github.io/AccessibilityTesting/Study4/page1.11.html";
		console.log("Current URL after reload:", window.location.href);
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