let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = [...letters];
let lettersContainer = document.querySelector(".letters");

// Generate Letters in Window
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

async function fetchData() {
  try {
    //Fetch Data
    let myData = await fetch(
      "https://api.json-generator.com/templates/UVLu_lutP-pe/data?access_token=ch207m78citivjoc8p09tuh3vlvplxqnhs4zxg1d"
    );
    if (!myData.ok) {
      throw new Error("Failed to fetch data");
    }
    //Get Array of Data
    let words = await myData.json();
    //Generate Ranom Word
    let allKeys = Object.keys(words);
    let randomCategory = allKeys[Math.floor(Math.random() * allKeys.length)];
    let randomProp = words[randomCategory];
    let randomWord = randomProp[Math.floor(Math.random() * randomProp.length)];
    // Set Category Info in Window
    let eleCategoryName = document.querySelector(".category span");
    eleCategoryName.textContent = randomCategory;
    //Create Elements of letters-guess
    let arrOfWordName = [...randomWord.toLowerCase()];
    let ElelettersGuess = document.querySelector(".letters-guess");
    arrOfWordName.forEach((letter) => {
      let emptySpan = document.createElement("span");
      // If Letter Is Space
      if (letter === " ") {
        emptySpan.className = "with-space";
      }
      ElelettersGuess.appendChild(emptySpan);
    });
    // Select Guess Spans
    let guessSpans = document.querySelectorAll(".letters-guess span");
    // Set The Wrong Attempts
    let wrongAttempts = false;
    let trueAttempts = 0;
    // Select Hangman-Draw
    let hangman = document.querySelector(".hangman-draw");
    //When Clicked Letter
    document.addEventListener("click", (eleClicked) => {
      // Set The Choose Status
      let theStatus = false;
      //check letter clicked
      if (eleClicked.target.className === "letter-box") {
        eleClicked.target.classList.add("clicked");
        let theEleClicked = eleClicked.target.innerHTML.toLowerCase();
        arrOfWordName.forEach((wordletter, WordIndex) => {
          if (wordletter == theEleClicked) {
            // Set Status To Correct
            theStatus = true;
            trueAttempts++;
            // Loop On All Guess Spans
            guessSpans.forEach((span, spanIndex) => {
              if (WordIndex === spanIndex) {
                span.innerHTML = theEleClicked;
              }
            });
          }
        });
        //Check when the user get the guess word
        if (trueAttempts === guessSpans.length) {
          great();
          lettersContainer.classList.add("finished");
        }
        //Every Wrong Attempt
        if (!theStatus) {
          wrongAttempts++;
          hangman.classList.add(`wrong-${wrongAttempts}`);
          if (wrongAttempts === 8) {
            endGame();
            lettersContainer.classList.add("finished");
          }
        }
      }
    });

    //Function when The user successfully gets the guess word
    function great() {
      // Create Popup Div and Style
      let div = document.createElement("div");
      let divText = document.createTextNode(
        `Great, The Word Is ${
          randomWord[0].toUpperCase() + randomWord.slice(1)
        }`
      );
      div.appendChild(divText);
      div.className = "popup";
      document.body.appendChild(div);
    }

    // End Game Function
    function endGame() {
      // Create Popup Div and Style
      let div = document.createElement("div");
      let divText = document.createTextNode(
        `Game Over, The Word Is ${
          randomWord[0].toUpperCase() + randomWord.slice(1)
        }`
      );
      div.appendChild(divText);
      div.className = "popup";
      document.body.appendChild(div);
    }

    //when Catch error in fetching Data
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

fetchData();
