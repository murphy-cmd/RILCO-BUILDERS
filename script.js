function toggleMenu(){
document.getElementById("navLinks").classList.toggle("active");
}

// DARK MODE
const btn = document.getElementById("darkModeBtn");

btn.addEventListener("click", () => {
document.body.classList.toggle("dark-mode");
});
