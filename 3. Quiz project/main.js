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
      "Promises and Async/Await features were introduced in javascript in: ",
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

const answers = document.querySelectorAll(".answer");

const quiz = document.getElementById("quiz");

const quest = document.getElementById("question");
const A = document.getElementById("A");
const B = document.getElementById("B");
const C = document.getElementById("C");
const D = document.getElementById("D");
const btn = document.getElementById("submit");

let currentQ = 0;

loadQ();

function loadQ() {
  deselecting();

  const currentData = quizData[currentQ];

  quest.innerText = currentData.question;
  A.innerText = currentData.a;
  B.innerText = currentData.b;
  C.innerText = currentData.c;
  D.innerText = currentData.d;
}

function getSelected() {
  let answer = undefined;

  answers.forEach((element) => {
    if (element.checked) {
      answer = element.id;
    }
  });

  return answer;
}

function deselecting() {
  answers.forEach((element) => {
    if (element.checked) {
      element.checked = false;
    }
  });
}

let score = 0;

btn.addEventListener("click", () => {
  const answer = getSelected();

  console.log(answer);

  if (answer) {
    if (answer === quizData[currentQ].correct) {
      score++;
    }

    currentQ++;
    if (currentQ < quizData.length) {
      loadQ();
    } else {
      quiz.innerHTML = `<h2> You answered correctly at ${score}/${quizData.length} questions. </h2>
      <button onclick = "location.reload()"> Reload </button>
      `;
    }
  }
});
