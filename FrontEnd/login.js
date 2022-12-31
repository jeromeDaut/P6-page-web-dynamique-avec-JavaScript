const login = async  ()=>{
    await fetch("http://localhost:5678/api/users/login",{
        // const bodyIndex = document.getElementsByTagName('body');
       method: "POST",
       headers: {'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value, //"S0phie"
     })
   }) 
   .then((response) =>response.json())
   .then((response) =>{
       console.log(response);
       if(response.userId){
           localStorage.setItem("info", JSON.stringify(response));
           document.location.href="/FrontEnd/"

        }
        else if(response.message){
            alert('Mail  invalide')
        }
        else{
            alert('Mot de passe invalide')
        }
        
    })
console.log(body);
// const adminTools= document.body.createElement('div')

    // console.log("info");

   // console.log(data);
}

// const adminDisplay= async ()=>{
//     await login();
//     edit.style.display=null;

// }