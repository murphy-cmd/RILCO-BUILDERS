import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const userTable =
document.getElementById("userTable");

async function loadUsers(){

const querySnapshot =
await getDocs(collection(db,"users"));

let count = 0;

querySnapshot.forEach((doc)=>{

count++;

const user = doc.data();

userTable.innerHTML += `
<tr>
<td>${user.fullname}</td>
<td>${user.email}</td>
<td>${user.role}</td>
</tr>
`;

});

document.getElementById("userCount").innerText = count;

}

loadUsers();
