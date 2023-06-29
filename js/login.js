const doc = document;
const input = doc.querySelector('.login__input');
const button = doc.querySelector('.login__button');
const form = doc.querySelector('.login-form');

const validateInput = ({target}) => {
    if(target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled','');
}

const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('player', input.value);
    window.location = 'pages/game.html'
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);