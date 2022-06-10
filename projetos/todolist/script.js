let ol = document.querySelector('#lista-tarefas')
let input = document.querySelector('#texto-tarefa')
const list = document.getElementById('lista-tarefas');
const btnSaveTasks = document.getElementById('salvar-tarefas');
const classTaskSelected = 'task-selected';


function selectOneTask(event) {
    const tasks = document.querySelectorAll('.task');
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].classList.remove('task-selected');
      tasks[i].classList.remove(classTaskSelected);
    }
    event.target.classList.add('task-selected');
    event.target.classList.toggle(classTaskSelected);
  }

function createTask() {
    let button = document.querySelector('#criar-tarefa')
    button.addEventListener('click', function clickAdd() {
        let list = document.createElement('li')
        list.innerHTML = input.value
        list.classList.add('taskList')
        ol.appendChild(list)
        input.value = ''

        list.addEventListener('click', onlyOne)
        list.addEventListener('dblclick', completed)

    })

}
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        let list = document.createElement('li')
        list.innerHTML = input.value
        list.classList.add('taskList')
        ol.appendChild(list)
        input.value = ''

        list.addEventListener('click', onlyOne)
        list.addEventListener('dblclick', completed)
    }
});
createTask()


function onlyOne(event) {
    let lists = document.getElementsByClassName('taskList')
    for (let index = 0; index < lists.length; index += 1) {
        lists[index].classList.remove('listGray')
    }
    event.target.classList.add('listGray')
}
function completed(event) {
    event.target.classList.toggle('completed');
}
const btnDeleteAllTasks = document.getElementById('apaga-tudo');
function deleteAllTasks() {
    const list = document.getElementById('lista-tarefas');
    list.innerHTML = '';
}
btnDeleteAllTasks.addEventListener('click', deleteAllTasks);

const btnDeleteCompleted = document.getElementById('remover-finalizados');
function deleteCompleted() {
    const task = document.getElementsByClassName('completed');
    for (let index = 0; index < task.length; index += 1) {
      task[index].remove();
    }
  }
btnDeleteCompleted.addEventListener('click', deleteCompleted);

function saveTasks() {
    const tasks = document.getElementsByClassName('taskList');
    if (tasks.length === 0) {
      localStorage.clear();
    }
    for (let i = 0; i < tasks.length; i += 1) {
      const taskInfo = {
        text: tasks[i].innerHTML,
        class: tasks[i].className,
      };
      localStorage.setItem(i, JSON.stringify(taskInfo));
    }
  }
  btnSaveTasks.addEventListener('click', saveTasks);
  
  function loadTasks() {
    for (let i = 0; i < localStorage.length; i += 1) {
      const taskInfo = JSON.parse(localStorage.getItem(i));
      const task = document.createElement('li');
      task.classList.add('taskList');
      task.innerHTML = taskInfo.text;
      task.className = taskInfo.class;
      task.classList.remove(classTaskSelected);
      task.addEventListener('click', onlyOne);
      task.addEventListener('dblclick', completed);
      list.appendChild(task);
    }
  }
  loadTasks();
  
