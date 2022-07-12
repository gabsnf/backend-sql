const mysql = require("mysql2");
const express = require("express");
const { json } = require("express");
const { METHODS } = require("http");
const { type } = require("os");
const cors = require("cors");

const app = express(); //instanciando o express na variavel app
app.use(express.json());
app.use(cors());

// const pool = mysql.createPool({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "undefined77",
//   database: "nutricao",
// });

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "nutricao",
});

con.connect()
// app.pool = pool;

app.get("/getUsers", async (req, res) => {

 const result =  con.query("select * FROM users", (error, rows, fields) => {
    if (rows) {
      // console.log(rows);
      return res.json(rows)
    } else {
      return res.status(500).send(error.toString());
    }
  });
  console.log(result);
  // return res.send(result)
});
app.get("/getUsers/:id", async (req, res) => {

  const {id}= req.params;

 const result =  con.query(`select * FROM users where id = ${id}`, (error, rows, fields) => {
    if (rows) {
      // console.log(rows);
      return res.json(rows)
    } else {
      return res.status(500).send(error.toString());
    }
  });
  console.log(result);
  // return res.send(result)

});



app.post("/createUser", async (req, res) => {
  try {
    con.connect(() => {
      console.log("connected");
    });
    const user = req.body;
console.log(user.name)
    const createUser = con.query(
      `INSERT INTO users (name) VALUES ( '${user.name}')`,
      (error, rows, fields) => {
        if (rows) {
          return res.status(200).json(rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.put("/updateId_dieta", async (req, res) => {
  try {
    con.connect(() => {
      console.log("connected");
    });
    const name = req.body;
    const dieta = req.body;
    const updateUser = con.query(
      `UPDATE users SET id_dieta = ('${dieta.dieta}') WHERE  id = ('${name.name}')`,
      (error, rows, fields) => {
        if (rows) {
          return res.status(200).json(rows);
        }
        return res.status(500).json(error)
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.post("/createCardapio", async (req, res) => {
  try {
    con.connect(() => {
      console.log("connected");
    });
    const cardapios  = req.body;
    const peso = req.body;
    const type = req.body;
    const id_dieta = req.body;
    const createDieta = con.query(
      `INSERT INTO cardapio (name, peso, type, id_dieta) VALUES ('${cardapios.cardapios}', '${peso.peso}', '${type.type}', '${id_dieta.id_dieta}')`,
      (error, rows, fields) => {
        if (rows) {
          return res.status(200).json(rows);
        }
        return res.status(400).json(error);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});



app.listen(2222, () => {
  console.log("miau");
});
