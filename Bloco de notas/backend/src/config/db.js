const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./database.db",
  (err) => {

    if (err) {

      console.log(err);

    } else {

      console.log(
        "Banco conectado"
      );

    }

  }
);

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `, (err) => {

    if (err) {

      console.log(err);

    } else {

      console.log(
        "Tabela users criada"
      );

    }

  });

  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      userId INTEGER
    )
  `, (err) => {

    if (err) {

      console.log(err);

    } else {

      console.log(
        "Tabela notes criada"
      );

    }

  });

});

module.exports = db;