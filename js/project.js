import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const projectGrid =
document.getElementById("projectGrid");

async function loadProjects(){

const querySnapshot =
await getDocs(collection(db,"projects"));

projectGrid.innerHTML = "";

querySnapshot.forEach((doc)=>{

const project = doc.data();

projectGrid.innerHTML += `

<div class="project-card">

<img src="${project.image}">

<div class="content">

<h2>${project.title}</h2>

<p>${project.description}</p>

<div class="status">
${project.status}
</div>

<div class="progress-bar">
<div
class="progress"
style="width:${project.progress}%">
</div>
</div>

<p>${project.progress}% Complete</p>

</div>

</div>

`;

});

}

loadProjects();
