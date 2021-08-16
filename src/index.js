
import { createProject, createTodo } from './create.js';

let projects = [];
var selectedProjectId1=1;
var selectedTaskId1=1;

const projectsContainer = document.querySelector('[data-projects]');
const taskContainer = document.querySelector('[data-to-do]');
const descriptionContainer = document.querySelector('[data-description]');


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

const deleteTask = document.getElementById('button_delete');
const updateTask = document.getElementById('button_update');


     const renderdescription = (selectedTaskId1,selectedProject) => {
        descriptionContainer.innerHTML='';
        const selectedTask = selectedProject.todos.find(task => task.id === selectedTaskId1);
        descriptionContainer.innerHTML = `Name:- ${selectedTask.name} <br> Description:-${selectedTask.desc}
        <br> Priority:- ${selectedTask.prior} <br> Date:- ${selectedTask.date} <br> note:- ${selectedTask.note} <br>
         `;
         deleteTask.style.visibility = 'visible';  
         updateTask.style.visibility = 'visible';  
         console.log(selectedProject.todos);

    }; 

   

    function description(task,selectedProject) {
        const selectedTaskId1 = task.id;
        renderdescription(selectedTaskId1,selectedProject);
        return selectedTaskId1;
    }

    const rendertask = (selectedProjectId1) => {
        taskContainer.innerHTML='';
        descriptionContainer.innerHTML=''; 
        deleteTask.style.visibility = 'hidden';
        updateTask.style.visibility = 'hidden';
        const selectedProject = projects.find(project => project.id === selectedProjectId1);
        taskContainer.innerHTML='Project Name:-'+selectedProject.name;
        selectedProject.todos.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.dataset.taskId = task.id;
            taskElement.innerText = task.name;
            taskElement.onclick = function(){selectedTaskId1 = description(task,selectedProject)};
            taskContainer.appendChild(taskElement);
        });
      };
      
      

    function task(project){
        add_task.style.visibility = 'visible';        
        const selectedProjectId1 = project.id;
        rendertask(selectedProjectId1);
        return selectedProjectId1;
    }

    const renderProjects = () => {
        projectsContainer.innerHTML='';
        descriptionContainer.innerHTML='';
        deleteTask.style.visibility = 'hidden';  
        updateTask.style.visibility = 'hidden';
        projects.forEach(project => {
          const projectElement = document.createElement('li');
          projectElement.dataset.projectId = project.id;
          projectElement.innerText = project.name;
          projectElement.onclick = function(){selectedProjectId1 = task(project)};
          projectsContainer.appendChild(projectElement);
        });
      };

     

    const display = () => {
        renderProjects();        
    };

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
    const selectedProject = projects.find(project => project.id === selectedProjectId1);   
    selectedProject.todos.push(todo);
    console.log(projects);
    newTodoInputTitle.value= null;
    newTodoInputDesc.value= null;
    newTodoInputDate.value= null;
    newTodoInputTime.value= null;
    newTodoInputNote.value= null;
    task_form_body.style.visibility = 'hidden';    
    rendertask(selectedProjectId1);
  });

  deleteTask.addEventListener('click', () => {
    const selectedProject = projects.find(project => project.id === selectedProjectId1);
    const selectedTask = selectedProject.todos.find(task => task.id === selectedTaskId1);
    var Index = selectedProject.todos.indexOf(selectedTask);        
    selectedProject.todos.splice(Index, 1);
    rendertask(selectedProjectId1);
});

  updateTask.addEventListener('click', () => {
    const selectedProject = projects.find(project => project.id === selectedProjectId1);
    const selectedTask = selectedProject.todos.find(task => task.id === selectedTaskId1);
    descriptionContainer.innerHTML='';
    deleteTask.style.visibility = 'hidden';  
    updateTask.style.visibility = 'hidden';

    task_form_body.style.visibility = 'visible';
     newTodoInputTitle.value = selectedTask.name;
     newTodoInputDesc.value = selectedTask.desc;
     newTodoInputPrior.value = selectedTask.prior;
     newTodoInputDate.value = selectedTask.date;
     newTodoInputTime.value = selectedTask.time;
     newTodoInputNote.value = selectedTask.note;
    console.log(newTodoInputTitle);

    var Index = selectedProject.todos.indexOf(selectedTask);
    selectedProject.todos.splice(Index, 1);
    addTask.style.visibility = 'hidden'; 
    addProject.style.visibility = 'hidden'; 
});