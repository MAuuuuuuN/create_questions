export async function addQuiz(quiz) {
  const quiz_post = {
    method: 'POST',
    body: JSON.stringify({ "category": quiz.category, "question_id": quiz.questionId, "question": quiz.question, "selects": quiz.selects, "answer": quiz.answer }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  await fetch('http://localhost:3001/api/quiz', quiz_post);
}

export async function addSelect(questionId, isCorrect, selectValue) {
  const select_post = {
    method: 'POST',
    body: JSON.stringify({ "question_id": questionId, "is_correct": isCorrect, "select_value": selectValue }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  await fetch('http://localhost:3001/api/select', select_post);
}