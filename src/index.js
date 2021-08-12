
import { createProject, createTodo } from './create.js';


const newProjectForm = document.querySelector('.new_project');
const new_project = document.getElementById('#add_project');
const newProjectInput = document.querySelector('[data-new-project-input]');

let projects = 
    {
      id: Date.now().toString(),
      name: 'Default Project',
      todos: [],
    };

    new_project.addEventListener('submit', e => {
        e.preventDefault();
        const projectName = newProjectInput.value;
        if (projectName == null || projectName === '') return;
        const project = createProject(projectName);
        newProjectInput.value = null;
        projects.push(project);
        $('#projectModalCenter').modal('toggle');
        saveAndDisplay();
      });

