const inputEl = document.querySelector(".input");
const demo_text = document.querySelector("#demo-text");
const meaningEl = document.querySelector(".meaning");
const word_titleEl = document.querySelector("#word-title");
const word_meaning = document.querySelector("#word-meaning");
const audioEl = document.querySelector(".audio");

async function showMeaning(word) {
  try {
    inputEl.value = "";
    demo_text.style.display = "block";
    meaningEl.style.display = "none";
    demo_text.innerHTML = `Searching the meaning of <strong>"${word}"</strong>...`;
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    const responseTxt = await response.json();

    if (responseTxt.title) {
      demo_text.innerHTML = responseTxt.title + "!<br>" + responseTxt.message;
    } else {
      demo_text.style.display = "none";
      word_titleEl.innerHTML = word;
      word_meaning.innerText =
        responseTxt[0].meanings[0].definitions[0].definition;
      console.log(response);
      audioEl.src =
        responseTxt[0].phonetics[0].audio || responseTxt[0].phonetics[1].audio;
      meaningEl.style.display = "block";
    }
  } catch (error) {
    demo_text.innerText =
      "An Unknown error happend! check your internet connection and try agian";
  }
}

inputEl.addEventListener("keyup", (event) => {
  if (event.target.value && event.key == "Enter") {
    showMeaning(event.target.value);
  }
});
