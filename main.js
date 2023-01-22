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

    updateLocalSorage() 

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
    updateLocalSorage()
}


//Marcando as Tasks como completadas
const completedTask = (newParagraph) => {
    const tasks = taskAdded.childNodes
    for (const task of tasks){
        if(task.firstChild.isSameNode(newParagraph)){
            task.firstChild.classList.toggle('taskSelected')
        }
    }
    updateLocalSorage()
}

//Verificando se o input está vazio
const inputChange = ()=>{
    const inputvalidated = validateInput()  
    if(inputvalidated){
        return inputTask.classList.remove('errorTask')
    }
}

//Salvando as tasks no LocalStorage, atualizando e mostrando na tela
const updateLocalSorage = () => {
    const tasks = taskAdded.childNodes

    const localStorageTasks = [...tasks].map((task) =>{
        const content = task.firstChild
        const isCompleted = content.classList.contains('taskSelected')

        return {description: content.innerText, isCompleted}
    })

    console.log(localStorageTasks)

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}


//carregando do LocalStorage as tasks salvas
const taskinLocalStorage = () =>{
    const taskFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))
    
    if(!taskFromLocalStorage) return // corrigindo erro quando o app inicia sem task salva no LocalStorage
    
    for (const tasks of taskFromLocalStorage) {
        const newTaskContainer = document.createElement('div')
        newTaskContainer.classList.add('createdDiv')
        taskAdded.appendChild(newTaskContainer)

        const newParagraph = document.createElement('p')
        newParagraph.innerText = tasks.description

        if(tasks.isCompleted){
            newParagraph.classList.add('taskSelected')
        }
        
        newTaskContainer.appendChild(newParagraph)
        newParagraph.addEventListener('click', () => completedTask(newParagraph))

        //criando o icon de exlusão
        let newElementThrash = document.createElement('i')
        newElementThrash.setAttribute('class', 'fa-solid fa-trash-can')
        newTaskContainer.appendChild(newElementThrash)

        newElementThrash.addEventListener('click', () => itemDeleteTask(taskAdded, newParagraph))
    }
}


taskinLocalStorage()
btnAddTask.addEventListener('click',addTask)
inputTask.addEventListener('change', inputChange)