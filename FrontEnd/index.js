let categoryData = [];
let worksData = [];
let currentCat = 0;
// let modal = null;

const category = document.getElementById("category");
const gallery = document.querySelector(".gallery");
const logout = document.getElementById("logoutLink");
//event remove admin log
logout.addEventListener("click", () => {
  localStorage.removeItem("info");
  location.href = "/FrontEnd/";
});

const displayWorks = () => {
  gallery.innerHTML = "";

  for (work of worksData) {
    if (currentCat == work.categoryId || currentCat == 0) {
      gallery.innerHTML += `
          <figure  class="${work.categoryId} ${work.category.name} ">
            <img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
          </figure>`;
    }
  }
};

const stylerFilter = () => {
  const allBtn = category.getElementsByTagName("button");
  for (let i = 0; i < allBtn.length; i++) {
    allBtn[i].className = allBtn[i].className.replace("active", "");
    if (currentCat == allBtn[i].getAttribute("data-cat")) {
      allBtn[i].className += "active";
    }
  }
};
const getData = () => {
  fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => {
      categoryData = data;
      // insert filters in the dom
      category.innerHTML = `<button  data-cat = "0"  class="btn active">Tous</button> `;
      category.innerHTML += categoryData
        .map(
          (cat) =>
            `<button  data-cat = "${cat.id}" class="btn ">${cat.name}</button>`
        )
        .join("");

      const allBtn = category.getElementsByTagName("button");

      for (let i = 0; i < allBtn.length; i++) {
        // event btns
        allBtn[i].addEventListener("click", () => {
          currentCat = allBtn[i].getAttribute("data-cat");
          stylerFilter();
          displayWorks();
        });
      }
    })
    .catch((err) => console.log(err, "fetch error "));
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      worksData = data;
      displayWorks();
    })
    .catch((err) => console.log(err, "fetch error "));
};

getData();
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// display banner Admin
let info = localStorage.getItem("info")
  ? JSON.parse(localStorage.getItem("info"))
  : null;

const bannerAdmin = document.getElementById("edit");
const loginDisplay = document.getElementById("login");
const logoutDisplay = document.getElementById("logout");

logoutDisplay.setAttribute("style", "display: none;");
bannerAdmin.setAttribute("style", "display: none;");

const adminDisplay = () => {
  if (info != null) {
    bannerAdmin.removeAttribute("style", "display: none;");
    logoutDisplay.removeAttribute("style", "display: none");
    loginDisplay.setAttribute("style", "display: none;");
  }
};

adminDisplay();
// delete works
