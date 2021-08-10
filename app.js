// Define UI Vars
function getElemById (id) {
    return $id = document.getElementById(id)
}
function getElemSelector (selector) {
    return $selector = document.querySelector(selector)
}

const form = getElemById('task-form')
const taskList = getElemSelector('.collection')
const clearBtn = getElemSelector('.clear-tasks')
const filter = getElemById('filter')
const taskInput = getElemById('task')

// load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // add task event
    form.addEventListener('submit', addTask)
    // remove task
    taskList.addEventListener('click', removeTask)
    // clear task event btn
    clearBtn.addEventListener('click', clearTasks)
    // filter tasks events
    filter.addEventListener('keyup', filterTasks)
}
// get tasks from LS
function getTasks() {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task) => {
         // create li element
     const li = document.createElement('li')
     // add class
     li.className = 'collection-item'
    //  create text node and append to li
    li.appendChild(document.createTextNode(task))
    // create new link element
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // append the link to li
    li.appendChild(link)
    // append li to ul
    taskList.appendChild(li)
    })
}

function addTask (event)  {
        if (taskInput.value === '') {
            alert('Add a task')
        }
     // create li element
     const li = document.createElement('li')
     // add class
     li.className = 'collection-item'
    //  create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    // create new link element
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // append the link to li
    li.appendChild(link)
    // append li to ul
    taskList.appendChild(li)
    // store in local storage
    storeTaskinLocalStorage(taskInput.value)
    // clear input
    taskInput.value = ''

    event.preventDefault() 
  }
//   store task in LS
function storeTaskinLocalStorage (task) {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove task
function removeTask (event) {
    if (event.target.parentElement
            .classList.contains('delete-item')) {
                if(confirm('Are you Sure?')) {
                    event.target.parentElement.parentElement.remove()

                    // remove.from LS
                    removeTaskFromLocalStorage(event.target.parentElement.parentElement)
                }
    }
}
// remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// clear task btn
function clearTasks (event) {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    clearTasksFromLocalStorage()
}

function clearTasksFromLocalStorage() {
    localStorage.clear()
}

// filter tasks
function filterTasks (event) {
    const text = event.target.value.toLowerCase()
    const collectionItem = document.querySelectorAll('.collection-item')
    
    collectionItem.forEach(task => {
        const item = task.firstChild.textContent
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
        
    });
}

loadEventListeners()
