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

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    const welcome = document.getElementById("welcome");

    if (welcome && userSnap.exists()) {
      welcome.innerHTML =
        `🏗 Welcome, ${userSnap.data().fullname}`;
    }

    const projects = await getDocs(collection(db, "projects"));
    document.getElementById("projectCount").innerHTML =
      projects.size;

    const services = await getDocs(collection(db, "services"));
    document.getElementById("serviceCount").innerHTML =
      services.size;

    const messages = await getDocs(collection(db, "messages"));
    document.getElementById("messageCount").innerHTML =
      messages.size;

  } catch (error) {
    console.error(error);
  }

});

window.logout = async function () {

  try {

    await signOut(auth);

    alert("Logged out successfully");

    window.location.href = "login.html";

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

};
