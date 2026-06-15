import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const SESSION_KEY = "rilcoAuthUser";

function getDemoSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch (error) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function redirectToLogin() {
  window.location.replace("login.html");
}

function clearLocalSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.clear();
}

function updateWelcome(user) {
  const welcome = document.getElementById("welcome");
  const session = getDemoSession();
  const name = session?.fullname || user?.email || "RILCO BUILDERS";

  if (welcome) {
    welcome.innerText = `Welcome, ${name}`;
  }
}

function setDashboardStats(totalProjects, ongoingProjects, completedProjects, totalBudget) {
  document.getElementById("totalProjects").innerText = totalProjects;
  document.getElementById("ongoingProjects").innerText = ongoingProjects;
  document.getElementById("completedProjects").innerText = completedProjects;
  document.getElementById("totalBudget").innerText = "₱" + totalBudget.toLocaleString();
}

async function loadDashboard() {
  try {
    const snapshot = await getDocs(
      collection(db, "projects")
    );

    let totalProjects = 0;
    let ongoingProjects = 0;
    let completedProjects = 0;
    let totalBudget = 0;

    snapshot.forEach((project) => {
      const data = project.data();

      totalProjects++;
      totalBudget += Number(data.budget || 0);

      if (data.status === "Ongoing") {
        ongoingProjects++;
      }

      if (data.status === "Completed") {
        completedProjects++;
      }
    });

    setDashboardStats(totalProjects, ongoingProjects, completedProjects, totalBudget);
  } catch (error) {
    console.warn("Unable to load project stats.", error);
    setDashboardStats(0, 0, 0, 0);
  }
}

window.logout = function () {
  clearLocalSession();
  signOut(auth).catch((error) => {
    console.warn("Firebase sign out skipped.", error);
  });
  redirectToLogin();
};

window.showComingSoon = function (featureName) {
  alert(`${featureName} page is not available yet.`);
};

onAuthStateChanged(auth, (user) => {
  const demoSession = getDemoSession();

  if (!user && !demoSession) {
    redirectToLogin();
    return;
  }

  updateWelcome(user);
  loadDashboard();
});
