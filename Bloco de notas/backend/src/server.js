require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const authRoutes =
  require("./routes/auth.routes");

const notesRoutes =
  require("./routes/notes.routes");

const pdfRoutes =
  require("./routes/pdf.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/notes",
  notesRoutes
);

app.use(
  "/api/pdf",
  pdfRoutes
);

app.get("/", (_req, res) => {

  res.json({
    message:
      "API Blossom Notes funcionando 🌸"
  });

});

const PORT =
  process.env.PORT || 3001;

app.listen(PORT, () => {

  console.log(`
🌸 Servidor rodando:
http://localhost:${PORT}
  `);

});