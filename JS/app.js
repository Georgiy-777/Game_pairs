import Card from './card.js'

let cardNumArray = []
let cardsArray = []
let firstCard = null
let secondCard = null
const starrBtn = document.querySelectorAll('.start');
const screens = document.querySelectorAll('.screen')

let time = 60
const timeEl = document.querySelector('#time')
const game = document.querySelector('#game')

// document.addEventListener(() => {
function getVert() {
    const cardVert = document.getElementById('vert_size').value;
    console.log(cardVert);
    return cardVert
}

function getGoriz() {
    const cardGoriz = document.getElementById('goriz_size').value;
    console.log(cardGoriz);
    return cardGoriz
}


function newGame(cardX, cardY) {
    for (let i = 1; i <= cardX * cardY / 2; i++) {
        cardNumArray.push(i)
        cardNumArray.push(i)

    }
    cardNumArray = cardNumArray.sort(() => Math.random() - 0.5)

    const chunkArray = (arr, cnt) => arr.reduce((prev, cur, i, a) => !(i % cnt) ? prev.concat([a.slice(i, i + cnt)]) : prev, []);
    for (const cardNum of cardNumArray) {
        chunkArray(cardNumArray, cardY).push(new Card(cardNum, flip))
    }

    function flip(card) {
        if (firstCard !== null && secondCard !== null) {
            if (firstCard.number != secondCard.number) {
                firstCard.open = false
                secondCard.open = false
                firstCard = null
                secondCard = null

            }
        }

        if (firstCard == null) {
            firstCard = card
        } else {
            if (secondCard == null) {
                secondCard = card
            }
        }

        if (firstCard !== null && secondCard !== null) {
            if (firstCard.number == secondCard.number) {
                firstCard.success = true
                secondCard.success = true
                firstCard = null
                secondCard = null

            }
        }

    }

    document.getElementById("game").style.gridTemplateColumns = `repeat(${cardY}, 1fr)`;
    document.getElementById("game").style.gridTemplateRows = `repeat(${cardX}, 1fr)`;
}


starrBtn[1].style.display = 'none'

starrBtn[0].addEventListener('click', (event) => {
    //настройка привественного окна
    event.preventDefault();
    screens[0].classList.add('up')
    startGame(time)
    if ((getGoriz() % 2 == 0 || getVert() % 2 == 0) && ((getGoriz() >= 2 && getGoriz() <= 10) && (getVert() >= 2 && getVert() <= 10))) {
        newGame(getGoriz(), getVert())
    } else {
        newGame(4, 4)
    }
    if ((document.getElementsByClassName('success')).length == cardNumArray.length) {
        // starrBtn[1].style.display = 'block'
        // document.getElementById('game').innerHTML = ''
        // cardNumArray = []
        // cardsArray = []
        // firstCard = null
        // secondCard = null
        // finushGame()
    }
})
starrBtn[1].addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('game').innerHTML = ''
    cardNumArray = []
    cardsArray = []
    time = 10
    starrBtn[1].style.display = 'none'
    startGame(time)
    if ((getGoriz() % 2 == 0 || getVert() % 2 == 0) && ((getGoriz() >= 2 && getGoriz() <= 10) && (getVert() >= 2 && getVert() <= 10))) {
        newGame(getGoriz(), getVert())
    } else {
        newGame(4, 4)
    }
})

function startGame(time) {
    setInterval(decreaseTime, 1000)
        // createRandomCirc()
    setTime(time)
}

function decreaseTime() {
    if (time == 0) {
        finushGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finushGame() {
    // timeEl.parentNode.remove()
    screen.innerHTML = ``
    starrBtn[1].style.display = 'block'
    document.getElementById('game').innerHTML = '';
}