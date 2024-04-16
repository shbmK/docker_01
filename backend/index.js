import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const pool=mysql.createPool({
  host:'host.docker.internal',
  user:'root',
  password:'pass',
  multipleStatements:'true',
  port:'3307'
  
}).promise();


async function prebuiltdata(){
  await pool.query("create database if not exists test;")
  await pool.query("use test;create table if not exists books(id int primary key auto_increment,title varchar(45) not null,`desc` varchar(255),price int,cover varchar(255));")
  await pool.query("insert into books(title,`desc`,price,cover) values ('Three Body Problem', 'Groundbreaking sci-fi',499,'https://rukminim2.flixcart.com/image/850/1000/xif0q/book/m/s/p/the-three-body-problem-original-imagwcafhzkhezkq.jpeg?q=90&crop=false');")
  await pool.query("insert into books(title,`desc`,price,cover) values ('The Digital Fortress', 'Emotional encryption',799,'https://upload.wikimedia.org/wikipedia/en/c/c9/DigitalFortress.jpg');")
  await pool.query("insert into books(title,`desc`,price,cover) values ('F.Herbert`s DUNE', 'A timeless classic',649,'https://m.media-amazon.com/images/I/A1u+2fY5yTL._AC_UF1000,1000_QL80_.jpg');")
}

const rt=await prebuiltdata()

const db = mysql.createConnection({
  host: "host.docker.internal",
  user: "root",
  password: "pass",
  database: "test",
  port:'3307'
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
