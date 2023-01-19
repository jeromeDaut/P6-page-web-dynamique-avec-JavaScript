let categoryData = [];
let worksData = [];
let currentCat = 0;

const category = document.getElementById("category");
const gallery = document.querySelector(".gallery");

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

// datafetch (GET) for the category and the gallery:
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
      document.getElementById(
        "workCategory"
      ).innerHTML = `<option value=""> </option> `;
      document.getElementById("workCategory").innerHTML += categoryData
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
  // gallery modal
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      worksData = data;
      modalData = data;
      displayWorks();
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
    .catch((err) => console.log(err, "fetch error "));
};

getData();
// -------------------------------------------------------------
