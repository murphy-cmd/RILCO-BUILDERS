import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const projectTable =
document.getElementById("projectTable");

window.addProject = async function(){

const projectName =
document.getElementById("projectName").value;

const projectDescription =
document.getElementById("projectDescription").value;

if(!projectName || !projectDescription){
alert("Please complete all fields");
return;
}

await addDoc(
collection(db,"projects"),
{
projectName,
projectDescription,
createdAt:new Date()
}
);

document.getElementById("projectName").value="";
document.getElementById("projectDescription").value="";

loadProjects();

};

async function loadProjects(){

projectTable.innerHTML="";

const querySnapshot =
await getDocs(collection(db,"projects"));

let count = 0;

querySnapshot.forEach((project)=>{

count++;

const data = project.data();

projectTable.innerHTML += `
<tr>
<td>${data.projectName}</td>
<td>${data.projectDescription}</td>
<td>

<button onclick="editProject(
'${project.id}',
'${data.projectName}',
'${data.projectDescription}'
)">
Edit
</button>

<button
class="delete-btn"
onclick="deleteProject('${project.id}')">
Delete
</button>

</td>
</tr>
`;

});

const projectCount =
document.getElementById("projectCount");

if(projectCount){
projectCount.innerText = count;
}

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

window.editProject =
async function(id,name,description){

const newName =
prompt("Edit Project Name",name);

const newDescription =
prompt("Edit Description",description);

if(newName && newDescription){

await updateDoc(
doc(db,"projects",id),
{
projectName:newName,
projectDescription:newDescription
}
);

loadProjects();

}

};

loadProjects();
