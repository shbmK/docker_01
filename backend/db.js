import mysql from "mysql2"

const pool=mysql.createPool({
    host:'host.docker.internal',
    user:'root',
    password:'pass',
    multipleStatements:'true',
    port:'3307'
    
  }).promise()
  

  async function prebuiltdata(){
    await pool.query("create database test;")
    await pool.query("use test;create table books(id int primary key auto_increment,title varchar(45) not null,`desc` varchar(255),price int,cover varchar(255));")
    await pool.query("insert into books(title,`desc`,price,cover) values ('Three Body Problem', 'Groundbreaking sci-fi',499,'https://rukminim2.flixcart.com/image/850/1000/xif0q/book/m/s/p/the-three-body-problem-original-imagwcafhzkhezkq.jpeg?q=90&crop=false');")
    await pool.query("insert into books(title,`desc`,price,cover) values ('The Digital Fortress', 'Emotional encryption',799,'https://upload.wikimedia.org/wikipedia/en/c/c9/DigitalFortress.jpg');")
    await pool.query("insert into books(title,`desc`,price,cover) values ('F.Herbert`s DUNE', 'A timeless classic',649,'https://m.media-amazon.com/images/I/A1u+2fY5yTL._AC_UF1000,1000_QL80_.jpg');")
  }

  const rt=await prebuiltdata()
 