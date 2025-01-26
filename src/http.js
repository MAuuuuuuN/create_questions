export async function addQuiz(quiz) {
  const post = {
    method: 'POST',
    body: JSON.stringify({ "quiz": quiz }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  console.log(post);


  await fetch('http://localhost:3001/api/quiz', post);
}