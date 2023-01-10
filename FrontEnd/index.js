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
// display images
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
// color filter
const stylerFilter = () => {
  const allBtn = category.getElementsByTagName("button");
  for (let i = 0; i < allBtn.length; i++) {
    allBtn[i].className = allBtn[i].className.replace("active", "");
    if (currentCat == allBtn[i].getAttribute("data-cat")) {
      allBtn[i].className += "active";
    }
  }
};
// datafetch for buttons and gallery:
const getData = () => {
  // button
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

      workCategory.innerHTML = `<option value="">Choisir une Catégorie </option> `;
      workCategory.innerHTML += categoryData
        .map((cat) => `<option value="${cat.id}">${cat.name}</option>`)
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
  // gallery
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      worksData = data;
      displayWorks();
    })
    .catch((err) => console.log(err, "fetch error "));
};

getData();
// -------------------------------------------------------------
// get token and id
let info = localStorage.getItem("info")
  ? JSON.parse(localStorage.getItem("info"))
  : null;

const bannerAdmin = document.getElementById("edit");
const loginDisplay = document.getElementById("login");
const logoutDisplay = document.getElementById("logout");
const btnProject = document.querySelector(".project-btn");

logoutDisplay.style.display = "none";
bannerAdmin.style.display = "none";
btnProject.style.display = "none";
// display Admin tools
const adminDisplay = () => {
  if (info != null) {
    bannerAdmin.removeAttribute("style", "display: none;");
    logoutDisplay.removeAttribute("style", "display: none");
    btnProject.removeAttribute("style", "display: none");
    loginDisplay.setAttribute("style", "display: none;");

    category.style.display = "none";
  }
};

adminDisplay();
// =====================================================
// =====================================================
// MODAL
const modalContainer = document.querySelector(".modal-container");
const modalContainer2 = document.querySelector(".modal-container2");
const modalBtn2 = document.querySelector(".modal-btn2");
const modalTriggers = document.querySelectorAll(".modal-trigger");
let currentId = 0;
console.log(modalTriggers);
modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);
// modalTriggersTwo.forEach((triggerTwo) =>
//   triggerTwo.addEventListener("click", toggleModal)
// );
modalBtn2.addEventListener("click", () => {
  modalContainer2.classList.toggle("active");
  // modalContainer.classList.remove("active");
});

function toggleModal() {
  modalContainer.classList.toggle("active");
  modalContainer2.classList.remove("active");
}

const galleryMini = document.querySelector(".gallery-mini");
//

const displayModalGallery = () => {
  galleryMini.innerHTML = "";

  for (const modal of modalData) {
    galleryMini.innerHTML += `
      <figure class = "figure" >
      <i class="fa-regular fa-trash-can recycle" data-id = " ${modal.id}"></i>
      <img crossorigin ="anonymous" src="${modal.imageUrl}" alt="${modal.title}" data-id ="${modal.id}">
      <a href="#modal2" class="editImg">éditer</a>
      </figure>
      `;
  }
  // if () {

  // }
};

const deleteWork = (id) => {
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("info")).token,
    },
  }).then((response) => {
    console.log(response);
    getModal();
  });
};

// fetch modal
const getModal = () => {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      modalData = data;
      displayModalGallery();
    })
    .then(() => {
      // delete individual img
      const recycleImg = document.getElementsByClassName("recycle");
      for (let i = 0; i < recycleImg.length; i++) {
        recycleImg[i].addEventListener("click", () => {
          currentId = recycleImg[i].getAttribute("data-id");
          deleteWork(currentId);
        });
      }
    })
    .catch((err) => console.log(err, "fetch error "));
};
getModal();

//  submit form
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const image = e.target.image.files[0];
  const workTitle = e.target.workTitle.value;
  const workCategory = Number(e.target.workCategory.value);

  const data = new FormData();
  data.append("image", image);
  data.append("title", workTitle);
  data.append("category", workCategory);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("info")).token,
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      displayModalGallery();
      getModal();
      modalBtn2.click();
      console.log(data);
    });
});
