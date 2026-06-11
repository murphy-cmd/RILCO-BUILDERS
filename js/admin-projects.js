import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc
}
from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const projectList =
document.getElementById("projectList");

let editId = null;

window.addProject = async function(){

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

const projectData = {
projectName,
clientName,
location,
budget:Number(budget),
description,
image,
status,
progress:Number(progress),
updatedAt:new Date()
};

if(editId){

await updateDoc(
doc(db,"projects",editId),
projectData
);

alert("Project Updated Successfully!");

editId = null;

document.getElementById("saveBtn").innerText =
"Add Project";

}else{

await addDoc(
collection(db,"projects"),
{
...projectData,
createdAt:new Date()
}
);

alert("Project Added Successfully!");

}

clearForm();
loadProjects();

};

async function loadProjects(){

const snapshot =
await getDocs(
collection(db,"projects")
);

projectList.innerHTML = "";

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

<p>
<strong>Client:</strong>
${data.clientName}
</p>

<p>
<strong>Location:</strong>
${data.location}
</p>

<p>
<strong>Budget:</strong>
₱${Number(data.budget).toLocaleString()}
</p>

<p>
${data.description}
</p>

<p>
<strong>Status:</strong>
${data.status}
</p>

<p>
<strong>Progress:</strong>
${data.progress}%
</p>

<progress
value="${data.progress}"
max="100"
style="width:100%;">
</progress>

<br><br>

<button
onclick='editProject("${project.id}", ${JSON.stringify(data)})'>
Edit
</button>

<button
class="delete-btn"
onclick="deleteProject('${project.id}')">
Delete
</button>

</div>

`;

});

}

window.editProject = function(id,data){

editId = id;

document.getElementById("projectName").value =
data.projectName || "";

document.getElementById("clientName").value =
data.clientName || "";

document.getElementById("location").value =
data.location || "";

document.getElementById("budget").value =
data.budget || "";

document.getElementById("description").value =
data.description || "";

document.getElementById("image").value =
data.image || "";

document.getElementById("status").value =
data.status || "Planning";

document.getElementById("progress").value =
data.progress || 0;

document.getElementById("saveBtn").innerText =
"Update Project";

window.scrollTo({
top:0,
behavior:"smooth"
});

};

window.deleteProject =
async function(id){

if(confirm("Delete this project?")){

await deleteDoc(
doc(db,"projects",id)
);

loadProjects();

}

};

function clearForm(){

document.getElementById("projectName").value = "";
document.getElementById("clientName").value = "";
document.getElementById("location").value = "";
document.getElementById("budget").value = "";
document.getElementById("description").value = "";
document.getElementById("image").value = "";
document.getElementById("status").value = "Planning";
document.getElementById("progress").value = "";

}

loadProjects();
