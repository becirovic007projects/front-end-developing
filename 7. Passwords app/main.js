const range = document.getElementById("range");
const A = document.getElementById("A");

const letter = document.getElementById("A");
const upCase = document.getElementById("box1");
const incNum = document.getElementById("box2");
const incSym = document.getElementById("box3");

range.addEventListener("input", syncFunction);

A.addEventListener("input", syncFunction);

function syncFunction(e) {
  const variable_00 = e.target.value;
  range.value = variable_00;
  A.value = variable_00;
}

const js = document.getElementById("form");

const pass = document.getElementById("pass");

js.addEventListener("submit", (e) => {
  e.preventDefault();

  const letter = A.value;
  const upCase = box1.checked;
  const incNum = box2.checked;
  const incSym = box3.checked;

  const variable_01 = producePassword(letter, upCase, incNum, incSym);

  pass.innerText = variable_01;
});

function producePassword(letter, upCase, incNum, incSym) {
  let letterCode = lowwerLetter_from_char_codes;
  if (upCase) letterCode = letterCode.concat(upperLetter_from_char_codes);
  if (incNum) letterCode = letterCode.concat(numbers_from_char_codes);
  if (incSym) letterCode = letterCode.concat(symbols_from_char_codes);

  const passwordStoringVariableArray = [];
  for (let i = 0; i < letter; i++) {
    const letterCODE =
      letterCode[Math.floor(Math.random() * letterCode.length)];

    passwordStoringVariableArray.push(String.fromCharCode(letterCODE));
  }
  return passwordStoringVariableArray.join("");
}

const upperLetter_from_char_codes = arrayFromLowToHigh(65, 90);
const lowwerLetter_from_char_codes = arrayFromLowToHigh(97, 122);
const numbers_from_char_codes = arrayFromLowToHigh(48, 57);
const symbols_from_char_codes = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

function arrayFromLowToHigh(low, high) {
  const arrayForLopping = [];

  for (let i = low; i <= high; i++) {
    arrayForLopping.push(i);
  }
  return arrayForLopping;
}

console.log(String.fromCharCode(65));
