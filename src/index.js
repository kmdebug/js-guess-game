const form = document.querySelector('form');
const notification = document.querySelector('.hidden');

const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const handleRanNumberStorage = (number) => {
  setLocalStorage('genNum', number);
};

const compareNumbers = (userGuessNumber, storedGuessNumber) =>
  userGuessNumber > storedGuessNumber
    ? 'Too high!'
    : userGuessNumber < storedGuessNumber
    ? 'Too low!'
    : `${storedGuessNumber} was the number!`;

const handlePlayAgainReset = () => {
  notification.textContent = '';
  notification.setAttribute('class', 'hidden');

  handleRanNumberStorage(generateRandomNumber());

  form.removeAttribute('class');
};

const handleFormSubmission = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = e.target[0].value;

    if (Number(input) < 1 || Number(input) > 100) {
      const isErrorExists = document.getElementById('error');

      if (!isErrorExists) {
        const small = document.createElement('small');

        small.id = 'error';

        const text = document.createTextNode(
          'Please enter a valid number: 1 - 100'
        );

        small.appendChild(text);

        small.classList.add(
          'bg-red-100',
          'text-red-500',
          'py-1',
          'tracking-tight',
          'rounded',
          'font-medium',
          'w-60',
          'mx-auto'
        );

        form.insertAdjacentElement('afterend', small);
      }

      return false;
    }

    const isErrorExists = document.getElementById('error');

    isErrorExists && isErrorExists.remove();

    const message = compareNumbers(
      Number(input),
      Number(getLocalStorage('genNum'))
    );

    switch (message) {
      case 'Too high!':
        notification.setAttribute('class', 'block');

        notification.textContent = message;

        notification.classList.add(
          'bg-red-500',
          'text-white',
          'w-44',
          'h-44',
          'grid',
          'place-content-center',
          'rounded',
          'mx-auto'
        );

        break;

      case 'Too low!':
        notification.setAttribute('class', 'block');

        notification.textContent = message;

        notification.classList.add(
          'bg-red-500',
          'text-white',
          'w-44',
          'h-44',
          'grid',
          'place-content-center',
          'rounded',
          'mx-auto'
        );

        break;

      default:
        notification.textContent = '';

        e.target[0].value = '';

        form.setAttribute('class', 'hidden');

        const p = document.createElement('p');

        p.textContent = message;

        notification.appendChild(p);

        notification.setAttribute('class', 'block');

        notification.classList.add(
          'bg-green-500',
          'text-white',
          'w-44',
          'h-44',
          'grid',
          'place-content-center',
          'rounded',
          'mx-auto'
        );

        const button = document.createElement('button');

        text = document.createTextNode('Play again!');

        button.appendChild(text);

        notification.appendChild(button);

        button.classList.add(
          'mt-3',
          'text-black',
          'bg-white',
          'focus:ring-2',
          'focus:outline-none',
          'focus:ring-white',
          'font-medium',
          'rounded',
          'text-[13.5px]',
          'sm:w-auto',
          'px-2',
          'py-1',
          'text-center'
        );

        button.addEventListener('click', handlePlayAgainReset);

        break;
    }
  });
};

const init = () => {
  handleRanNumberStorage(generateRandomNumber());

  handleFormSubmission();
};

init();
