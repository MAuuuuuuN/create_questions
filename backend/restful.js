const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.listen(3001, console.log("サーバーが起動しました"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));;
});

const quiz = [
  { id: 1, "quiz": "test" },
];

app.get("/api/quiz", (req, res) => {
  res.send(quiz);
});

app.get("/api/quiz/:id", (req, res) => {
  const get_id = quiz.find((quiz) => {
    quiz.id === paramsInt(req.params.id)
  });

  res.send(get_id);
});


app.post("/api/quiz", (req, res) => {
  const post_quiz = {
    id: quiz.length + 1,
    quiz: req.body.quiz,
  };

  quiz.push(post_quiz);
  res.send(quiz);
});






