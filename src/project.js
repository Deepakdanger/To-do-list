const projectsContainer = document.querySelector('[data-projects]');

const taskContainer = document.querySelector('[data-to-do]');
const descriptionContainer = document.querySelector('[data-description]');

const taskFormBody = document.getElementById('task_form_body');

const newTodoInputTitle = document.querySelector('[data-new-todo-title-input]');
const newTodoInputDesc = document.querySelector('[data-new-todo-desc-input]');
const newTodoInputPrior = document.querySelector('[data-new-todo-prior-input]');
const newTodoInputDate = document.querySelector('[data-new-todo-date-input]');
const newTodoInputTime = document.querySelector('[data-new-todo-time-input]');
const newTodoInputNote = document.querySelector('[data-new-todo-note-input]');

const addProject = document.getElementById('add_project');
const addTask = document.getElementById('add_task');

const deleteTask = document.getElementById('button_delete');
const updateTask = document.getElementById('button_update');

deleteTask.classList.add('invis');
updateTask.classList.add('invis');

const LOCAL_STORAGE_ALL_PROJECTS = 'projects';
const LOCAL_STORAGE_SELECTED_PROJECT = 'selectedProjectId1';
const LOCAL_STORAGE_SELECTED_TASK = 'selectedTaskId1';

const projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ALL_PROJECTS)) || [
  {
    id: Date.now().toString(),
    name: 'Default Project',
    todos: [],
  },
];

const renderdescription = (selectedProject) => {
  descriptionContainer.innerHTML = '';
  const selectedTaskId1 = localStorage.getItem(LOCAL_STORAGE_SELECTED_TASK);
  const selectedTask = selectedProject.todos.find((task) => task.id === selectedTaskId1);
  descriptionContainer.innerHTML = `Name:- ${selectedTask.name} <br> Description:-${selectedTask.desc}
          <br> Priority:- ${selectedTask.prior} <br> Date:- ${selectedTask.date} <br> note:- ${selectedTask.note} <br>
           `;
  deleteTask.classList.remove('invis');
  deleteTask.classList.add('vis');
  updateTask.classList.remove('invis');
  updateTask.classList.add('vis');
};

const description = (task, selectedProject) => {
  const selectedTaskId1 = task.id;
  localStorage.setItem(LOCAL_STORAGE_SELECTED_TASK, selectedTaskId1);
  renderdescription(selectedProject);
  return selectedTaskId1;
};

const rendertask = () => {
  taskContainer.innerHTML = '';
  descriptionContainer.innerHTML = '';
  deleteTask.classList.remove('vis');
  deleteTask.classList.add('invis');
  updateTask.classList.remove('vis');
  updateTask.classList.add('invis');
  const selectedProjectId1 = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT);
  const selectedProject = projects.find((project) => project.id === selectedProjectId1);
  taskContainer.innerHTML = `Project Name:-${selectedProject.name}`;
  selectedProject.todos.forEach((task) => {
    const taskElement = document.createElement('li');
    taskElement.dataset.taskId = task.id;
    taskElement.innerText = task.name;
    taskElement.onclick = () => { description(task, selectedProject); };
    taskContainer.appendChild(taskElement);
  });
};

const task = (project) => {
  addTask.classList.remove('invis');
  addTask.classList.add('vis');
  const selectedProjectId1 = project.id;
  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT, selectedProjectId1);
  rendertask();
};

const renderProjects = () => {
  projectsContainer.innerHTML = '';
  descriptionContainer.innerHTML = '';
  deleteTask.classList.remove('vis');
  deleteTask.classList.add('invis');
  updateTask.classList.remove('vis');
  updateTask.classList.add('invis');
  projects.forEach((project) => {
    const projectElement = document.createElement('li');
    projectElement.dataset.projectId = project.id;
    projectElement.innerText = project.name;
    projectElement.onclick = () => { task(project); };
    projectsContainer.appendChild(projectElement);
  });
};

const save = () => {
  localStorage.setItem(LOCAL_STORAGE_ALL_PROJECTS, JSON.stringify(projects));
};

const display = () => {
  save();
  renderProjects();
};

deleteTask.addEventListener('click', () => {
  const selectedProjectId1 = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT);
  const selectedProject = projects.find((project) => project.id === selectedProjectId1);
  const selectedTaskId1 = localStorage.getItem(LOCAL_STORAGE_SELECTED_TASK);
  const selectedTask = selectedProject.todos.find((task) => task.id === selectedTaskId1);
  const Index = selectedProject.todos.indexOf(selectedTask);
  selectedProject.todos.splice(Index, 1);
  save();
  rendertask();
});

updateTask.addEventListener('click', () => {
  const selectedProjectId1 = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT);
  const selectedProject = projects.find((project) => project.id === selectedProjectId1);
  const selectedTaskId1 = localStorage.getItem(LOCAL_STORAGE_SELECTED_TASK);
  const selectedTask = selectedProject.todos.find((task) => task.id === selectedTaskId1);
  descriptionContainer.innerHTML = '';
  deleteTask.classList.remove('vis');
  deleteTask.classList.add('invis');
  updateTask.classList.remove('vis');
  updateTask.classList.add('invis');

  taskFormBody.classList.remove('invis');
  taskFormBody.classList.add('vis');
  newTodoInputTitle.value = selectedTask.name;
  newTodoInputDesc.value = selectedTask.desc;
  newTodoInputPrior.value = selectedTask.prior;
  newTodoInputDate.value = selectedTask.date;
  newTodoInputTime.value = selectedTask.time;
  newTodoInputNote.value = selectedTask.note;
  const Index = selectedProject.todos.indexOf(selectedTask);
  selectedProject.todos.splice(Index, 1);
  addTask.classList.remove('vis');
  addTask.classList.add('invis');
  addProject.classList.remove('vis');
  addProject.classList.add('invis');
  save();
});

export {
  rendertask, renderProjects, projects, display, save, LOCAL_STORAGE_SELECTED_PROJECT,
};