const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());

app.listen(3001, console.log("サーバーが起動しました"));

app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quiz'
})

db.connect(error => {
  if(error) {
    console.log("SQL接続時にエラーが発生しました", error);
    return;
  }
  console.log("SQLに接続しました");
})

app.post("/api/quiz", (req, res) => {
  const post = JSON.stringify(req.body.quiz);
  const query = "INSERT INTO quiz_list (quiz) VALUES (?);";

  db.query(query, [post], (error, result) => {
    if(error) {
      console.log(error);
      return;
    }

    res.send(result);
  })
});






