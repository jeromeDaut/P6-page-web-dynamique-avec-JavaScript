
// const fetchPost =()=>{
//     fetch("http://localhost:5678/api/login",()=>{
//         "method"= "POST",
//         Headers{
            
//         }
//     })
let user ={
    userId: 1,
}
const login=  ()=>{
     fetch("http://localhost:5678/api/users/login",{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json;charset-utf-8',
        },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }),
    })
    .then((response) =>response.json())
    .then((response) =>{
        if(response.userId){
            console.log(res.userId);
            localStorage.setItem("info", JSON.stringify(response));
            document.location.href="/"
        }

    })


    // console.log(data);
}

