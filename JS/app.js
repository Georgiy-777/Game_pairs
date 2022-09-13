import Card from './card.js'
const MIN_SIZE = 2
const MAX_SIZE = 10

let cardNumArray = []
let cardsArray = []
let firstCard = null
let secondCard = null
const starrBtn = document.querySelectorAll('.start');
const screens = document.querySelectorAll('.screen')

let time = 12
const timeEl = document.getElementById('time')
const game = document.getElementById('game')


    const cardVert = ()=>{
        return document.getElementById('vert_size').value;

    }//получение значения количества карточек по вертикали
    const cardGoriz  = ()=>{
       return document.getElementById('goriz_size').value;//получение значения количества карточек по горизонтале
    }


const endTimerGame = false
function newGame(cardX, cardY) {
    for (let i = 1; i <= cardX * cardY / 2; i++) {
        cardNumArray.push(i)
        cardNumArray.push(i)

    }
    cardNumArray = cardNumArray.sort(() => Math.random() - 0.5)

    const chunkArray = (arr, cnt) => arr.reduce((prev, cur, i, a) => !(i % cnt) ? prev.concat([a.slice(i, i + cnt)]) : prev, []);
    //массив содержащий исходные значения но перемешаные
    for (const cardNum of cardNumArray) {
        chunkArray(cardNumArray, cardY).push(new Card(cardNum, flip))
    }//последовательное создание карточек

    function flip(card) {
        // функция для нахождения парных значений на поле
        if (firstCard !== null && secondCard !== null) {
            if (firstCard.number !== secondCard.number) {
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
            if (firstCard.number === secondCard.number) {
                firstCard.success = true
                secondCard.success = true
                firstCard = null
                secondCard = null

            }
        }
        if ((document.querySelectorAll('.card.success')).length === cardNumArray.length) {
            starrBtn[1].style.display = 'block'
            game.innerHTML = ''
            cardNumArray = []
            cardsArray = []
            firstCard = null
            secondCard = null
            // finushGame()
            startGame(NaN, true)
            timeEl.innerHTML = '00:00'
        }

    }

    game.style.gridTemplateColumns = `repeat(${cardY}, 1fr)`;
    game.style.gridTemplateRows = `repeat(${cardX}, 1fr)`;
}

const checkInputSize = (x_size, y_size ) => {
    // проверка на введенные значения в форму : на четность значений, на расположение между размером в 2*2 и 10*10

    if ((x_size % 2 === 0 && y_size % 2 === 0) && ((x_size >= MIN_SIZE && x_size <= MAX_SIZE) && (y_size >= MIN_SIZE && y_size <= MAX_SIZE))) {
        return newGame(x_size, y_size)
    } else {
        return  newGame(4, 4)
    }
}

starrBtn[1].style.display = 'none'

starrBtn[0].addEventListener('click', (event) => {
    //настройка привественного окна
    event.preventDefault();
    screens[0].classList.add('up')
    startGame(time, endTimerGame)
    checkInputSize(cardGoriz(), cardVert())


})
starrBtn[1].addEventListener('click', e => {
    e.preventDefault();
    game.innerHTML = ''
    cardNumArray = []
    cardsArray = []
    starrBtn[1].style.display = 'none'
    startGame(time, endTimerGame)
    checkInputSize(cardGoriz(), cardVert())
})

function startGame(time, end) {
    let timer = setInterval(()=>{
        // Условие если время закончилось то...
        if(end){
            clearInterval(timer);
        }else{
            if (time <= 0) {
                // Таймер удаляется
                clearInterval(timer);
                // Выводит сообщение что время закончилось
                alert("Время закончилось");
                finushGame()
            } else { // Иначе
                let current = --time
                if (current < 10) {
                    current = `0${current}`
                }
                setTime(current)
            }
        }

    }, 1000)
    // createRandomCirc()
    setTime(time)
    console.log('srt')

}



function setTime(value) {
    console.log("set")
    timeEl.innerHTML = `00:${value}`
}



function finushGame() {
    console.log("fin")

    // timeEl.style.display= 'none'
    screen.innerHTML = ``
    starrBtn[1].style.display = 'block'
    game.innerHTML = '';
}

