
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('guessInput').focus();
  });


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
        `Let ${variableName} = ${variableValue}`;

      document.getElementById('expression').innerHTML =
        `${expressionLatex}`;

      document.getElementById('result').textContent = '';
      document.getElementById('guessInput').value = '';

      if (window.MathJax) {
        MathJax.typesetPromise();
      }
    }

    // Initial generation
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
  

