let randomNumber = Math.floor(Math.random() * 100) + 1;

  const guesses = document.querySelector('.guesses');
  const form = document.querySelector('.form');
  const attempts = document.querySelector('.attempts');
  const lastResult = document.querySelector('.lastResult');
  const lowOrHi = document.querySelector('.lowOrHi');

  const guessSubmit = document.querySelector('.guessSubmit');
  const guessField = document.querySelector('.guessField');

  let guessCount = 1;
  let resetButton;

  function checkGuess() {
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
      guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';
    attempts.textContent = 'Remaining attempts: ' + (9 - guessCount + 1);

    if (userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! You guessed the number :)';
      lastResult.style.backgroundColor = '#31E981';
      lastResult.style.color = '#000';
      lastResult.style.fontSize = '14pt';
      lowOrHi.textContent = '';
      setGameOver();
    } else if (guessCount === 10) {
      lastResult.textContent = 'GAME OVER!';
      lastResult.style.fontSize = '22pt';
      lowOrHi.textContent = 'The number was: ' + randomNumber;
      setGameOver();
    } else {
      lastResult.textContent = 'Wrong!';
      lastResult.style.backgroundColor = '#DB324D';
      lastResult.style.color = '#fff';
      lastResult.style.fontSize = '14pt';
      if(userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
      } else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
      }
    }

    guessCount++;
    guessField.value = '';
  }

  guessSubmit.addEventListener('click', checkGuess);

  function setGameOver() {
    form.style.display = 'none';
    guesses.style.display = 'none';
    attempts.style.display = 'none';
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.getElementById('gameDiv').appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
  }

  function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);
    form.style.display = 'inline-block';
    guesses.style.display = 'block';
    attempts.style.display = 'block';
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'transparent';

    randomNumber = Math.floor(Math.random() * 100) + 1;
  }
