document.addEventListener('DOMContentLoaded', () => {

    const soundChoiceMenu = document.getElementById('soundChoice');
    const playButton = document.querySelector('.play-button');
    const submitButton = document.querySelector('.submit-button');
    const reloadButton = document.querySelector('.reload-button'); 
    const statusMessage = document.getElementById('statusMessage');
    const sounds = {
        Animal: [' ', 'Bird', 'Cat', 'Dog', 'Duck']
    };
	
    
    const durationMs = 200;
	const params = new URLSearchParams(window.location.search);
	let another1 = Number(params.get('another1') || 0);

    let categoryChoice = 'Animal';
    let selectedAudio = '';
	let soundPath = `'; ./media/captcha-sounds/pixabay-com-sound-effects/Med/${categoryChoice}/${selectedAudio}.mp3`;
    let randomNum = Math.floor(Math.random() * sounds[categoryChoice].length);
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
	



    updateSoundChoices();

    function logMessage(msg) {
        console.log(msg);
        const debugEl = document.getElementById('debug');
        if (debugEl) {
            debugEl.textContent += msg + '\n';
        }
    }
	
	function updateSoundChoices() {
		console.log("Updating Sound Choice");
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
        
		while (randomNum < 1){
			randomNum = Math.floor(Math.random() * sounds[categoryChoice].length);
		}
		
    }



    // Detect input method
    window.addEventListener('keydown', () => inputMethod = 'keyboard');
    window.addEventListener('mousedown', () => inputMethod = 'mouse');
    window.addEventListener('touchstart', () => inputMethod = 'touchstart');
    window.addEventListener('touchmove', () => inputMethod = 'touchmove');
    window.addEventListener('touchend', () => inputMethod = 'touchend');




// --- Audio helpers ---
let currentAudio = null;

function stopAudio() {
  try { currentAudio?.pause(); } catch {}
  currentAudio = null;
}

function buildAudio(src) {
  const a = new Audio(src);
  a.preload = 'auto';
  a.crossOrigin = 'anonymous'; // safe if you later use Web Audio
  a.playbackRate = 1.0;
  return a;
}

function playSelectedSound(categoryChoice, randomNum) {
  const selectedAudioName = sounds[categoryChoice][randomNum].toLowerCase();
  const soundPath = `./media/captcha-sounds/pixabay-com-sound-effects/Med/${categoryChoice}/${selectedAudioName}.mp3`;

  // Stop any prior audio and create a new instance
  stopAudio();
  const a = buildAudio(soundPath);
  currentAudio = a;

  const startPlayback = () => {
    a.currentTime = 0;
    const p = a.play();
    if (p && typeof p.then === 'function') {
      p.catch(err => {
        console.warn('Playback failed:', err);
        // Optional: show a message to the user or retry
      });
    }
  };

  // If enough data is buffered, play immediately; otherwise wait
  if (a.readyState >= 3 /* HAVE_FUTURE_DATA */) {
    startPlayback();
  } else {
    a.addEventListener('canplaythrough', startPlayback, { once: true });
    a.load();
  }
}

// --- Play button ---
playButton.addEventListener('click', () => {
  // Ensure selectedAudioName/randomNum reflect the current menu state
  randomNum = Math.floor(Math.random() * sounds[categoryChoice].length);
  playSelectedSound(categoryChoice, randomNum);
});



    // Submit button
    submitButton.addEventListener('click', () => {
		console.log("Submit button click detected");
        audio.pause();
        const selectedValue = soundChoiceMenu.value;
        if (selectedAudio.toLowerCase() === selectedValue.toLowerCase()) {
			if(another1 < 2){
				statusMessage.textContent = 'That was successful, try another one';
				submitButton.style.display = 'none';
				another1 = another1 + 1;
			}else{ // 3rd and final try
				statusMessage.textContent = 'That was successful. Thank you for trying three.';
				another1 = another1 + 1;
				submitButton.style.display = 'none';
				reloadButton.style.display = 'none';
			}
        } else {
			if(another1 < 2){
				statusMessage.textContent = 'That was unsuccessful. Please try again.';
				submitButton.style.display = 'none';
				another1 = another1 + 1;
			}else{ //3rd and final try
				statusMessage.textContent = 'That was unsuccessful.  Thank you for trying three.';
				another1 = another1 + 1;
				submitButton.style.display = 'none';
				reloadButton.style.display = 'none';
			}
        }
        statusMessage.style.backgroundColor = '#000';
        statusMessage.style.color = '#fff';
    });
	
	


	// Reload button

	reloadButton.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		const url = new URL(window.location.href);
		url.search = new URLSearchParams({ another1: String(another1) }).toString();
		window.location.replace(url.toString());
		return;
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
    [soundChoiceMenu].forEach(select => {
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