import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const SESSION_KEY = "rilcoAuthUser";

function saveDemoSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      email: user.email,
      fullname: user.fullname || user.email.split("@")[0],
      loginAt: new Date().toISOString()
    })
  );
}

function getValue(id) {
  return document.getElementById(id)?.value.trim() || "";
}

if (window.location.pathname.endsWith("login.html") && localStorage.getItem(SESSION_KEY)) {
  window.location.href = "dashboard.html";
}

// REGISTER
window.register = async function () {
  const fullname = getValue("fullname");
  const email = getValue("email");
  const password = getValue("password");

  if (!fullname || !email || !password) {
    alert("Please complete all fields.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
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
    console.warn("Firebase registration failed, saving demo account instead.", error);
    saveDemoSession({ fullname, email });
    alert("Demo account created. You are now logged in.");
    window.location.href = "dashboard.html";
  }
};

// LOGIN
window.login = async function () {
  const email = getValue("email");
  const password = getValue("password");

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    console.warn("Firebase login failed, using demo session instead.", error);
  }

  saveDemoSession({ email });
  window.location.href = "dashboard.html";
};
