const API =
  "http://localhost:3001/api/auth";

// login
async function login() {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const res =
    await fetch(`${API}/login`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email,
        password
      })

    });

  const data =
    await res.json();

  if (data.token) {

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    window.location.href =
      "dashboard.html";

  } else {

    alert(data.error);

  }

}

// cadastro
async function register() {

  const name =
    document.getElementById("name").value;

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const res =
    await fetch(`${API}/register`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name,
        email,
        password
      })

    });

  const data =
    await res.json();

  if (data.message) {

    alert("Conta criada");

    window.location.href =
      "login.html";

  } else {

    alert(data.error);

  }

}

function goRegister() {

  window.location.href =
    "register.html";

}