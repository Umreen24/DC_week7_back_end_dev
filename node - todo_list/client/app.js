
let taskList = document.getElementById("taskList")
let pendingTaskTextBox = document.getElementById("pendingTaskTextBox")
let addTaskButton = document.getElementById("addTaskButton")

function addTask() {

    let pending_task = pendingTaskTextBox.value
    pendingTaskTextBox.value = ''
    let task = {taskName: pending_task}

    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json())
    .then(json => populateTasks(json))
}

addTaskButton.addEventListener('click', () =>{
    addTask()
})

function populateTasks(){

    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(json => displayTasks(json))

}

function displayTasks(todo) {

    let taskItems = todo.map(task => {
        return `<div>Task: ${task.name}</div>`
    })

    taskList.innerHTML = taskItems.join('')


    console.log(todo)
}