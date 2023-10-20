
const removeAll = document.querySelector('.btn')
let myArray = []
const listOftasks = document.querySelector('#tasks')

window.addEventListener('load', function(e) {
   
    const form = document.querySelector('.form');
    const input = document.querySelector('#new-task')
    const listOftasks = document.querySelector('#tasks')
    
    form.addEventListener('submit', function(e){
        e.preventDefault()

        const task = input.value

        if(!task) {
            alert('please add the task');
            return
        } 

        const taskElement = document.createElement('div')
        taskElement.classList.add('task')

        const taskContent = document.createElement('div')
        taskContent.classList.add('task-content')
       

        taskElement.appendChild(taskContent)

        const taskInput = document.createElement('input')
        taskInput.classList.add('task-text')
        taskInput.type = 'text'
        taskInput.value = task
        taskInput.setAttribute('readonly', 'readonly')

        taskContent.appendChild(taskInput)

        /*  Local storage start */

         myArray.push(taskInput.value)
         let myArrayToLs = JSON.stringify(myArray)
        localStorage.setItem('todos', myArrayToLs)

        //local storage end
    
        const taskActions = document.createElement('div')
        taskActions.classList.add('actions')

        const editTask = document.createElement('button')
        editTask.classList.add('edit-task')
        editTask.textContent = "Edit"

        const removeTask = document.createElement('button')
        removeTask.classList.add('delete-task')
        removeTask.innerHTML = "Remove"

        taskActions.appendChild(editTask)
        taskActions.appendChild(removeTask)

        taskElement.appendChild(taskActions)

        listOftasks.appendChild(taskElement)

        input.value = ""

        editTask.addEventListener('click', function(e){
            if(editTask.innerText.toLowerCase() == "edit"){
                taskInput.removeAttribute('readonly')
                 taskInput.focus()
                editTask.textContent = "Save"
            } else {
                taskInput.setAttribute('readonly', 'readonly')
                editTask.textContent = "Edit"
            }
        })

        removeTask.addEventListener('click', function(e){
            // listOftasks.removeChild('taskElement')
            taskElement.style.display = 'none'
        })

    })

})


//local Storage

if( localStorage.getItem("todos") === null ){
    myArray = []
    } else {
       myArray = JSON.parse(localStorage.getItem('todos'))
      }

let myArrayFromLS = localStorage.getItem('todos')
let myArrayFromLSj = JSON.parse(myArrayFromLS)

console.log(myArrayFromLSj)


if( myArrayFromLSj !== null) {
 myArrayFromLSj.forEach(function(oneTodo){
        const div = document.createElement('div')
        const divContent = document.createElement('div')
        const input = document.createElement('input')
        input.classList.add('task-text')
        input.type = 'text'
        input.value = oneTodo
        input.setAttribute('readonly', 'readonly')

        console.log(divContent)

       div.classList.add('task')
       divContent.classList.add('task-content')
       
       divContent.appendChild(input)
       div.appendChild(divContent)
       listOftasks.appendChild(div)

       //actions

       const taskActions = document.createElement('div')
        taskActions.classList.add('actions')

        const editTask = document.createElement('button')
        editTask.classList.add('edit-task')
        editTask.textContent = "Edit"

        const removeTask = document.createElement('button')
        removeTask.classList.add('delete-task')
        removeTask.innerHTML = "Remove"

        taskActions.appendChild(editTask)
        taskActions.appendChild(removeTask)

        div.appendChild(taskActions)

        listOftasks.appendChild(div)

        editTask.addEventListener('click', function(e){
            if(editTask.innerText.toLowerCase() == "edit"){
                input.removeAttribute('readonly')
                input.focus()
                editTask.textContent = "Save"
            } else {
                input.setAttribute('readonly', 'readonly')
                editTask.textContent = "Edit"
            }
        })

        removeTask.addEventListener('click', function(e){
            div.style.display = "none"
            localStorage.removeItem('todos')
        })
    })
}


//LS end

// clear all function

removeAll.addEventListener('click', function(e){
    listOftasks.innerHTML = ""
    localStorage.clear()
})