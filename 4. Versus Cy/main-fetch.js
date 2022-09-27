const select = document.querySelector("select");
const display = document.querySelector("pre");

select.addEventListener("change", () => {
  const option = select.value;

  updateDisplay(option);
});

function updateDisplay(opt) {
  opt = opt.replace(" ", "").toLowerCase();
  const data = `${opt}.txt`;
  fetch(data)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => (display.textContent = text))
    .catch(
      (error) => (display.textContent = `Could not fetch verse: ${error}`)
    );
}

updateDisplay("Verse 1");
select.value = "Verse 1";
