const db = require("../config/db");

// criar nota
exports.createNote = (req, res) => {

  const {
    title,
    content,
    userId
  } = req.body;

  db.run(
    `
    INSERT INTO notes (
      title,
      content,
      userId
    )
    VALUES (?, ?, ?)
    `,
    [
      title,
      content,
      userId
    ],
    function(err) {

      if (err) {

        console.log(err);

        return res.status(400).json(err);

      }

      console.log(
        `Nota criada: ${title}`
      );

      res.json({
        id: this.lastID
      });

    }
  );

};

// listar notas
exports.getNotes = (req, res) => {

  const userId =
    req.params.userId;

  db.all(
    `
    SELECT * FROM notes
    WHERE userId = ?
    ORDER BY id DESC
    `,
    [userId],
    (err, rows) => {

      if (err) {

        console.log(err);

      }

      res.json(rows);

    }
  );

};

// buscar nota única
exports.getSingleNote = (req, res) => {

  db.get(
    `
    SELECT * FROM notes
    WHERE id = ?
    `,
    [req.params.id],
    (err, row) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json(row);

    }
  );

};

// deletar nota
exports.deleteNote = (req, res) => {

  db.run(
    `
    DELETE FROM notes
    WHERE id = ?
    `,
    [req.params.id],
    (err) => {

      if (err) {

        console.log(err);

      }

      console.log(
        `Nota deletada ID: ${req.params.id}`
      );

      res.json({
        deleted: true
      });

    }
  );

};