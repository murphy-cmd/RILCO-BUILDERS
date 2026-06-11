import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const container = document.getElementById("projects");

async function loadProjects(){

    const snapshot = await getDocs(
        collection(db,"projects")
    );

    container.innerHTML = "";

    snapshot.forEach((project)=>{

        const data = project.data();

        container.innerHTML += `
        <div class="card">

            <img src="${data.image}" alt="${data.title}">

            <div class="card-content">

                <h2>${data.title}</h2>

                <p>${data.description}</p>

                <p><strong>Client:</strong> ${data.client}</p>

                <p><strong>Budget:</strong> ₱${Number(data.budget).toLocaleString()}</p>

                <p><strong>Status:</strong> ${data.status}</p>

                <p><strong>Progress:</strong> ${data.progress}%</p>

            </div>

        </div>
        `;
    });

}

loadProjects();
