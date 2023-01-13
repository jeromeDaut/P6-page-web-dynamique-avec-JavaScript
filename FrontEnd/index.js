let categoryData = [];
let worksData = [];
let currentCat = 0;

const category = document.getElementById("category");
const gallery = document.querySelector(".gallery");
const logout = document.getElementById("logoutLink");
//event remove admin log
logout.addEventListener("click", (e) => {
  e.preventDefault();
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
// for color btns selected
const stylerFilter = () => {
  const allBtn = category.getElementsByTagName("button");
  for (let i = 0; i < allBtn.length; i++) {
    allBtn[i].className = allBtn[i].className.replace("active", "");
    if (currentCat == allBtn[i].getAttribute("data-cat")) {
      allBtn[i].className += "active";
    }
  }
};
// datafetch for the category and the gallery:
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
      // insert categories options to modal 2
      workCategory.innerHTML = `<option value=""> </option> `;
      workCategory.innerHTML += categoryData
        .map((cat) => `<option value="${cat.id}">${cat.name}</option>`)
        .join("");

      const allBtn = category.getElementsByTagName("button");

      for (let i = 0; i < allBtn.length; i++) {
        // To select all buttons and add filters
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
// =====================================================
// =====================================================
// SECTION MODALS
const modalContainer = document.querySelector(".modal-container");
const modalContainer2 = document.querySelector(".modal-container2");
const modalBtn2 = document.querySelector(".modal-btn2");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const submitButton = document.querySelector(".valid");
const returnBtnModal1 = document.querySelector(".return-modal1");
let currentId = 0;

// event to return modal 1
returnBtnModal1.addEventListener("click", () => {
  modalContainer2.classList.remove("active");
  modalContainer.classList.add("active");
});
// display modal
modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);
function toggleModal() {
  modalContainer.classList.toggle("active");
  modalContainer2.classList.remove("active");
}

modalBtn2.addEventListener("click", () => {
  modalContainer2.classList.toggle("active");
  modalContainer.classList.remove("active");
});

const galleryMini = document.querySelector(".gallery-mini");
//

const displayModalGallery = () => {
  galleryMini.innerHTML = "";

  for (const modal of modalData) {
    galleryMini.innerHTML += `
      <figure class = "figure" >
      <i class="fa-regular fa-trash-can recycle" id="deleteImg "data-id = " ${modal.id}"></i>
      <img crossorigin ="anonymous" src="${modal.imageUrl}" alt="${modal.title}" data-id ="${modal.id}">
      <a href="#modal2" class="editImg">éditer</a>
      </figure>
      `;
  }
};

const deleteWork = (id) => {
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("info")).token,
    },
  })
    .then((response) => {
      console.log(response);
      getModal();
    })
    .catch((err) => console.log(err, "fetch error "));
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
        recycleImg[i].addEventListener("click", (e) => {
          e.preventDefault();
          currentId = recycleImg[i].getAttribute("data-id");
          confirm(`Voulez-vous vraiment supprimer cette photo ?`);
          deleteWork(currentId);
        });
      }
    })
    //delete gallery in modal 1:
    .then(() => {
      const deleteGal = document.querySelector(".deleteGal");
      const galleryMini = document.querySelector(".gallery-mini");
      // select all the images to be deleted
      deleteGal.addEventListener("click", (e) => {
        e.preventDefault();
        confirm("Voulez-vous supprimer toute la gallerie ?");
        const allIds = galleryMini.querySelectorAll("[data-id]");
        allIds.forEach((img) => {
          const id = img.getAttribute("data-id");
          deleteWork(id);
        });
      });
    })
    .catch((err) => console.log(err, "fetch error "));
};
getModal();

//  submit form in modal 2
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
      console.log(data);
    })
    .catch((err) => console.log(err, "fetch error "));
});

// color btn in green if form is valid
const submitBtn = document.querySelector(".valid");
submitButton.style.backgroundColor = "#A7A7A7";
form.addEventListener("input", () => {
  if (form.checkValidity()) {
    submitButton.style.backgroundColor = "#1D6154";
    submitButton.style.cursor = "pointer";
  } else {
    submitButton.style.backgroundColor = "#A7A7A7";
  }
});

const resetBtnImage = document.querySelector(".resetImg");

resetBtnImage.style.visibility = "hidden"; // Hide the reset button by default

// function to display and select an image to add to the gallery
document.querySelector("#workImg").addEventListener("change", function () {
  let output = document.querySelector("#output");
  output.style.zIndex = "1";
  output.src = URL.createObjectURL(this.files[0]); //URL that points to the selected file
  output.addEventListener("load", function () {
    URL.revokeObjectURL(output.src); //to revoke the URL created by URL.createObjectURL(this.files[0]) to free memory
  });
  resetBtnImage.style.visibility = "visible"; // Show the reset button when an image is selected
});
// function to reset the selected image in modal 2
function clearInputFile() {
  let inputFile = document.getElementById("workImg");
  inputFile.value = null;
  //Remove image from output
  let output = document.getElementById("output");
  output.src = "";
  output.style.zIndex = "-2";
  resetBtnImage.style.visibility = "hidden"; // Hide the reset button when the image is cleared
}

resetBtnImage.addEventListener("click", clearInputFile);
