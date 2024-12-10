// Obtener el token almacenado
const token = localStorage.getItem("token");

// Verificar si el token existe
if (!token) {
  alert("No estás autenticado. Redirigiendo al login...");
  window.location.href = "/login";
} else {
  // Obtener los datos del usuario logueado
  fetch("http://localhost:8080/api/sessions/current", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Enviar el token como parte de la cabecera
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.user) {
        // Mostrar los datos del usuario en la página
        document.getElementById("first-name").textContent = data.user.first_name;
        document.getElementById("last-name").textContent = data.user.last_name;
        document.getElementById("email").textContent = data.user.email;
        document.getElementById("age").textContent = data.user.age;
        document.getElementById("role").textContent = data.user.role;
        document.getElementById("cartid").textContent = data.user.cart_id;
      } else {
        alert("Error al obtener los datos del usuario. Redirigiendo al login...");
        window.location.href = "/";
      }
    })
    .catch((err) => {
      console.error("Error al obtener los datos del usuario:", err);
      alert("Error en el servidor. Redirigiendo al login...");
      window.location.href = "/login";
    });
}
