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

const title =
document.getElementById("title").value;

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
title,
description,
image,
status,
progress:Number(progress)
}
);

alert("Project Added");

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

<h3>${data.title}</h3>

<p>${data.description}</p>

<p>Status:
${data.status}</p>

<p>Progress:
${data.progress}%</p>

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

await deleteDoc(
doc(db,"projects",id)
);

loadProjects();

};

loadProjects();
