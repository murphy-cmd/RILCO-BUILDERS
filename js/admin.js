import { auth, db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.showSection = function(section){

document.getElementById("dashboard").style.display="none";
document.getElementById("users").style.display="none";

document.getElementById(section).style.display="block";

}

window.logout = async function(){

await signOut(auth);

window.location.href="login.html";

}

async function loadUsers(){

const snapshot =
await getDocs(collection(db,"users"));

document.getElementById("userCount").textContent =
snapshot.size;

let html="";

snapshot.forEach((doc)=>{

const user=doc.data();

html += `
<tr>
<td>${user.name || "No Name"}</td>
<td>${user.email}</td>
</tr>
`;

});

document.getElementById("userTable").innerHTML =
html;

}

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="login.html";

return;

}

loadUsers();

});
