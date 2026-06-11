import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
}
from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const projectList =
document.getElementById("projectList");

window.addProject =
async function(){

const projectName =
document.getElementById("projectName").value;

const clientName =
document.getElementById("clientName").value;

const location =
document.getElementById("location").value;

const budget =
document.getElementById("budget").value;

const description =
document.getElementById("description").value;

const image =
document.getElementById("image").value;

const status =
document.getElementById("status").value;

const progress =
document.getElementById("progress").value;

await addDoc(
collection(db,"projects"),
{
projectName,
clientName,
location,
budget:Number(budget),
description,
image,
status,
progress:Number(progress),
createdAt:new Date()
}
);

alert("Project Added Successfully!");

loadProjects();

};

async function loadProjects(){

const snapshot =
await getDocs(
collection(db,"projects")
);

projectList.innerHTML="";

snapshot.forEach((project)=>{

const data =
project.data();

projectList.innerHTML += `

<div class="project-item">

<img
src="${data.image}"
style="
width:100%;
height:200px;
object-fit:cover;
border-radius:10px;
margin-bottom:10px;
">

<h3>${data.projectName}</h3>

<p><strong>Client:</strong>
${data.clientName}</p>

<p><strong>Location:</strong>
${data.location}</p>

<p><strong>Budget:</strong>
₱${data.budget}</p>

<p>${data.description}</p>

<p><strong>Status:</strong>
${data.status}</p>

<p><strong>Progress:</strong>
${data.progress}%</p>

<progress
value="${data.progress}"
max="100"
style="width:100%;">
</progress>

<button
class="delete-btn"
onclick="deleteProject('${project.id}')">
Delete
</button>

</div>

`;

});

}

window.deleteProject =
async function(id){

if(confirm("Delete this project?")){

await deleteDoc(
doc(db,"projects",id)
);

loadProjects();

}

};

loadProjects();
