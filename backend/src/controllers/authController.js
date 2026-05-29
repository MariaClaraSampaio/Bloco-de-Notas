const db =
  require("../config/db");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

/* REGISTER */

exports.register = (req, res) => {

  const {
    name,
    email,
    password
  } = req.body;

  if (
    !name ||
    !email ||
    !password
  ) {

    return res.status(400).json({
      error:
        "Preencha todos os campos"
    });

  }

  const hash =
    bcrypt.hashSync(password, 8);

  db.run(

    `
    INSERT INTO users (
      name,
      email,
      password
    )
    VALUES (?, ?, ?)
    `,

    [
      name,
      email,
      hash
    ],

    function(err) {

      if (err) {

        console.log(err);

        return res.status(400).json({
          error:
            "Email já cadastrado"
        });

      }

      console.log(`
🌸 Novo usuário:
${email}
      `);

      res.json({
        message:
          "Conta criada com sucesso"
      });

    }

  );

};

/* LOGIN */

exports.login = (req, res) => {

  const {
    email,
    password
  } = req.body;

  db.get(

    `
    SELECT * FROM users
    WHERE email = ?
    `,

    [email],

    (err, user) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          error:
            "Erro interno"
        });

      }

      if (!user) {

        return res.status(404).json({
          error:
            "Usuário não encontrado"
        });

      }

      const validPassword =
        bcrypt.compareSync(
          password,
          user.password
        );

      if (!validPassword) {

        return res.status(401).json({
          error:
            "Senha inválida"
        });

      }

      const token =
        jwt.sign(

          {
            id: user.id
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "1d"
          }

        );

      console.log(`
✨ Login:
${email}
      `);

      res.json({

        token,

        user: {

          id: user.id,

          name: user.name,

          email: user.email

        }

      });

    }

  );

};