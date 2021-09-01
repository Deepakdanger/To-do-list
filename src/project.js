const projectsContainer = document.querySelector('[data-projects]');

const taskContainer = document.querySelector('[data-to-do]');
const descriptionContainer = document.querySelector('[data-description]');

const addTask = document.getElementById('add_task');

const deleteTask = document.getElementById('button_delete');
const updateTask = document.getElementById('button_update');

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

export {
  rendertask, renderProjects, projects, display, save,
  LOCAL_STORAGE_SELECTED_PROJECT,
  LOCAL_STORAGE_SELECTED_TASK,
  description,
};