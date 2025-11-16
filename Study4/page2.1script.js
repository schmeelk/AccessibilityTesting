 let a, b, actualValue;

    // Function to generate a new binomial expression
    function generateExpression() {
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      actualValue = a + b;
      document.getElementById('expression').textContent = `${a} + ${b}`;
      document.getElementById('result').textContent = '';
      document.getElementById('guessInput').value = '';
    }

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('guessInput').focus();
  });

    // Initial expression generation
    generateExpression();

    document.getElementById('guessForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const guess = parseInt(document.getElementById('guessInput').value, 10);
      const resultEl = document.getElementById('result');

      if (guess === actualValue) {
        resultEl.textContent = "Correct! Well done.";
        resultEl.style.color = "green";
      } else {
        resultEl.textContent = `Incorrect. The correct answer is ${actualValue}.`;
        resultEl.style.color = "red";
      }
    });

    document.getElementById('newExpressionBtn').addEventListener('click', generateExpression);
 