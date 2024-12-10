const form = document.getElementById("form");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
// const boton = document.getElementById("boton");

form.onsubmit = (e) => {
  e.preventDefault();
  const user = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  fetch("http://localhost:8080/users/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.token) {
        // Almacenar el token en localStorage
        localStorage.setItem("token", response.token);

        // Redirigir a la pantalla de usuario
        window.location.href = "/user";
      } else {
        console.error("Error en el inicio de sesión:", response);
      }
    })
    .catch((err) => console.error("Error:", err));
};


