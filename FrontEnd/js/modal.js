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
      getData();
    })
    .catch((err) => console.log(err, "fetch error "));
};

//  submit form in modal 2
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const image = e.target.workImg.files[0];
  const workTitle = e.target.workTitle.value;
  const workCategory = Number(e.target.workCategory.value);
  // -------------------------------------------------------------
  // if we want to use JavaScript instead of HTML for verification
  // -------------------------------------------------------------
  // if (!image) {
  //   alert("Veuillez choisir une image");
  //   return;
  // }

  // if (!workTitle) {
  //   alert("Veuillez choisir un titre ");
  //   return;
  // }

  // if (workCategory == "") {
  //   alert("Veuillez choisir une categorie");
  //   return;
  // }
  // -------------------------------------------------------------
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
      getData();

      e.target.workTitle.value = "";
      e.target.workCategory.value = "";
      resetBtnImage.click();
      returnBtnModal1.click();
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
