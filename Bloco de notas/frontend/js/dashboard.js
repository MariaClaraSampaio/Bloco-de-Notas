const API =
  "http://localhost:3001/api/notes";

const user =
  JSON.parse(
    localStorage.getItem("user")
  );

/* LOAD NOTES */

async function loadNotes() {

  const res =
    await fetch(
      `${API}/${user.id}`
    );

  const notes =
    await res.json();

  const notesDiv =
    document.getElementById(
      "notes"
    );

  notesDiv.innerHTML = "";

  document.getElementById(
    "totalNotes"
  ).innerText =
    `${notes.length} notas`;

  notes.forEach(note => {

    notesDiv.innerHTML += `

      <div class="note">

        <h3>
          ${note.title}
        </h3>

        <p>
          ${note.content}
        </p>

        <div class="actions">

          <button
            onclick="downloadPDF(${note.id})"
          >
            PDF
          </button>

          <button
            onclick="deleteNote(${note.id})"
          >
            Excluir
          </button>

        </div>

      </div>

    `;

  });

}

/* CREATE NOTE */

async function createNote() {

  const title =
    document.getElementById(
      "title"
    ).value;

  const content =
    document.getElementById(
      "content"
    ).value;

  if (!title || !content) {

    return alert(
      "Preencha todos os campos"
    );

  }

  await fetch(API, {

    method: "POST",

    headers: {
      "Content-Type":
        "application/json"
    },

    body: JSON.stringify({

      title,
      content,
      userId: user.id

    })

  });

  document.getElementById(
    "title"
  ).value = "";

  document.getElementById(
    "content"
  ).value = "";

  loadNotes();

}

/* DELETE */

async function deleteNote(id) {

  await fetch(

    `${API}/${id}`,

    {
      method: "DELETE"
    }

  );

  loadNotes();

}

/* PDF */

function downloadPDF(id) {

  window.open(
    `http://localhost:3001/api/pdf/${id}`
  );

}

/* LOGOUT */

function logout() {

  localStorage.removeItem(
    "user"
  );

  window.location.href =
    "login.html";

}

/* SEARCH */

const searchInput =
  document.querySelector(
    ".top-actions input"
  );

searchInput.addEventListener(
  "input",
  () => {

    const value =
      searchInput.value
      .toLowerCase();

    const notes =
      document.querySelectorAll(
        ".note"
      );

    notes.forEach(note => {

      const text =
        note.innerText
        .toLowerCase();

      if (text.includes(value)) {

        note.style.display =
          "block";

      } else {

        note.style.display =
          "none";

      }

    });

  }
);

/* INIT */

loadNotes();