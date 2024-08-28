//Select Elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let btn_submit = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

fetchDataAnd();

async function fetchDataAnd() {
  const questions = await fetchData();
  let qCount = questions.length;
  SetCountAndBullets(questions);
  addQuestions(questions[currentIndex], qCount);
  // Start CountDown
  countdown(5, qCount);
  btn_submit.onclick = () => {
    let right_answer = questions[currentIndex]["right_answer"];
    currentIndex++;
    checkAnswer(right_answer);
    quizArea.innerHTML = "";
    answersArea.innerHTML = "";
    addQuestions(questions[currentIndex], qCount);
    setActiveBullet(currentIndex);
    // Start CountDown
    clearInterval(countdownInterval);
    countdown(5, qCount);
    // Show Results
    showResults(qCount);
  };
}

async function fetchData() {
  let questions;
  try {
    const response = await fetch(
      "https://api.json-generator.com/templates/AZJTOjkgYMnx/data?access_token=x3bg40xi3ycgfn1w7oqcekl3pqlsm1nf4aj38qf6"
    );
    questions = await response.json();
  } catch (error) {
    console.log(Error("Error in Fetching Data", error));
  }
  return questions;
}

function SetCountAndBullets(questions) {
  //set count of question in Top
  countSpan.innerHTML = `${questions.length}`;
  //create spans of bullets
  questions.forEach((question, i) => {
    let span = document.createElement("span");
    //check if this sapn is first or not
    if (i === 0) {
      span.classList.add("on");
    }
    bulletsSpanContainer.appendChild(span);
  });
}

//set class on to currentBullet of Question
function setActiveBullet(currentQuestion) {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  bulletsSpans.forEach((e, i) => {
    if (i === currentQuestion) {
      e.classList.add("on");
    }
  });
}

//Add Questions and Answers in Screen
function addQuestions(currentQuestion, count) {
  if (currentIndex < count) {
    // Create and Add Question in Screen
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(`${currentQuestion["title"]} ?`);
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);

    // Create and Add The Answers in Screen
    for (let i = 1; i <= 4; i++) {
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";
      // Create Input and their attributes
      let radioInput = document.createElement("input");
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = currentQuestion[`answer_${i}`];
      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }
      // Create Labels and their attributes
      let theLabel = document.createElement("label");
      theLabel.htmlFor = `answer_${i}`;
      let theLabelText = document.createTextNode(
        currentQuestion[`answer_${i}`]
      );
      // Append Answers
      theLabel.appendChild(theLabelText);
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);
      answersArea.appendChild(mainDiv);
    }
  }
}
function checkAnswer(rAnswer) {
  let answers = document.querySelectorAll(".answer");
  answers.forEach((answer) => {
    const inputAnswer = answer.querySelector('input[type="radio"]');
    if (inputAnswer.checked) {
      const labelAnswer = answer.querySelector(
        `label[for="${inputAnswer.id}"]`
      );
      if (labelAnswer.textContent === rAnswer) {
        rightAnswers++;
        console.log(rightAnswers);
      }
    }
  });
}

function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    btn_submit.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    } else if (rightAnswers === count) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
  }
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      countdownElement.innerHTML = `${minutes}:${seconds}`;
      if (--duration < 0) {
        clearInterval(countdownInterval);
        btn_submit.click();
      }
    }, 1000);
  }
}
