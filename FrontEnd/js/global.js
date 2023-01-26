const logout = document.getElementById("logoutLink");
//event remove admin log
logout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("info");
  location.href = "/";
});

// get token and id
let info = localStorage.getItem("info")
  ? JSON.parse(localStorage.getItem("info"))
  : null;

const bannerAdmin = document.getElementById("edit");
const loginDisplay = document.getElementById("login");
const logoutDisplay = document.getElementById("logout");
const btnProject = document.querySelectorAll(".project-btn");

//loop to display all btnProject
btnProject.forEach((btn) => (btn.style.display = "none"));

logoutDisplay.style.display = "none";
bannerAdmin.style.display = "none";
// display Admin tools
const adminDisplay = () => {
  if (info != null) {
    bannerAdmin.removeAttribute("style", "display: none;");
    logoutDisplay.removeAttribute("style", "display: none");
    loginDisplay.setAttribute("style", "display: none;");
    btnProject.forEach((btn) => (btn.style.display = "block"));
    category.style.display = "none";
  }
};

adminDisplay();
