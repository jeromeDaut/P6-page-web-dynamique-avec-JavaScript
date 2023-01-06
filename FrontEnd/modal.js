const focusableSelector = "button, a ,input, textarea";
let focusables = [];
let currentId = 0;
const galleryMini = document.querySelector(".gallery-mini");

const displayModal = () => {
  galleryMini.innerHTML = "";

  for (const modal of modalData) {
    galleryMini.innerHTML += `
      <figure class = "figure" >
      <i class="fa-regular fa-trash-can  recycle" data-id = " ${modal.id}">${modal.id}</i>
      <img src="${modal.imageUrl}" alt="${modal.title}" data-id ="${modal.id}">
      <a href="#" class="editImg">éditer</a>
      </figure>
      `;
  }
};

// data for modal
const getModal = () => {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      modalData = data;
      displayModal();
    })
    .then(() => {
      // getElementsByClassName et non by tagName
      const recycleImg = document.getElementsByClassName("recycle");
      console.log(recycleImg.length);
      for (let i = 0; i < recycleImg.length; i++) {
        recycleImg[i].addEventListener("click", () => {
          currentId = recycleImg[i].getAttribute("data-id");
          console.log(currentId);
          deleteWork(currentId);
          // displayModal();

          // console.log(recycleImg[i].getAttribute("data-id"));
        });
      }
    })
    .catch((err) => console.log(err, "fetch error "));
};

getModal();

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  focusables[0].focus();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  // modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("clicks", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);

  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
};
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key == "Tab" && modal !== null) {
    focusInModal(e);
  }
});

// delete images in mondal
// const reloadWorks = () => {};

const deleteWork = (id) => {
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("info")).token,
    },
  }).then((response) => {
    // preventDefault();
    console.log(response);
    getModal();
  });
};
