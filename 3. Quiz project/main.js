const quizData = [
  {
    question: "JavaScript was first released in: ",
    a: "1999",
    b: "1995",
    c: "2000",
    d: "None of the these.",
    correct: "b",
  },

  {
    question:
      "Event Loops, Callbacks, Promises and Async/Await features were introduced in javascript in: ",
    a: "ECMAScript 2005",
    b: "ECMAScript 2017",
    c: "ECMAScript 2000",
    d: "None of these.",
    correct: "b",
  },
  {
    question: "How do we spell i dont know?",
    a: "Ne znam",
    b: "NeZnam",
    c: "Neznam",
    d: "neznam",
    correct: "a",
  },
  {
    question: "Which one is not the type of web development: ",
    a: "Front End Developer",
    b: "Back End Developer",
    c: "Keder End Developer",
    d: "Full-Stack Developer",
    correct: "c",
  },
  {
    question: "Haris is student of last year at: ",
    a: "Faculty of Medicine",
    b: "Faculty of Science",
    c: "Faculty Of Pharmacy @UniversityOfTuzla.",
    d: "Nowhere.",
    correct: "c",
  },
  {
    question: "What do you say about this quiz?",
    a: "Nice. We see the progress.",
    b: "Bad",
    c: "Excellent",
    d: "Noob",
    correct: "a", // if you choosed c, special thanks to you. :D
  },
];

const answersEls = document.querySelectorAll(".answer");

const quiz = document.getElementById("QUIZ");

const questionE1 = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionE1.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;

  answersEls.forEach((answerElement) => {
    if (answerElement.checked) {
      answer = answerElement.id;
    }
  });

  return answer;
}

function deselectAnswers() {
  answersEls.forEach((answerElement) => {
    if (answerElement.checked) {
      answerElement.checked = false;
    }
  });
}

let score = 0;

submitBtn.addEventListener("click", () => {
  //check to see the ANSWEEEEER

  const answer = getSelected();

  console.log(answer);

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      //TODO: Show resulzzzzZzzzzZZzzzz
      // alert("End Of The Quiz.");

      quiz.innerHTML = `<h2> You answered correctly at ${score}/${quizData.length} questions. </h2>
      <button onclick = "location.reload()"> Reload </button>
      `;
    }

    /* loadQuiz(); */
  }
});

const allSpanElements = document.querySelectorAll("span");

allSpanElements.forEach((spanElement) => {
  // Here comes the Code that should be executed on every Element, e.g.
  spanElement.innerHTML = "This Content will appear on every span Element now";
});
