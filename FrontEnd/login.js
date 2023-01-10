const login = document.querySelector("#envoyer");
login.addEventListener("click", () => {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value, //"S0phie"
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.userId) {
        localStorage.setItem("info", JSON.stringify(response));
        document.location.href = "/FrontEnd/";
      } else if (response.message) {
        alert("Mail  invalide");
      } else {
        alert("Mot de passe invalide");
      }
    });
  console.log(body);
});
