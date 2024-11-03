let solve_start = -1;
let solve_end = -1;
let submit_time = -1;
let submit_attempt_count = 0;
let play_button_attempt_count = 0;
let listOfSubmitObjects = [];
let selected_image = 'cat.jpg';
let soundPath = '';
let audio;

window.addEventListener('load', choosePic);


var myPix = new Array(
    "bird.jpg",
    "cat.jpg",
    "fireworks.jpg", 
	"dog.jpg"
);


function choosePic() {
    const randomNum = Math.floor(Math.random() * myPix.length);
    selected_image = myPix[randomNum];
    document.getElementById("myPicture").src = `./media/captcha-images/public-domain-www.publicdomainpictures.net/${selected_image}`;

    const playButtons = document.querySelector('.play-button');
    playButtons.addEventListener('click', onPlaySoundButtonClick);

    const submitButtons = document.querySelector('.submit-button');
    submitButtons.addEventListener('click', onSubmitButtonClick);
};


function SubmitDetails(match, comments, selectedTextValue) {
  //date, time, page, submit_time, start_time, end_time, imagefile_name, soundfile_name, attempts
  this.date = Date.now();
  this.page = 'Page7';
  this.submit_time = submit_time;
  this.solve_start_time = solve_start;
  this.solve_end_time = solve_end;
  this.imageFileName = selected_image;
  this.soundFileName = soundPath;
  this.textNames = selectedTextValue;
  this.accurate = match;
  this.submitAttemptNumber = submit_attempt_count;
  this.playButtonCount = play_button_attempt_count;
  this.usercomments = comments;
}



function onPlaySoundButtonClick() {
	//alert('Play Sound Button Submit clicked!');
    solve_start = Date.now(); 
    play_button_attempt_count = play_button_attempt_count + 1;
	soundPath = 	`./media/captcha-sounds/pixabay-com-sound-effects/Long/${selected_image.replace('.jpg', '.mp3')}`;
	console.log(soundPath);
	
	audio = new Audio(soundPath);
	audio.play();  //2seconds look at API ... edit media for different lenths  ... study A/B testing 
}

function onSubmitButtonClick() {
    //alert('Submit Button clicked!');
	if(audio){
		audio.pause();
	}
    solve_end = Date.now(); 
	submit_time = solve_end - solve_start;
	submit_attempt_count = submit_attempt_count + 1;
    console.log(submit_time);
	let mylist = document.getElementById("choiceList");  
	let input_from_user = document.getElementById("image_guess_input");
    let selected_value = mylist.options[mylist.selectedIndex].text;  
	let match = 'Fail';
	let comments = 'n/a';
	//alert('selected value is ' + selected_value);
	
	alert(input_from_user.value);
	let input_from_user_value = input_from_user.value
	input_from_user.value = "";
	if(selected_image.includes(input_from_user_value)){
		comments = prompt('Success! Type any comments here '); 
        match = 'Success';
	}
	else{
		comments = prompt('Please Try Again! Type any comments here ' + input_from_user_value + ' selected image:' + selected_image); 
		match = 'Fail';
	}
	console.log('onSubmitButtonClick after prompt!');
	console.log(comments);
	console.log(listOfSubmitObjects);
	let sd = new SubmitDetails(match, comments, selected_value);
	console.log(sd);
	listOfSubmitObjects.push(sd);
	writeUserData(sd);	
}

function writeUserData() {
  // date, time, page, submit_time, start_time, end_time, imagefile_name, soundfile_name
  localStorage.setItem("arraySubmits", listOfSubmitObjects); 
  console.log('write user data');
  console.log(listOfSubmitObjects);
}


function submitDetails2JSON(exportData){
	//https://stackoverflow.com/questions/2295496/convert-array-to-json
	//listOfSubmitObjects.forEach((element, index, array) => {
    //console.log(element.x); // 100, 200, 300
    //console.log(index); // 0, 1, 2
    //console.log(array); // same myArray object 3 times
    //});
	
    let json_arr = [];
    for(let i in listOfSubmitObjects) {
	  let o = listOfSubmitObjects[i];
      json_arr.push([{
	      "Sumit Details Time": o.date,  //.toString(),
		  "Export Date Information" : (new Date()).toString(),
		  //"Day" : o.date.getDay(),
		  //"Month" : o.date.getMonth(),
		  //"Year" : o.date.getYear(),
		  //"Hour" : o.date.getHours(),
		  //"Minute" : o.date.getMinutes(),
		  //"Milliseconds" : o.date.getMilliseconds(),
		  "Page":o.page,
		  "Submit Time":o.submit_time, //.toString(),
		  "Solve Start Time":o.solve_start_time, //.toString(),
		  "Solve End Time":o.solve_end_time, //.toString(),
		  "Image File Name":o.imageFileName,
		  "Sound File Name":o.soundFileName,
		  "Text Names":o.textNames,
		  "Accurate":o.accurate,
		  "Submit Attempt Number":o.submitAttemptNumber, //.toString(),
		  "Play Button Count":o.playButtonCount, //.toString(),
		  "User Comments":o.usercomments,
	  }]);  
    }
	console.log('Convert to JSON');
	console.log(json_arr);
	return json_arr;
}



 const csvButtons = document.querySelector('.export-csv');
 csvButtons.addEventListener('click', onCSVButtonsClick);
 
 function onCSVButtonsClick(event){
	 alert("CSV Button Clicked!");
	 let exportData = localStorage.getItem("arraySubmits");
	 console.log('in onCSVButtonsClick');
	 console.log(exportData);
	 let a = document.createElement("a");
	 console.log('here0');
	 //a.href = URL.createObjectURL(new Blob([JSON.stringify(SubmitDetails2JSON(exportData))], {
      //  type: "text/plain"
      //}));
	  console.log(JSON.stringify(exportData, null, 2));
	  a.href = URL.createObjectURL(new Blob([JSON.stringify(submitDetails2JSON(), null, 2)], {
        type: "application/json"
      }));
	  //JSON.parse(JSON.stringify(
	 //let file = new Blob([exportData], {type: 'text/plain'});
	 //let a = event.target.parent;
	 console.log('here1');
	 let fileDetails = prompt('Please enter any file name details here!'); 
	 //a.href = URL.createObjectURL(file);
	 a.setAttribute("download", fileDetails+'SubmitExportFile'+Date.now()+'.txt');
	 console.log('here2');
	 document.body.appendChild(a);
	 console.log('here3');
	 a.click();
	 console.log('here3');
     document.body.removeChild(a);
	 //a.download = fileDetails+'SubmitExportFile'+Date.now()+'.txt';
	 console.log('here4');
 }





