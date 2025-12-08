 const statusMessage = document.getElementById('statusMessage');
 const submitButton = document.querySelector('.submit-button');
 const reloadButton = document.querySelector('.reload-button'); 
 const guessInputField = document.getElementById('guessInput');

const params = new URLSearchParams(window.location.search);
let another1 = Number(params.get('another1') || 0);
let variableName = 'x';
let variableValue, otherValue, actualValue;
	


    function generateExpression() {
      variableValue = Math.floor(Math.random() * 10) + 1;
      otherValue = Math.floor(Math.random() * 10) + 1;

      // Randomly decide if variable is first or second
      let isVarFirst = Math.random() < 0.5;
      let expressionLatex;
      if (isVarFirst) {
        actualValue = variableValue + otherValue;
        expressionLatex = `${variableName} + ${otherValue}`;
      } else {
        actualValue = otherValue + variableValue;
        expressionLatex = `${otherValue} + ${variableName}`;
      }

      document.getElementById('varValue').innerHTML =
        `Let ${variableName} = ${variableValue}, then what does ${expressionLatex} =`;

      document.getElementById('result').textContent = '';
      document.getElementById('guessInput').value = '';

      if (window.MathJax) {
        MathJax.typesetPromise();
      }
	  
    }

    // Initial generation
    generateExpression();

  submitButton.addEventListener('click', () => {
      event.preventDefault();
	  console.log("In guessform submit");
      const guess = parseInt(document.getElementById('guessInput').value, 10);
      const resultEl = document.getElementById('result');
 
        if (guess === actualValue) {
           	if(another1 < 2){
				statusMessage.textContent = 'That was successful.';
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
				statusMessage.textContent = 'That was unsuccessful.';
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

   	reloadButton.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		const url = new URL(window.location.href);
		url.search = new URLSearchParams({ another1: String(another1) }).toString();
		window.location.replace(url.toString());
		return;
	});