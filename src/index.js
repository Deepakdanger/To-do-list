import { createProject, createTodo } from './create';
import {
  rendertask, renderProjects, projects, display, save, LOCAL_STORAGE_SELECTED_PROJECT,
} from './project';

const projectFormBody = document.getElementById('project_form_body');
const taskFormBody = document.getElementById('task_form_body');

const newProjectInput = document.querySelector('[data-new-project-input]');

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
  const selectedProjectId1 = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT);
  const selectedProject = projects.find((project) => project.id === selectedProjectId1);
  selectedProject.todos.push(todo);
  newTodoInputTitle.value = null;
  newTodoInputDesc.value = null;
  newTodoInputDate.value = null;
  newTodoInputTime.value = null;
  newTodoInputNote.value = null;
  taskFormBody.style.visibility = 'hidden';
  save();
  rendertask(localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT));
});

renderProjects();
