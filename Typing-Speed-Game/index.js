// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting  Timer of Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Catch Selectors
let startButton = document.querySelector(".start"),
  lvlNameSpan = document.querySelector(".message .lvl"),
  secondsSpan = document.querySelector(".message .seconds"),
  theWord = document.querySelector(".the-word"),
  upcomingWords = document.querySelector(".upcoming-words"),
  input = document.querySelector(".input"),
  timeLeftSpan = document.querySelector(".time span"),
  scoreGot = document.querySelector(".score .got"),
  scoreTotal = document.querySelector(".score .total"),
  finishMessage = document.querySelector(".finish");
selection = document.querySelector(".selection");

// Default Level
let defaultLevelName = selection.value, // Change Level From Here
  defaultLevelSeconds = lvls[defaultLevelName],
  firstStep = true, // For add time to first step
  wordsOfLevel;

// Setting Level Name + Seconds + Score
function DefaultSelection() {
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let ObjOfLevels = specificLevels(words);
  scoreTotal.innerHTML = ObjOfLevels[defaultLevelName].length;
}
DefaultSelection();

function specificLevels(words) {
  let Easy = [];
  let Normal = [];
  let Hard = [];
  words.map((e) => {
    if (e.length < 5) {
      Easy.push(e);
    } else if (e.length >= 5 && e.length <= 7) {
      Normal.push(e);
    } else {
      Hard.push(e);
    }
  });
  return { Easy: Easy, Normal: Normal, Hard: Hard };
}

selection.addEventListener("change", (event) => {
  let chosenLevel = event.target.value;
  lvlNameSpan.innerHTML = chosenLevel;
  defaultLevelSeconds = lvls[chosenLevel];
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let ObjOfLevels = specificLevels(words);
  scoreTotal.innerHTML = ObjOfLevels[chosenLevel].length;
});

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  let ObjOfLevels = specificLevels(words);
  wordsOfLevel = ObjOfLevels[lvlNameSpan.innerHTML];
  scoreTotal.innerHTML = wordsOfLevel.length;
  selection.remove();
  // Generate Word Function
  genWords(wordsOfLevel);
};

function genWords(words) {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  startPlay();
}

function startPlay() {
  if (firstStep) {
    timeLeftSpan.innerHTML = defaultLevelSeconds + 3;
    firstStep = false;
  } else {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  }
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (wordsOfLevel.length > 0) {
          // Call Generate Word Function
          genWords(wordsOfLevel);
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congrats Brooooo ^_^");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          saveScore(scoreGot.innerHTML);

          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        saveScore(scoreGot.innerHTML);
      }
    }
  }, 1000);
}

function saveScore(score) {
  let existingJSONString = window.localStorage.getItem("scores");
  // if found > convert this to array
  arr = existingJSONString ? JSON.parse(existingJSONString) : [];
  let date = new Date();
  let obj = {
    Date: date,
    Score: `[${score}] From [${scoreTotal.innerHTML}]`,
    Level: lvlNameSpan.innerHTML,
  };
  arr.push(obj); // create object to add to array
  // Convert the array to a JSON string
  let updatedJSONString = JSON.stringify(arr);
  // Store the JSON string in localStorage
  window.localStorage.setItem("scores", updatedJSONString);
}
