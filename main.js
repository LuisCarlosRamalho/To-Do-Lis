const inputTask = document.querySelector('#inputTask')
const btnAddTask = document.querySelector('.btnSubmit')
const taskAdded = document.querySelector('.taskAdded')

const validateInput = ()=> inputTask.value.trim().length > 0//forma reduzida do if

function addTask(){
    const inputvalidated = validateInput()
    if(!inputvalidated){
        return inputTask.classList.add('errorTask')
    }

    //criando a div com o paragrafo da nova tarefa
    const newTaskContainer = document.createElement('div')
    newTaskContainer.classList.add('createdDiv')
    taskAdded.appendChild(newTaskContainer)

    const newParagraph = document.createElement('p')
    newParagraph.innerText = inputTask.value
    
    newTaskContainer.appendChild(newParagraph)
    newParagraph.addEventListener('click', () => completedTask(newParagraph))

    //criando o icon de exlusão
    let newElementThrash = document.createElement('i')
    newElementThrash.setAttribute('class', 'fa-solid fa-trash-can')
    newTaskContainer.appendChild(newElementThrash)

    inputTask.value =''

    newElementThrash.addEventListener('click', () => itemDeleteTask(taskAdded, newParagraph))
        
}

//Deletando as Tasks
const itemDeleteTask = (taskAdded, newParagraph) => {
    const tasks = taskAdded.childNodes
    for (const task of tasks){
        if(task.firstChild.isSameNode(newParagraph)){
            task.remove()
        }
    }
}


//Marcando as Tasks como completadas
const completedTask = (newParagraph) => {
    const tasks = taskAdded.childNodes
    for (const task of tasks){
        if(task.firstChild.isSameNode(newParagraph)){
            task.firstChild.classList.toggle('taskSelected')
        }
    }
}

//Verificando se o input está vazio
const inputChange = ()=>{
    const inputvalidated = validateInput()  
    if(inputvalidated){
        return inputTask.classList.remove('errorTask')
    }
}

btnAddTask.addEventListener('click',addTask)
inputTask.addEventListener('change', inputChange)