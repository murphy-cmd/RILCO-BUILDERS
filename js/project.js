import { db } from "./firebase.js";

import {
collection,
getDocs
}
from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const projectGrid =
document.getElementById("projectGrid");

async function loadProjects(){

const snapshot =
await getDocs(
collection(db,"projects")
);

projectGrid.innerHTML = "";

snapshot.forEach((project)=>{

const data =
project.data();

projectGrid.innerHTML += `

<div
class="project-card"
onclick="window.location.href='project-details.html?id=${project.id}'"
style="cursor:pointer;">

<img src="${data.image}" alt="${data.title}">

<div class="content">

<h2>${data.title}</h2>

<p>${data.description}</p>

<p><strong>Client:</strong> ${data.client}</p>

<p><strong>Budget:</strong>
₱${Number(data.budget).toLocaleString()}</p>

<p class="status">
Status: ${data.status}
</p>

<div class="progress-bar">
<div
class="progress"
style="width:${data.progress}%;">
</div>
</div>

<p>${data.progress}% Complete</p>

</div>

</div>

`;

});

}

loadProjects();
