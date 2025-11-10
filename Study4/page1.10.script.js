document.addEventListener('DOMContentLoaded', () => {
  const soundsMenu = document.getElementById('sounds');
  const soundChoiceMenu = document.getElementById('soundChoice');
  const playButton = document.querySelector('.play-button');
  const submitButton = document.querySelector('.submit-button');
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


  function updateSoundChoices() {
    soundChoiceMenu.innerHTML = '';
    sounds[categoryChoice].forEach(soundName => {
      const option = document.createElement('option');
      option.value = soundName;
      option.textContent = soundName;
      soundChoiceMenu.appendChild(option);
    });
    randomNum = Math.floor(Math.random() * sounds[categoryChoice].length);
  }

  // Focus sound choice on page load
  document.getElementById('sounds').selectedIndex = 0;
  document.getElementById('soundChoice').selectedIndex = 0;
  window.addEventListener('keydown', () => inputMethod = 'keyboard');
  window.addEventListener('mousedown', () => inputMethod = 'mouse');
  soundsMenu.focus();
  updateSoundChoices();

  soundsMenu.addEventListener('change', (event) => {
    console.log("Change event in soundsMenu from: " + inputMethod);
    console.log("Change event in soundsMenu from: event.key " + event.key);
    if (inputMethod === 'mouse' || event.key === 'Enter') {
       soundChange();
    }
  });

  soundsMenu.addEventListener('keydown', (event) => {
    console.log("Change event in soundsMenu from keypad: event.key " + event.key);
    if (event.key === 'Enter') {
        soundChange();
    }
  });
 
  function soundChange() {
    categoryChoice = event.target.value;
    updateSoundChoices();
    statusMessage.textContent = `Sound category changed to ${categoryChoice}.`;
    statusMessage.style.backgroundColor = '#f0f0f0';
    statusMessage.style.color = '#000';
    playButton.focus(); // Move focus back to Play button for convenience
  }

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



  soundChoiceMenu.addEventListener('change', (event) => {
    console.log("Change event in soundChoiceMenu from: " + inputMethod);
    console.log("Change event in soundChoiceMenu from: event.key " + event.key);
    if (inputMethod === 'mouse' || event.key === 'Enter') {
       soundChange();
    }
  });

  //soundChoiceMenu.addEventListener('change', (event) => {
  //  console.log("Change event in soundChoiceMenu");
  //  submitButton.focus();
  //});

  soundChoiceMenu.addEventListener('keydown', (event) => {
    console.log("Change event in soundChoiceMenu from keypad: event.key " + event.key);
    if (event.key === 'Enter') {
        submitButton.focus();
    }
  });

  submitButton.addEventListener('click', () => {
    audio.pause();
    const selectedValue = soundChoiceMenu.value;
    if (selectedAudio.toLowerCase() === selectedValue.toLowerCase()) {
      statusMessage.textContent = 'Success! Your choice matches the sound.';
      soundsMenu.focus();
    } else {
      statusMessage.textContent = 'Incorrect. Please try again.';
      soundChoiceMenu.focus();
    }
    statusMessage.style.backgroundColor = '#000';
    statusMessage.style.color = '#fff';
  });

  // Keyboard accessibility for buttons
  [playButton, submitButton].forEach(button => {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Toggle aria-expanded for dropdowns
  [soundsMenu, soundChoiceMenu].forEach(select => {
    select.addEventListener('focus', () => select.setAttribute('aria-expanded', 'true'));
    select.addEventListener('blur', () => select.setAttribute('aria-expanded', 'false'));
  });

  // Ensure keyboard navigation works for dropdowns
  [soundsMenu, soundChoiceMenu].forEach(select => {
    select.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        select.blur(); // Confirm selection
        //playButton.focus(); // Move focus back to Play button for convenience
      }
    });
  });
});