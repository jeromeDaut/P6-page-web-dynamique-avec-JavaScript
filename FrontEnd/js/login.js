const login = document.querySelector("#envoyer");
login.addEventListener("click", () => {
  // Get email and password values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if email is valid
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Adresse email non valide");
    return;
  }

  // Check if password is valid
  if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
    alert(
      "Mot de passe non valide. Doit contenir au moins 6 caractères, une majuscule et un chiffre"
    );
    return;
  }

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      email: email,
      password: password,
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
    })
    .catch(function (err) {
      console.log(err);
      alert("Veuillez nous excuser Erreur System ");
    });
  // console.log(body);
});
