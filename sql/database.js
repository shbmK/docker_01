import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool=mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASS,
    database:process.env.MYSQL_DATABASE
}).promise()

export async function getNotes(){
    const [res]=await pool.query("select * from notes")
    return res
}
export async function getNote(id){
    const [res]=await pool.query(`select * from notes where id=?`,[id])
    return res[0]
}

export async function createNotes(title,content){
    const [res]=await pool.query(`insert into notes(title,contents) values(?,?)`,[title,content])
    const id2=res.insertId
    return getNote(id2)
}
