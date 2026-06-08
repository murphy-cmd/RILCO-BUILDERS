// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFntM-PJLlZdc-bX7YPQNWz584LXeFrvI",
  authDomain: "rilco-builders-website.firebaseapp.com",
  projectId: "rilco-builders-website",
  storageBucket: "rilco-builders-website.firebasestorage.app",
  messagingSenderId: "826092464882",
  appId: "1:826092464882:web:788b88436fd4440b373e6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

export { app, auth };
