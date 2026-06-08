import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// REGISTER
window.register = async function () {

  const fullname =
    document.getElementById("fullname").value;

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        fullname,
        email,
        role: "user",
        createdAt: new Date()
      }
    );

    alert("Registration Successful!");
    window.location.href = "login.html";

  } catch (error) {

    alert(error.message);
    console.error(error);

  }

};

// LOGIN
window.login = async function () {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Login Successful!");
    window.location.href = "dashboard.html";

  } catch (error) {

    alert(error.message);
    console.error(error);

  }

};
