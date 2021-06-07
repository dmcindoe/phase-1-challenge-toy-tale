const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false
const createToyForm = document.querySelector('.add-toy-form')


 document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyFormContainer = document.querySelector('.container')
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
 });
// Grabing data from back end to display what is already collected
 const initialize = () => {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(showToy))
}

// Creating Card and data outline for each Toy
const showToy = toy => {
  let thisToy = toy
  let toyDiv = document.createElement('div')
  toyDiv.classList.add('card')
  toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p>`
  let likeBtn = document.createElement('button')
  likeBtn.class = 'like-btn'
  likeBtn.innerText = 'Like <3'
  likeBtn.addEventListener('click', e => showLikes(e, thisToy))
  toyDiv.append(likeBtn)
  toyCollection.append(toyDiv)
}

const showLikes = (e, toy) => {
  let num = parseInt(e.target.parentElement.children[2].innerText)
  e.target.parentElement.children[2].innerText = num + 1
  likeToy(toy)
}

const likeToy = toy => {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ likes: toy.likes++ })
  }).then(resp => resp.json())
}


createToyForm.addEventListener('submit', e => {
  e.preventDefault()
  addNewToy(e)
  createToyForm.reset()
})

// form submitted for new toys in form
const addNewToy = e => {
  let newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  createToy(newToy)
}

// Posting of information of new to the server
const createToy = toy => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  })
    .then(resp => resp.json())
    .then(showToy(toy))
}

initialize()

