let categoryData = [];
let worksData = [];
let currentCat = 0;
let modal = null;

const category = document.getElementById("category");
const gallery = document.querySelector(".gallery");

logout = () => {
  localStorage.removeItem("info");
  location.href = "/FrontEnd/";
};

// const fetchLog = async () => {
//   await fetch("");
// };

// --------------------------------------------------------------------
/* functions asynchronous to get the api data
  in the table categoryData and worksData: */
const fetchCategory = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => (categoryData = data))
    .catch((err) => console.log(err, "fetch error "));
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (worksData = data), console.log("fetch valide"))
    .catch((err) => console.log(err, "fetch error "));
};
// ---------------------------------------------------------------------
// display section portfolio :
const worksDisplay = async () => {
  await fetchCategory();

  // -------------------------------------------------------------------
  // buttons injection in nav.category:
  category.innerHTML = `<button  onclick="currentCat = 0" class="btn active">Tous</button> `;
  category.innerHTML += categoryData
    .map(
      (cat) => `
    <button  onclick="currentCat = ${cat.id}"class="btn ">${cat.name}</button> 
    `
    )
    .join("");
  // -------------------------------------------------------------------
  // images injection in div.gallery:
  gallery.innerHTML = worksData
    .map(
      (works) => `
    <figure  class="${works.categoryId} ${works.category.name} ">
    <img crossorigin="anonymous" src="${works.imageUrl}" alt="${works.title}">
    <figcaption>${works.title}</figcaption>
    </figure>`
    )
    .join(""); /* delete the commas created by .map*/

  // -------------------------------------------------------------------
  // buttons select
  const allBtnSelected = category.getElementsByTagName("button");

  for (let i = 0; i < allBtnSelected.length; i++) {
    // event btns
    allBtnSelected[i].addEventListener("click", () => {
      // colorize buttons on click
      for (let j = 0; j < allBtnSelected.length; j++) {
        allBtnSelected[j].addEventListener("click", function () {
          let btnClicked = document.getElementsByClassName("active");
          btnClicked[0].className = btnClicked[0].className.replace(
            "active",
            ""
          );
          this.className += " active";
        });
      }
      // ----------------------------------------------------------------
      //condition for display figure
      if (i === 0) {
        gallery.innerHTML = worksData
          .map(
            (works) => `
          <figure class="${works.category.name} ${works.categoryId}">
          <img crossorigin="anonymous" src="${works.imageUrl}" alt="${works.title}">
          <figcaption>${works.title}</figcaption>
          </figure>`
          )
          .join("");
      } else {
        gallery.innerHTML = "";
        for (let works of worksData) {
          if (currentCat === works.categoryId) {
            gallery.innerHTML += ` 
              <figure  class="${works.category.name} ${works.categoryId}">
              <img crossorigin="anonymous" src="${works.imageUrl}" alt="${works.title}">
              <figcaption>${works.title}</figcaption>
              </figure>`;
          }
        }
      }
    });
  }
};
worksDisplay();

let info = localStorage.getItem("info");

const bannerAdmin = document.querySelector("div");
const loginDisplay = document.getElementById("login");
const logoutDisplay = document.getElementById("logout");
logoutDisplay.setAttribute("style", "display: none;");
bannerAdmin.setAttribute("style", "display: none;");

const adminDisplay = () => {
  if (info.userId != 1) {
    bannerAdmin.removeAttribute("style", "display: none;");
    logoutDisplay.removeAttribute("style", "display: none");
    loginDisplay.setAttribute("style", "display: none;");
    // logoutDisplay.replace("display:none;", "display:null;");
  }
};

adminDisplay();
