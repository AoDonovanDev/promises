const a = Math.floor(Math.random()*100)
const b = Math.floor(Math.random()*100)
const c = Math.floor(Math.random()*100)
const d = Math.floor(Math.random()*100)
const list = [a,b,c,d]
const data = get(a,b,c, d)
shuffle()

let deckId = null
let count = 0

const cardpile = document.querySelector('#cards')
document.querySelector('#draw').addEventListener('click', function(){
    draw(deckId)
})

async function get(a,b,c,d){
    const response = await fetch(`http://numbersapi.com/${a},${b},${c},${d}?json`)
    const data = await response.json()
    console.log(data)
    return data
}

async function getOne(a){
    const response = await fetch(`http://numbersapi.com/${a}?json`)
    const data = await response.json()
    console.log(data)
    return data
}

data.then(res => {
    for(let num of list){
        const li = document.createElement('li')
        li.textContent = res[num]
        document.getElementById('results').append(li)
    }
})


for(let i=0; i<4; i++){
    const fave = getOne(13)
    fave.then(res => {
        const li = document.createElement('li')
        li.textContent = res.text
        document.getElementById('fave').append(li)
    })
}



async function shuffle(){
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const deck = await response.json()
    console.log(deck)
    deckId = deck.deck_id
    return deck
}


async function draw(deckId){
    if(count===52){
        alert('YOU HAVE RUN OUT OF CARDS')
        return
    }
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const cardData = await response.json()

    const card = new Image()
    card.src = cardData.cards[0].images.png
    card.classList.add('cardy')
    card.style.transform = `rotate(${Math.floor(Math.random()*90)}deg)`
    count++
    cardpile.append(card)
}







