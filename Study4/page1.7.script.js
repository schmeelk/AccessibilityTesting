window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sounds').selectedIndex = 0;
  document.getElementById('soundChoice').selectedIndex = 0;
  document.getElementById('sounds').focus();
});

const statusMessage = document.getElementById('statusMessage');
const soundsMenu = document.getElementById('sounds');
const soundChoiceMenu = document.getElementById('soundChoice');
const playButton = document.querySelector('.play-button');
const submitButton = document.querySelector('.submit-button');

const sounds = {
  'Animal': ['Bird', 'Cat', 'Dog', 'Duck'],
  'Instrument': ['Piano', 'Drum', 'Trumpet', 'Guitar'],
  'MorseCode': ['Dit', 'Dit-Dah', 'Dah-Dah-Dit', 'Dah-Dit-Dit-Dit']
};

let categoryChoice = 'Animal';
let selected_audio = '';
let randomNum = 0;
let audio = new Audio();

// Update sound choices when category changes
soundsMenu.addEventListener('change', (event) => {
  categoryChoice = event.target.value;
  soundChoiceMenu.innerHTML = '';
  sounds[categoryChoice].forEach(soundName => {
    const option = document.createElement('option');
    option.value = soundName;
    option.textContent = soundName;
    soundChoiceMenu.appendChild(option);
  });
  randomNum = Math.floor(Math.random() * sounds[categoryChoice].length);
  statusMessage.textContent = `Sound category changed to ${categoryChoice}.`;
  statusMessage.style.color = '#000';
  statusMessage.style.backgroundColor = '#f0f0f0';
});

// Play sound button
playButton.addEventListener('click', () => {
  selected_audio = sounds[categoryChoice][randomNum].toLowerCase();
  const soundPath = `./media/captcha-sounds/pixabay-com-sound-effects/Med/${categoryChoice}s/${selected_audio}.mp3`;
  audio.src = soundPath;
  audio.pause();
  audio.currentTime = 0;
  audio.play();
  statusMessage.textContent = `Playing sound for ${categoryChoice}.`;
  statusMessage.style.color = '#fff';
  statusMessage.style.backgroundColor = '#000000';
  soundChoiceMenu.focus();
});

// Submit button with visual + accessible feedback
submitButton.addEventListener('click', () => {
  audio.pause();
  const selectedValue = soundChoiceMenu.options[soundChoiceMenu.selectedIndex].text;
  if (selected_audio.toLowerCase() === selectedValue.toLowerCase()) {
    statusMessage.textContent = 'Success! Your choice matches the sound.';
    statusMessage.style.color = '#fff';
    statusMessage.style.backgroundColor = '#000000';
  } else {
    statusMessage.textContent = 'Incorrect. Please try again.';
    statusMessage.style.color = '#fff';
    statusMessage.style.backgroundColor = '#000000';
  }
  soundsMenu.focus();
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