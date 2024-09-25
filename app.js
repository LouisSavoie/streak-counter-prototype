/*
DEV:
- check for new counter name uniqueness
*/

// HTML
const appDOM = document.querySelector('#app')
const app = () => {
  let appHTML = /*html*/`
    <p id="title">Streak Counter</p>
    <button id="new-counter-button">New Counter</button>
    <form id="new-counter-form" class="hidden">
      <input type="text" name="new-counter-name-input" id="new-counter-name-input" placeholder="Name" required>
      <button type="submit" id="new-counter-submit-button">OK</button>
    </form>
    <ul id="counter-display"></ul>
  `
  return appHTML
}
appDOM.innerHTML = app()

// APP

// QUERY SELECTORS

// Buttons
const newCounterButton = document.querySelector('#new-counter-button')

// Displays
const counterDisplay = document.querySelector('#counter-display')

// Forms
const newCounterForm = document.querySelector('#new-counter-form')

// Inputs
const newCounterNameInput = document.querySelector('#new-counter-name-input')

// DATA

let data = {}

// FUNCTIONS

// Data Functions
function getLocalStorage() {
  let ls = JSON.parse(localStorage.getItem('streakCounterPrototype'))
  console.log('StreakCounterPrototype local storage found: ', ls)
  if (ls === null) {
    console.log('Local storage not found')
    ls = {}
    localStorage.streakCounterPrototype = JSON.stringify(ls)
    console.log('New local storage created')
  } else {
    console.log('Local storage found')
    data = ls
    console.log('Local storage loaded')
  }
}

function saveLocalStorage() {
  localStorage.streakCounterPrototype = JSON.stringify(data)
  console.log('Rewards Points data saved to local storage')
}

function newCounter(counterName) {
  data[counterName] = { counterName: counterName, counterValue: 0 }
}

function deleteCounter(counterName) {
  delete data[counterName]
  saveLocalStorage()
  render()
}

function decrementCounter(counterName) {
  data[counterName].counterValue --
  saveLocalStorage()
  render()
}

function incrementCounter(counterName) {
  data[counterName].counterValue ++
  saveLocalStorage()
  render()
}

// App Functions
function load() {
  getLocalStorage()
  render()
}

// Render Functions
function render() {
  let counterDisplayHTML = ''
  for (const li of Object.values(data)) {
    counterDisplayHTML += /*html*/`
      <li class="counter">
        <span class="counter-name">${li.counterName}: </span>
        <span class="counter-value">${li.counterValue}</span>
        <button onClick="decrementCounter('${li.counterName}')">-</button>
        <button onClick="incrementCounter('${li.counterName}')">+</button>
        <button onClick="deleteCounter('${li.counterName}')">X</button>
      </li>
    `
  }
  counterDisplay.innerHTML = counterDisplayHTML
}

// EVENT LISTENERS
newCounterButton.addEventListener('click', () => {
  newCounterForm.classList.remove('hidden')
})

newCounterForm.addEventListener('submit', (event) => {
  newCounter(newCounterNameInput.value)
  saveLocalStorage()
  renderList()
  newCounterForm.classList.add('hidden')
  event.preventDefault()
})

load()
