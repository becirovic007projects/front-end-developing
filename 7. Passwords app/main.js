const input_00_range = document.getElementById("input_00_range");
const input_01_number = document.getElementById("input_01_number");

const letterAmount = document.getElementById("input_01_number");
const includeUpperCase = document.getElementById("input_02_checkbox");
const includeNumbers = document.getElementById("input_03_checkbox");
const includeSymbols = document.getElementById("input_04_checkbox");

input_00_range.addEventListener("input", syncFunction);

input_01_number.addEventListener("input", syncFunction);

function syncFunction(e) {
  const variable_00 = e.target.value;
  input_00_range.value = variable_00;
  input_01_number.value = variable_00;
}

const formJavaScript = document.getElementById("form_00");

const passwordDisplay = document.getElementById("passwordDisplay");

formJavaScript.addEventListener("submit", (e) => {
  e.preventDefault();

  const letterAmount = input_01_number.value;
  const includeUpperCase = input_02_checkbox.checked;
  const includeNumbers = input_03_checkbox.checked;
  const includeSymbols = input_04_checkbox.checked;

  const variable_01 = producePassword(
    letterAmount,
    includeUpperCase,
    includeNumbers,
    includeSymbols
  );

  passwordDisplay.innerText = variable_01;
});

function producePassword(
  letterAmount,
  includeUpperCase,
  includeNumbers,
  includeSymbols
) {
  let letterCode = lowwerLetter_from_char_codes;
  if (includeUpperCase)
    letterCode = letterCode.concat(upperLetter_from_char_codes);
  if (includeNumbers) letterCode = letterCode.concat(numbers_from_char_codes);
  if (includeSymbols) letterCode = letterCode.concat(symbols_from_char_codes);

  const passwordStoringVariableArray = [];
  for (let i = 0; i < letterAmount; i++) {
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
