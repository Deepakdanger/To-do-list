(()=>{"use strict";let e=[];var t=1,i=1;const n=document.querySelector("[data-projects]"),d=document.querySelector("[data-to-do]"),o=document.querySelector("[data-description]"),l=document.getElementById("project_form_body"),s=document.querySelector("[data-new-project-input]"),a=(document.querySelector("[data-new-todo-form]"),document.getElementsByClassName("form-group"),document.querySelector("[data-new-todo-title-input]")),r=document.querySelector("[data-new-todo-desc-input]"),c=document.querySelector("[data-new-todo-prior-input]"),u=document.querySelector("[data-new-todo-date-input]"),y=document.querySelector("[data-new-todo-time-input]"),v=document.querySelector("[data-new-todo-note-input]"),m=document.getElementById("add_project"),b=document.getElementById("add_task"),p=document.getElementById("project_form"),f=document.getElementById("task_form"),E=document.getElementById("button_delete"),h=document.getElementById("button_update");const _=t=>{d.innerHTML="",o.innerHTML="",E.style.visibility="hidden",h.style.visibility="hidden";const n=e.find((e=>e.id===t));d.innerHTML="Project Name:-"+n.name,n.todos.forEach((e=>{const t=document.createElement("li");t.dataset.taskId=e.id,t.innerText=e.name,t.onclick=function(){i=function(e,t){const i=e.id;return((e,t)=>{o.innerHTML="";const i=t.todos.find((t=>t.id===e));o.innerHTML=`Name:- ${i.name} <br> Description:-${i.desc}\n        <br> Priority:- ${i.prior} <br> Date:- ${i.date} <br> note:- ${i.note} <br>\n         `,E.style.visibility="visible",h.style.visibility="visible",console.log(t.todos)})(i,t),i}(e,n)},d.appendChild(t)}))};m.addEventListener("click",(()=>{l.style.visibility="visible"})),b.addEventListener("click",(()=>{task_form_body.style.visibility="visible"})),p.addEventListener("submit",(i=>{i.preventDefault(),l.style.visibility="hidden";const d=s.value;if(null==d||""===d)return;const a=(r=d,{id:Date.now().toString(),name:r,todos:[]});var r;s.value=null,e.push(a),n.innerHTML="",o.innerHTML="",E.style.visibility="hidden",h.style.visibility="hidden",e.forEach((e=>{const i=document.createElement("li");i.dataset.projectId=e.id,i.innerText=e.name,i.onclick=function(){t=function(e){add_task.style.visibility="visible";const t=e.id;return _(t),t}(e)},n.appendChild(i)}))})),f.addEventListener("submit",(i=>{i.preventDefault(),b.style.visibility="visible",m.style.visibility="visible";const n=a.value,d=r.value,o=c.value,l=u.value,s=y.value,p=v.value;if(null==n||""===n)return;const f=(E=n,h=d,g=o,L=l,k=s,S=p,{id:Date.now().toString(),name:E,desc:h,prior:g,date:L,time:k,note:S,complete:!1});var E,h,g,L,k,S;e.find((e=>e.id===t)).todos.push(f),console.log(e),a.value=null,r.value=null,u.value=null,y.value=null,v.value=null,task_form_body.style.visibility="hidden",_(t)})),E.addEventListener("click",(()=>{const n=e.find((e=>e.id===t)),d=n.todos.find((e=>e.id===i));var o=n.todos.indexOf(d);n.todos.splice(o,1),_(t)})),h.addEventListener("click",(()=>{const n=e.find((e=>e.id===t)),d=n.todos.find((e=>e.id===i));o.innerHTML="",E.style.visibility="hidden",h.style.visibility="hidden",task_form_body.style.visibility="visible",a.value=d.name,r.value=d.desc,c.value=d.prior,u.value=d.date,y.value=d.time,v.value=d.note,console.log(a);var l=n.todos.indexOf(d);n.todos.splice(l,1),b.style.visibility="hidden",m.style.visibility="hidden"}))})();