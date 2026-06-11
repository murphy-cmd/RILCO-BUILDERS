import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        await addDoc(collection(db, "messages"), {
            name,
            email,
            message,
            createdAt: serverTimestamp()
        });

        alert("Message Sent!");
        form.reset();

    } catch (error) {
        console.error(error);
        alert("Error sending message.");
    }
});
