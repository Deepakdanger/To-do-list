import { createProject, createTodo } from './create';

let selectedProjectId1 = 1;
let selectedTaskId1 = 1;

const projectsContainer = document.querySelector('[data-projects]');
const taskContainer = document.querySelector('[data-to-do]');
const descriptionContainer = document.querySelector('[data-description]');

const projectFormBody = document.getElementById('project_form_body');
const taskFormBody = document.getElementById('task_form_body');
// const newProjectForm = document.querySelector('.new_project');
const newProjectInput = document.querySelector('[data-new-project-input]');
// const newTaskInput1 = document.querySelector('[data-new-todo-form]');
// const newTaskInput = document.getElementsByClassName('form-group');

const newTodoInputTitle = document.querySelector('[data-new-todo-title-input]');
const newTodoInputDesc = document.querySelector('[data-new-todo-desc-input]');
const newTodoInputPrior = document.querySelector('[data-new-todo-prior-input]');
const newTodoInputDate = document.querySelector('[data-new-todo-date-input]');
const newTodoInputTime = document.querySelector('[data-new-todo-time-input]');
const newTodoInputNote = document.querySelector('[data-new-todo-note-input]');

const addProject = document.getElementById('add_project');
const addTask = document.getElementById('add_task');

const projectForm = document.getElementById('project_form');
const taskForm = document.getElementById('task_form');

const deleteTask = document.getElementById('button_delete');
const updateTask = document.getElementById('button_update');

const LOCAL_STORAGE_ALL_PROJECTS = 'projects';

const projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ALL_PROJECTS)) || [
  {
    id: Date.now().toString(),
    name: 'Default Project',
    todos: [],
  },
];

const renderdescription = (selectedTaskId1, selectedProject) => {
  descriptionContainer.innerHTML = '';
  const selectedTask = selectedProject.todos.find((task) => task.id === selectedTaskId1);
  descriptionContainer.innerHTML = `Name:- ${selectedTask.name} <br> Description:-${selectedTask.desc}
        <br> Priority:- ${selectedTask.prior} <br> Date:- ${selectedTask.date} <br> note:- ${selectedTask.note} <br>
         `;
  deleteTask.style.visibility = 'visible';
  updateTask.style.visibility = 'visible';
};

function description(task, selectedProject) {
  const selectedTaskId1 = task.id;
  renderdescription(selectedTaskId1, selectedProject);
  return selectedTaskId1;
}

const rendertask = (selectedProjectId1) => {
  taskContainer.innerHTML = '';
  descriptionContainer.innerHTML = '';
  deleteTask.style.visibility = 'hidden';
  updateTask.style.visibility = 'hidden';
  const selectedProject = projects.find((project) => project.id === selectedProjectId1);
  taskContainer.innerHTML = `Project Name:-${selectedProject.name}`;
  selectedProject.todos.forEach((task) => {
    const taskElement = document.createElement('li');
    taskElement.dataset.taskId = task.id;
    taskElement.innerText = task.name;
    taskElement.onclick = () => { selectedTaskId1 = description(task, selectedProject); };
    taskContainer.appendChild(taskElement);
  });
};

function task(project) {
  addTask.style.visibility = 'visible';
  const selectedProjectId1 = project.id;
  rendertask(selectedProjectId1);
  return selectedProjectId1;
}

const renderProjects = () => {
  projectsContainer.innerHTML = '';
  descriptionContainer.innerHTML = '';
  deleteTask.style.visibility = 'hidden';
  updateTask.style.visibility = 'hidden';
  projects.forEach((project) => {
    const projectElement = document.createElement('li');
    projectElement.dataset.projectId = project.id;
    projectElement.innerText = project.name;
    projectElement.onclick = () => { selectedProjectId1 = task(project); };
    projectsContainer.appendChild(projectElement);
  });
};

const display = () => {
  renderProjects();
};

addProject.addEventListener('click', () => {
  projectFormBody.style.visibility = 'visible';
});

addTask.addEventListener('click', () => {
  taskFormBody.style.visibility = 'visible';
});

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  projectFormBody.style.visibility = 'hidden';
  const projectName = newProjectInput.value;
  if (projectName == null || projectName === '') return;
  const project = createProject(projectName);
  newProjectInput.value = null;
  projects.push(project);
  display();
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask.style.visibility = 'visible';
  addProject.style.visibility = 'visible';
  const todoName = newTodoInputTitle.value;
  const todoDesc = newTodoInputDesc.value;
  const todoPrior = newTodoInputPrior.value;
  const todoDate = newTodoInputDate.value;
  const todoTime = newTodoInputTime.value;
  const todoNote = newTodoInputNote.value;

  if (todoName == null || todoName === '') return;
  const todo = createTodo(todoName, todoDesc, todoPrior, todoDate, todoTime, todoNote);
  const selectedProject = projects.find((project) => project.id === selectedProjectId1);
  selectedProject.todos.push(todo);
  newTodoInputTitle.value = null;
  newTodoInputDesc.value = null;
  newTodoInputDate.value = null;
  newTodoInputTime.value = null;
  newTodoInputNote.value = null;
  taskFormBody.style.visibility = 'hidden';
  rendertask(selectedProjectId1);
});

deleteTask.addEventListener('click', () => {
  const selectedProject = projects.find((project) => project.id === selectedProjectId1);
  const selectedTask = selectedProject.todos.find((task) => task.id === selectedTaskId1);
  const Index = selectedProject.todos.indexOf(selectedTask);
  selectedProject.todos.splice(Index, 1);
  rendertask(selectedProjectId1);
});

updateTask.addEventListener('click', () => {
  const selectedProject = projects.find((project) => project.id === selectedProjectId1);
  const selectedTask = selectedProject.todos.find((task) => task.id === selectedTaskId1);
  descriptionContainer.innerHTML = '';
  deleteTask.style.visibility = 'hidden';
  updateTask.style.visibility = 'hidden';

  taskFormBody.style.visibility = 'visible';
  newTodoInputTitle.value = selectedTask.name;
  newTodoInputDesc.value = selectedTask.desc;
  newTodoInputPrior.value = selectedTask.prior;
  newTodoInputDate.value = selectedTask.date;
  newTodoInputTime.value = selectedTask.time;
  newTodoInputNote.value = selectedTask.note;
  const Index = selectedProject.todos.indexOf(selectedTask);
  selectedProject.todos.splice(Index, 1);
  addTask.style.visibility = 'hidden';
  addProject.style.visibility = 'hidden';
});