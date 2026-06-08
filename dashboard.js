import { auth, db } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async(user)=>{

if(user){

const docRef =
doc(db,"users",user.uid);

const docSnap =
await getDoc(docRef);

if(docSnap.exists()){

document.getElementById("welcome").innerHTML =
`Welcome, ${docSnap.data().fullname}`;

}

}else{

window.location.href="login.html";

}

});

window.logout = async function(){

await signOut(auth);

window.location.href="login.html";

};
