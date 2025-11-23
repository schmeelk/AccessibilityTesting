 let a, b, actualValue;
 const statusMessage = document.getElementById('statusMessage');
 const submitButton = document.querySelector('.submit-button');
 const newExpressionBtn = document.getElementById('newExpressionBtn');
 const guessInputField = document.getElementById('guessInput');
	
    // Function to generate a new binomial expression
    function generateExpression() {
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      actualValue = a + b;
      document.getElementById('expression').textContent = `${a} + ${b}`;
      document.getElementById('result').textContent = '';
      document.getElementById('guessInput').value = '';
	  statusMessage.textContent = 'Status: New expression generated.';
	  statusMessage.style.backgroundColor = '#000';
      statusMessage.style.color = '#fff';
    }

	window.addEventListener('DOMContentLoaded', () => {
		guessInputField.focus();
	});

    // Initial expression generation
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
 