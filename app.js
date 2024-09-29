/*
DEV:
CURRENT: 
- UI
- edit increment amount
- check for new counter key and name uniqueness
- catagories
- move counter
- convert event listeners to onClicks
*/

/* ===== HTML ===== */
const appDOM = document.querySelector('#app')
const app = () => {
  let appHTML = /*html*/`
    <span id="title">Counters</span>
    <button id="new-counter-button">New Counter</button>
    <button id="reset-data-button" onClick="resetData()">Reset</button>
    <form id="new-counter-form" class="hidden">
      <input type="text" name="new-counter-name-input" id="new-counter-name-input" placeholder="Name" required>
      <button type="submit" id="new-counter-submit-button">OK</button>
    </form>
    <ul id="counter-display"></ul>
    <div id="edit-display" class="hidden"></div>
  `
  return appHTML
}
appDOM.innerHTML = app()

/* ===== QUERY SELECTORS ===== */

// Buttons
const newCounterButton = document.querySelector('#new-counter-button')

// Displays
const counterDisplay = document.querySelector('#counter-display')
const editDisplay = document.querySelector('#edit-display')

// Forms
const newCounterForm = document.querySelector('#new-counter-form')

// Inputs
const newCounterNameInput = document.querySelector('#new-counter-name-input')

/* ===== DATA ===== */

let data = {}

/* ===== FUNCTIONS ===== */

// LocalStorage Functions
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

// Counter Functions

function newCounter(counterName) {
  data[counterName] = { counterName: counterName, counterValue: 0 }
}

function deleteCounter(counterKey) {
  delete data[counterKey]
  saveLocalStorage()
  derenderEditDisplay()
  render()
}

function decrementCounter(counterKey) {
  data[counterKey].counterValue --
  saveLocalStorage()
  render()
}

function incrementCounter(counterKey) {
  data[counterKey].counterValue ++
  saveLocalStorage()
  render()
}

function resetCounter(counterKey) {
  data[counterKey].counterValue = 0
  saveLocalStorage()
  render()
}

function editCounterName(counterKey) {
  let counter = data[counterKey]
  let newCounterName = document.getElementById('edit-counter-name-input').value
  data[newCounterName] = {
    counterName: newCounterName, counterValue: counter.counterValue
  }
  delete data[counterKey]
  saveLocalStorage()
  render()
}

function editCounterValue(counterKey) {
  data[counterKey].counterValue = document.getElementById('edit-counter-value-input').value
  saveLocalStorage()
  render()
}

// Data Functions
function resetData() {
  data = {}
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
  for (const counterKey of Object.keys(data)) {
    let counter = data[counterKey]
    counterDisplayHTML += /*html*/`
      <li class="counter">
        <span class="counter-name" onClick="renderEditDisplay('${counterKey}')">${counter.counterName}: </span>
        <button onClick="decrementCounter('${counterKey}')">-</button>
        <span class="counter-value">${counter.counterValue}</span>
        <button onClick="incrementCounter('${counterKey}')">+</button>
      </li>
    `
  }
  counterDisplay.innerHTML = counterDisplayHTML
}

function renderEditDisplay(counterKey) {
  let counter = data[counterKey]
  editDisplay.innerHTML = /*html*/`
    <span>Edit</span>
    <button onClick="resetCounter('${counterKey}')">Reset</button>
    <button onClick="deleteCounter('${counterKey}')">Delete</button>
    <button onClick="derenderEditDisplay()">Close</button>
    <input type="text" name="edit-counter-name-input" id="edit-counter-name-input" placeholder="Name" value="${counter.counterName}">
    <button onClick="editCounterName('${counterKey}')">Update</button>
    <input type="number" name="edit-counter-value-input" id="edit-counter-value-input" placeholder="Value" value="${counter.counterValue}">
    <button onClick="editCounterValue('${counterKey}')">Update</button>
  `
  editDisplay.classList.remove('hidden')
}

function derenderEditDisplay() {
  editDisplay.classList.add('hidden')
}

/* ===== EVENT LISTENERS ===== */
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
