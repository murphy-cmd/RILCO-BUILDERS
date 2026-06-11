import { db } from "./firebase.js";

import {
collection,
getDocs,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("messagesTable");

async function loadMessages(){

table.innerHTML = "";

const snapshot = await getDocs(collection(db,"messages"));

snapshot.forEach((messageDoc)=>{

const data = messageDoc.data();

table.innerHTML += `
<tr>
<td>${data.name || ""}</td>
<td>${data.email || data.Email || ""}</td>
<td>${data.subject || ""}</td>
<td>${data.message || ""}</td>
<td>${data.createdAt?.seconds
? new Date(data.createdAt.seconds * 1000).toLocaleString()
: ""}
</td>
<td>
<button onclick="deleteMessage('${messageDoc.id}')">
Delete
</button>
</td>
</tr>
`;

});

}

window.deleteMessage = async function(id){

const confirmDelete =
confirm("Delete this message?");

if(!confirmDelete) return;

await deleteDoc(doc(db,"messages",id));

loadMessages();

}

loadMessages();
