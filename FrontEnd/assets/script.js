// => nav list projects

// --------------------
// Backend recovery (gallery)

const gallery = document.querySelector(".gallery");

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((galleryList) => {
    for (let i = 0; i < galleryList.length; i++) { 
    gallery.innerHTML += `
		<figure data="${galleryList[i].category.name}">
			<img crossorigin="anonymous" src="${galleryList[i].imageUrl}" alt="${galleryList[i].title}">
	 		<figcaption>${galleryList[i].title}</figcaption>
		</figure>`;
    }
    
  });

// navbar projects
const navCategory = document.getElementsByTagName("nav")[1];
let btnContainer = document.querySelector("#category");
let btns = btnContainer.getElementsByClassName("btn-category");

// --------------------
// Backend recovery (projects categories)
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((category) => {
    navCategory.innerHTML = `
		  <button class="btn-category btn-all active" data="">Tous</button>
		  <button class="btn-category btn-objects" data="${category[0].name}">Objets</button>
		  <button class="btn-category btn-apartments" data="${category[1].name}">Appartements</button>
		  <button class="btn-category btn-hotels" data="${category[2].name}">Hôtel & restaurants</button>
	    `;
    
//loop for button colors
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        let btnClicked = document.getElementsByClassName("active");
        btnClicked[0].className = btnClicked[0].className.replace("active" ,"");
        this.className += " active";
        
      });
    };
  });
// assigning buttons by name
