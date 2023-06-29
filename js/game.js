const doc = document;
const grid = doc.querySelector('.grid');
const spanPlayer = doc.querySelector('.player');
const timer = doc.querySelector('.timer');

const characteres = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer'
]

/**
 * Cria um elemento html
 */
const createElement = (tag, className) => {
    const element = doc.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const resetCard = () => {
    firstCard = '';
    secondCard = '';
}

const checkEndGame = () => {
    const cards = doc.querySelectorAll('.card');
    const disabledCards = doc.querySelectorAll('.disabled-card');

    if(disabledCards.length === cards.length){
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}, seu tempo foi: ${timer.innerHTML}`);

    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter == secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        
        resetCard();

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            resetCard();
        },500);
    }
    
}

const revealCard = ({ target }) => {

    if(target.parentNode.className.includes('reveal-card')) {
        return ;
    }

    if(firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if(secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

    
}

/**
 * Cria o card em HTML
 */
const createCard = (character) => {  
    const card = createElement('div','card');
    const front = createElement('div','face front');
    const back = createElement('div','face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character',character);

    return card;
}

/**
 * Inicia o jogo
 */
const loadGame = () => {
    const duplicateCharacters = [ 
        ...characteres, 
        ...characteres 
    ];
    /**
    * Faz com que as cartas se tornem aleatorias
    */
    const ShuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    ShuffledArray.forEach((character) => {
        const card  = createCard(character);
        grid.appendChild(card);
    });
}

const startTime = () => {
    this.loop = setInterval(() => {
        const currentTime = timer.innerHTML;
        timer.innerHTML =  +currentTime + 1;
    },1000);
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');;
    startTime();
    loadGame();
}
