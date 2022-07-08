import React from "react";

import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  function questionDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(r => r.json())
      .then(() => {
        const deleteId = questions.filter(q => q.id !== id);

        setQuestions(deleteId);
      });
  }

  function patchAnswers(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: correctIndex,
      }),
    })
      .then(r => r.json())
      .then(num => {
        const allQuestions = questions.map(questionAll => {
          if (questionAll.id === num.id) {
            return num;
          } else {
            return questionAll;
          }
        });
        // console.log(allQuestions)
        setQuestions(allQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>

      <ul>
        {questions.map(qq => (
          // console.log(qq.id)
          <QuestionItem
            patchAnswers={patchAnswers}
            deleteIds={questionDelete}
            key={qq.id}
            id={qq.id}
            question={qq}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
