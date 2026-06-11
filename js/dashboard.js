import { db } from "./firebase.js";

import {
collection,
getDocs
}
from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadDashboard(){

const snapshot =
await getDocs(
collection(db,"projects")
);

let totalProjects = 0;
let ongoingProjects = 0;
let completedProjects = 0;
let totalBudget = 0;

snapshot.forEach((project)=>{

const data = project.data();

totalProjects++;

totalBudget += Number(data.budget || 0);

if(data.status === "Ongoing"){
ongoingProjects++;
}

if(data.status === "Completed"){
completedProjects++;
}

});

document.getElementById("totalProjects").innerText =
totalProjects;

document.getElementById("ongoingProjects").innerText =
ongoingProjects;

document.getElementById("completedProjects").innerText =
completedProjects;

document.getElementById("totalBudget").innerText =
"₱" + totalBudget.toLocaleString();

}

loadDashboard();
