const range = document.getElementById("range");
const num = document.getElementById("num");
const form = document.getElementById("form");
const text = document.getElementById("text");

range.addEventListener("input", getData);

num.addEventListener("input", getData);

function getData(e) {
  const data = e.target.value;
  range.value = data;
  num.value = data;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const char = num.value;
  const upCase = box1.checked;
  const incNum = box2.checked;
  const incSym = box3.checked;

  const data = password(char, upCase, incNum, incSym);

  text.innerText = data;
});

function password(char, upCase, incNum, incSym) {
  let agent = lowerCase;
  if (upCase) agent = agent.concat(upperCase);
  if (incNum) agent = agent.concat(numCase);
  if (incSym) agent = agent.concat(symCase);

  const array = [];
  for (let i = 0; i < char; i++) {
    const agent01 = agent[Math.floor(Math.random() * agent.length)];

    array.push(String.fromCharCode(agent01));
  }
  return array.join("");
}

const lowerCase = getChars(97, 122);
const upperCase = getChars(65, 90);
const numCase = getChars(48, 57);
const symCase = getChars(33, 47)
  .concat(getChars(58, 64))
  .concat(getChars(91, 96))
  .concat(getChars(123, 126));

function getChars(low, high) {
  const array = [];

  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

console.log(String.fromCharCode(65));
