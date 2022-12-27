// const modalData=[];
let modal= null;
let modalData =[];
const galleryMini = document.querySelector('.gallery-mini');
// data for modal
const fetchModal = async ()=>{ 
    await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) =>(modalData = data),console.log('fetch valide'))
    .catch((err)=>console.log(err,"fetch error "))
};

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
};
const closeModal = function (e){
    if (modal === null) return 
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('clicks',closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal = null
};

document.querySelectorAll('.js-modal').forEach(a =>{
    a.addEventListener('click', openModal)
});



const displayModal = async ()=>{
    await fetchModal()
    
    galleryMini.innerHTML= modalData.map((modal) =>  `
    <figure>
    <img src="${modal.imageUrl}" alt="${modal.title}">
    </figure>`
    ).join("")
}
displayModal()
// const modalDisplay = ()=>{

// };

 