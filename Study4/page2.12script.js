
 const statusMessage = document.getElementById('statusMessage');
 const submitButton = document.querySelector('.submit-button');
 const newExpressionBtn = document.getElementById('newExpressionBtn');
 const guessInputField = document.getElementById('guessInput');
 let variableName = 'x';
 let variableValue, otherValue, actualValue;
	
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('guessInput').focus();
  });


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
        `Let ${variableName} = ${variableValue}`;

      document.getElementById('expression').innerHTML =
        `${expressionLatex}`;

      document.getElementById('result').textContent = '';
      document.getElementById('guessInput').value = '';

      if (window.MathJax) {
        MathJax.typesetPromise();
      }
	  
	  statusMessage.textContent = 'Status: New expression generated.';
	  statusMessage.style.backgroundColor = '#000';
      statusMessage.style.color = '#fff';
    }

    // Initial generation
    generateExpression();

    submitButton.addEventListener('click', () => {
      event.preventDefault();
     console.log("In guessform submit");
      const guess = parseInt(document.getElementById('guessInput').value, 10);
      const resultEl = document.getElementById('result');
 
        if (guess === actualValue) {
            statusMessage.textContent = 'Status: Success! The maths match!';
            newExpressionBtn.focus();
        } else {
            statusMessage.textContent = 'Status: Incorrect. Please try maths again.';
			document.getElementById("guessInput").value = "";
            guessInputField.focus();
        }
        statusMessage.style.backgroundColor = '#000';
        statusMessage.style.color = '#fff';
    });

 newExpressionBtn.addEventListener('click', generateExpression);
  

