

function get(a, b, c, d){
    const request = new XMLHttpRequest
    return new Promise((resolve, reject) => {
    request.onload = function(){
        if(request.readyState !== 4) return;
    
        if(request.status >= 200 && request.status < 300){
            console.log(request.response)
            
            resolve(request.response)
        } else{
            reject(request.status)
        }
    }
    
    request.onerror = function handleError(){
        reject("netwerk err!")
    };
    
    request.open('get', `http://numbersapi.com/${a},${b},${c},${d}?json`)
    
    request.send()
    
    
    })
}

const a = Math.floor(Math.random()*100)
const b = Math.floor(Math.random()*100)
const c = Math.floor(Math.random()*100)
const d = Math.floor(Math.random()*100)
const list = [a,b,c,d]
const data = get(a,b,c, d)
data.then(res => {
    const obj = JSON.parse(res)
    for(let num of list){
        const li = document.createElement('li')
        li.textContent = obj[num]
        document.getElementById('results').append(li)
    }
})


for(let i = 0; i<4; i++){
    const data = get(13,13,13,13)
    data.then(res => {
        const obj = JSON.parse(res)
        for(let num of Object.keys(obj)){
            const li = document.createElement('li')
            li.textContent = obj[num]
            document.getElementById('fave').append(li)
        }
    })
}



function draw(deckId){
    const request = new XMLHttpRequest
    return new Promise((resolve, reject) => {
    request.onload = function(){
        if(request.readyState !== 4) return;
    
        if(request.status >= 200 && request.status < 300){
            console.log(request.response)
            
            resolve(request.response)
        } else{
            reject(request.status)
        }
    }
    
    request.onerror = function handleError(){
        reject("netwerk err!")
    };
    
    request.open('get', `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    
    request.send()
    
    
    })
}

function shuffle(){
    const request = new XMLHttpRequest
    return new Promise((resolve, reject) => {
    request.onload = function(){
        if(request.readyState !== 4) return;
    
        if(request.status >= 200 && request.status < 300){
            
            resolve(request.response)
        } else{
            reject(request.status)
        }
    }
    
    request.onerror = function handleError(){
        reject("netwerk err!")
    };
    
    request.open('get', `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    
    request.send()
    
    
    })
}

deckId = null
const cardpile = document.querySelector('#cards')

const newShuffle = shuffle();
newShuffle.then(res => {
    const obj = JSON.parse(res)
    deckId = obj.deck_id
    console.log(obj.deck_id)
    const newDraw = draw(deckId)
    newDraw.then(res => {
        const obj = JSON.parse(res)
        console.log(`${obj.cards[0].value} of ${obj.cards[0].suit}` )
    })   
})

document.querySelector('#draw').addEventListener('click', drawCard)

function drawCard(){
    const newDraw = draw(deckId)
    newDraw.then(res => {
        const obj = JSON.parse(res)
        console.log(`${obj.cards[0].value} of ${obj.cards[0].suit}`)
        const card = new Image()
        card.src = obj.cards[0].images.png
        card.classList.add('cardy')
        card.style.transform = `rotate(${Math.floor(Math.random()*90)}deg)`
        cardpile.append(card)
    })   
}