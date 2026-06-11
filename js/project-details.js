import { db } from "./firebase.js";

import {
doc,
getDoc
}
from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params =
new URLSearchParams(window.location.search);

const projectId =
params.get("id");

async function loadProject(){

const docRef =
doc(db,"projects",projectId);

const docSnap =
await getDoc(docRef);

if(docSnap.exists()){

const data =
docSnap.data();

document.getElementById("projectImage").src =
data.image;

document.getElementById("projectTitle").innerText =
data.projectName;

document.getElementById("projectClient").innerText =
data.clientName;

document.getElementById("projectLocation").innerText =
data.location;

document.getElementById("projectBudget").innerText =
Number(data.budget).toLocaleString();

document.getElementById("projectStatus").innerText =
data.status;

document.getElementById("projectDescription").innerText =
data.description;

document.getElementById("progressBar").style.width =
data.progress + "%";

document.getElementById("progressText").innerText =
data.progress + "% Complete";

}

}

loadProject();
