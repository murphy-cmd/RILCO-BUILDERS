import { db } from "./firebase.js";

import {
collection,
addDoc
}
from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.sendMessage =
async function(){

const name =
document.getElementById("name").value;

const email =
document.getElementById("email").value;

const subject =
document.getElementById("subject").value;

const message =
document.getElementById("message").value;

if(
!name ||
!email ||
!subject ||
!message
){
alert("Please fill out all fields.");
return;
}

await addDoc(
collection(db,"messages"),
{
name,
email,
subject,
message,
createdAt:new Date()
}
);

alert("Message Sent Successfully!");

document.getElementById("name").value="";
document.getElementById("email").value="";
document.getElementById("subject").value="";
document.getElementById("message").value="";

};
