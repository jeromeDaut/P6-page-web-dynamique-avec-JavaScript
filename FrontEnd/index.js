
  let categoryData =[];
  let worksData = [];
  let userId=[];
  let currentCat = 0;
  let modal= null;

  const category = document.getElementById("category");
  const gallery = document.querySelector(".gallery");
  // const galleryMini = document.querySelector('.gallery-mini');
  
  logout = ()=>{
    localStorage.removeItem('info');
    localation.href('/');
  }
  // logout.addEventListener('click', ()=>{
  //   // console.log(log);
  // })
  // --------------------------------------------------------------------
  /* functions asynchronous to get the api data
  in the table categoryData and worksData: */
  const fetchCategory = async()=>{
    await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) =>(categoryData = data))
    .catch((err)=>console.log(err,"fetch error "))
    await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) =>(worksData = data),console.log('fetch valide'))
    .catch((err)=>console.log(err,"fetch error "))
  }
  // ---------------------------------------------------------------------
  // display section portfolio :
  const worksDisplay = async () => {
    await fetchCategory();
    
    // -------------------------------------------------------------------
    // buttons injection in nav.category:
    category.innerHTML = `<button  onclick="currentCat = 0" class="btn active">Tous</button> `;
    category.innerHTML += categoryData.map((cat)=> `
    <button  onclick="currentCat = ${cat.id}"class="btn ">${cat.name}</button> 
    `
    ).join("");
    // -------------------------------------------------------------------
    // images injection in div.gallery:
    gallery.innerHTML= worksData.map((works) =>  `
    <figure  class="${works.categoryId} ${works.category.name} ">
    <img crossorigin="anonymous" src="${works.imageUrl}" alt="${works.title}">
    <figcaption>${works.title}</figcaption>
    </figure>`
    ).join(""); /* delete the commas created by .map*/
    
    // -------------------------------------------------------------------
    // buttons select
    const allBtnSelected = category.getElementsByTagName('button');
    
    for (let i= 0; i < allBtnSelected.length; i++) {
      // event btns
      allBtnSelected[i].addEventListener('click',()=>{
        // colorize buttons on click
        for (let j = 0; j < allBtnSelected.length; j++) {
          allBtnSelected[j].addEventListener("click", function () {
            let btnClicked = document.getElementsByClassName("active");
            btnClicked[0].className = btnClicked[0].className.replace("active" ,"");
            this.className += " active";
          });
        };
        // ----------------------------------------------------------------
        //condition for display figure
        if (i === 0) {
          gallery.innerHTML= worksData.map((works) =>  `
          <figure class="${works.category.name} ${works.categoryId}">
          <img crossorigin="anonymous" src="${works.imageUrl}" alt="${works.title}">
          <figcaption>${works.title}</figcaption>
          </figure>`
          ).join("");
        }else{
          gallery.innerHTML= "";
          for(let works of worksData) {
            if (currentCat === works.categoryId) {
              gallery.innerHTML +=` 
              <figure  class="${works.category.name} ${works.categoryId}">
              <img crossorigin="anonymous" src="${works.imageUrl}" alt="${works.title}">
              <figcaption>${works.title}</figcaption>
              </figure>`
            }
          }
        };
      })
    }
  };
  worksDisplay();
const bodyIndex = document.getElementsByTagName('body')
  const adminDisplay= async()=>{
    await login()
    if (info.userId === 1 ) {
    bodyIndex.innerHTML= `
    <div id="edit" aria-hidden="true" role="banner" >
        <a href="#modal1" id="#modal1" class="js-modal"><i class="fa-regular fa-pen-to-square"></i>Mode édition</a>
        <input type="submit" value="publier les changements" id="ValidModal">
    </div>`
    console.log(info);
    }else{
        alert("Vous n'avez pas les droits administrateur" )
    }
}
adminDisplay()