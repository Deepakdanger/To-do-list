
import { createProject, createTodo } from './create.js';

let projects = [];
var selectedProjectId1=1;
var selectedTaskId1=1;

const projectsContainer = document.querySelector('[data-projects]');
const taskContainer = document.querySelector('[data-to-do]');


const project_form_body = document.getElementById('project_form_body');
// const newProjectForm = document.querySelector('.new_project');
const newProjectInput = document.querySelector('[data-new-project-input]');
const newTaskInput1 = document.querySelector('[data-new-todo-form]');
const newTaskInput = document.getElementsByClassName("form-group");

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


    // {
    //   id: Date.now().toString(),
    //   name: 'Default Project',
    //   todos: [],
    // };

    const rendertask = (selectedProjectId1) => {
        taskContainer.innerHTML='1234';        
        const selectedProject = projects.find(project => project.id === selectedProjectId1);
        console.log(selectedProject);
        selectedProject.todos.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.dataset.taskId = task.id;
            taskElement.innerText = task.name;
            taskElement.onclick = function(){selectedTaskId1 = description(task)};
            taskContainer.appendChild(taskElement);
        });
      };         

    function description(task) {

    }
    
    function task(project){
        add_task.style.visibility = 'visible';        
        const selectedProjectId = project.id;
        rendertask(selectedProjectId);
        return selectedProjectId;        
    }

    const renderProjects = () => {
        projectsContainer.innerHTML='';
        projects.forEach(project => {
          const projectElement = document.createElement('li');
          projectElement.dataset.projectId = project.id;
          projectElement.innerText = project.name;
          projectElement.onclick = function(){selectedProjectId1 = task(project)};
          //if (project.id === selectedProjectId) {
          //  projectElement.classList.add('active-project');
          //}
          projectsContainer.appendChild(projectElement);
        });
      };

     

    const display = () => {
        renderProjects();        
    }



    // const saveAndDisplay = () => {
    //     //save();
    //     display();
    // };

    addProject.addEventListener('click', () => {
        project_form_body.style.visibility = 'visible';
    });

    addTask.addEventListener('click', () => {
        task_form_body.style.visibility = 'visible';
    });

projectForm.addEventListener('submit', e => {
    e.preventDefault();
    project_form_body.style.visibility = 'hidden';
    const projectName = newProjectInput.value;
    if (projectName == null || projectName === '') return;
    const project = createProject(projectName);
    newProjectInput.value = null;
    projects.push(project);
    
    display();
});

taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const todoName = newTodoInputTitle.value;
    const todoDesc = newTodoInputDesc.value;
    const todoPrior = newTodoInputPrior.value;
    const todoDate = newTodoInputDate.value;
    const todoTime = newTodoInputTime.value;
    const todoNote = newTodoInputNote.value;
  
    if (todoName == null || todoName === '') return;
    const todo = createTodo(todoName, todoDesc, todoPrior, todoDate, todoTime, todoNote);
    const selectedProject = projects.find(project => project.id === selectedProjectId1);   
    selectedProject.todos.push(todo);
    console.log(projects);
    newTodoInputTitle.value= null;
    newTodoInputDesc.value= null;
    newTodoInputDate.value= null;
    newTodoInputNote.value= null;
    task_form_body.style.visibility = 'hidden';  
    
    rendertask(selectedProjectId1);
  });

