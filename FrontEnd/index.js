
  let categoryData =[];
  let worksData = [];
  const category = document.getElementById("category");
  const gallery = document.querySelector(".gallery");
  /* functions asynchronous to get the api data
  in the table categoryData and worksData: 
  --------------------------------------------------------*/
  const fetchData = async()=>{
    await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) =>(categoryData = data))
    
    
    await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) =>(worksData = data),console.log('fetch valide'))
    
    .catch((err)=>console.log(err,"fetch error "))
    
  }
  // --------------------------------------------------
  // display section portfolio :
  const worksDisplay = async () => {
    await fetchData()
    
    // buttons injection in nav.category:
    // -----------------------------------------------
    category.innerHTML += `
    <button id=""class="btn ${categoryData.length} active">Tous</button>
    <button id="" class="btn ${categoryData[0].id} ${categoryData[0].name}">Objets</button>
    <button id="" class="btn apartment ${categoryData[1].id} ${categoryData[1].name}">Appartements</button>
    <button id="" class="btn hotel ${categoryData[2].id} ${categoryData[2].name}" >Hôtels et restaurants</button>
    `;
    // ----------------------------------------------
    // images injection in div.gallery:
    gallery.innerHTML= worksData.map((works) =>  `
    <figure  class="${works.categoryId} ${works.category.name} ">
    <img crossorigin="anonymous" src="${works.imageUrl}" alt="${works.title}">
    <figcaption>${works.title}</figcaption>
    </figure>`
    ).join(""); /* delete the commas created by .map*/
    
    // buttons 
    const allBtnSelected = category.getElementsByTagName('button');
    const btnAll = category.getElementsByClassName('btn')[0];
    const btnObject = category.getElementsByClassName('btn')[1];
    const btnApartment = category.getElementsByClassName('btn')[2];
    const btnHotel = category.getElementsByClassName('btn')[3];
    // categoryId recovery :
    
      for (let i= 0; i < allBtnSelected.length; i++) {
          allBtnSelected[i].addEventListener('click',()=>{
            if (i === 0) {
            allBtnSelected[i].classList.toggle("active")
            gallery.innerHTML= worksData.map((works) =>  `
            <figure  class="${works.category.name} ${works.categoryId}">
            <img crossorigin="anonymous" src="${works.imageUrl}" alt="${works.title}">
            <figcaption>${works.title}</figcaption>
            </figure>`
            ).join(""); /* delete the commas created by .map*/
            }else
            allBtnSelected[i].className.replace('active',"");
          })
      };
      
      // btnObject.addEventListener('click', ()=>{
        //   btnObject.classList.toggle('active');
        //   categoryId.innerHTML= worksData.map((works) =>  `
        //   <figure  class="${works.categoryId}">
        //   <img crossorigin="anonymous" src="${works.imageUrl}" alt="${works.title}">
        //   <figcaption>${works.title}</figcaption>
        //   </figure>`
        //   ).join(""); /* delete the commas created by .map*/
        // })
        // btnApartment.addEventListener('click', ()=>{})
        // btnHotel.addEventListener('click', ()=>{})
        
        
        
        
        
      }
      worksDisplay();
      
      
      
      