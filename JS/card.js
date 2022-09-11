// const card =
export default class Card {
    _card
    _open = false
    _success = false
    constructor(number, cardAction) {
        this.card = document.createElement('div')
        this.number = number
        this.card.classList.add('card')
        this.card.textContent = number
        this.card.addEventListener('click', () => {
            if (this.open == false && this.success == false) {
                this.open = true;
                cardAction(this)

            }

        })
        document.getElementById('game').append(this.card)

    }
    set open(val) {
        this._open = val
        val ? this.card.classList.add('open') : this.card.classList.remove('open')
    }
    get open() {
        return this._open
    }
    set success(val) {
        this._success = val
        val ? this.card.classList.add('success') : this.card.classList.remove('success')
    }
    get success() {
        return this._success
    }
}

// function findCard(card) {
//     card.classList.add('success')
// }