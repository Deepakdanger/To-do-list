(()=>{"use strict";let e=[];var t=1;const n=document.querySelector("[data-projects]"),o=document.querySelector("[data-to-do]"),d=document.querySelector("[data-description]"),i=document.getElementById("project_form_body"),r=document.querySelector("[data-new-project-input]"),a=(document.querySelector("[data-new-todo-form]"),document.getElementsByClassName("form-group"),document.querySelector("[data-new-todo-title-input]")),l=document.querySelector("[data-new-todo-desc-input]"),c=document.querySelector("[data-new-todo-prior-input]"),u=document.querySelector("[data-new-todo-date-input]"),s=document.querySelector("[data-new-todo-time-input]"),m=document.querySelector("[data-new-todo-note-input]"),y=document.getElementById("add_project"),v=document.getElementById("add_task"),p=document.getElementById("project_form"),f=document.getElementById("task_form"),b=t=>{o.innerHTML="",d.innerHTML="";const n=e.find((e=>e.id===t));console.log(n),n.todos.forEach((e=>{const t=document.createElement("li");t.dataset.taskId=e.id,t.innerText=e.name,t.onclick=function(){!function(e,t){const n=e.id;((e,t)=>{d.innerHTML="";const n=t.todos.find((t=>t.id===e));d.innerHTML=` 'Name:' ${n.name} <br> 'Description:'${n.desc}\n        <br> 'Priority:' ${n.prior} <br> 'Date:' ${n.date} <br>'note:' ${n.note}\n        `})(n,t)}(e,n)},o.appendChild(t)}))};y.addEventListener("click",(()=>{i.style.visibility="visible"})),v.addEventListener("click",(()=>{task_form_body.style.visibility="visible"})),p.addEventListener("submit",(o=>{o.preventDefault(),i.style.visibility="hidden";const d=r.value;if(null==d||""===d)return;const a=(l=d,{id:Date.now().toString(),name:l,todos:[]});var l;r.value=null,e.push(a),n.innerHTML="",e.forEach((e=>{const o=document.createElement("li");o.dataset.projectId=e.id,o.innerText=e.name,o.onclick=function(){t=function(e){add_task.style.visibility="visible";const t=e.id;return b(t),t}(e)},n.appendChild(o)}))})),f.addEventListener("submit",(n=>{n.preventDefault();const o=a.value,d=l.value,i=c.value,r=u.value,y=s.value,v=m.value;if(null==o||""===o)return;const p=(f=o,E=d,S=i,g=r,q=y,_=v,{id:Date.now().toString(),name:f,desc:E,prior:S,date:g,time:q,note:_,complete:!1});var f,E,S,g,q,_;e.find((e=>e.id===t)).todos.push(p),console.log(e),a.value=null,l.value=null,u.value=null,m.value=null,task_form_body.style.visibility="hidden",b(t)}))})();