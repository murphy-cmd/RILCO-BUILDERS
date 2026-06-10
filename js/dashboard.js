import { auth, db } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
doc,
getDoc,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async(user)=>{

if(!user){
window.location.href="login.html";
return;
}

const userRef = doc(db,"users",user.uid);
const userSnap = await getDoc(userRef);

if(userSnap.exists()){

const welcomeElement = document.getElementById("welcome");

if(welcomeElement){
    welcomeElement.innerHTML =
    `🏗 Welcome, ${userSnap.data().fullname}`;
}

// PROJECTS COUNT
const projects = await getDocs(collection(db,"projects"));
document.getElementById("projectCount").innerHTML =
projects.size;

// SERVICES COUNT
const services = await getDocs(collection(db,"services"));
document.getElementById("serviceCount").innerHTML =
services.size;

// MESSAGES COUNT
const messages = await getDocs(collection(db,"messages"));
document.getElementById("messageCount").innerHTML =
messages.size;

});

window.logout = async () => {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
