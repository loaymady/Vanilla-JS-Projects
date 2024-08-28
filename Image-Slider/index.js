let arrOfImgs = [...document.querySelectorAll(".slider-container img")],
  indicators = document.querySelector(".indicators"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  slideNumber = document.querySelector(".slide-number"),
  currentIndexImg = 1;

//create indicators
let ul = document.createElement("ul");
arrOfImgs.forEach((_, index) => {
  let li = document.createElement("li");
  li.textContent = index + 1;
  li.setAttribute("data-index", index + 1);
  if (index == 0) {
    li.classList.add("active");
  }
  ul.appendChild(li);
});
indicators.appendChild(ul);

//Add class disabled
function checkBtn() {
  if (currentIndexImg === 1) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }

  if (currentIndexImg === arrOfImgs.length) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
}
checkBtn();

let lis = [...document.querySelectorAll("ul li")];

//change img and add active to bullet
function changImg(currentImg) {
  arrOfImgs.forEach((e, index) => {
    e.classList.remove("active");
    if (index + 1 == currentImg) {
      e.classList.add("active");
      lis.forEach((e, i) => {
        e.classList.remove("active");
        if (i == index) {
          e.classList.add("active");
        }
      });
    }
  });
}

//when click at next or previous
document.addEventListener("click", (e) => {
  if (e.target.className == "prev") {
    if (currentIndexImg > 1) {
      currentIndexImg--;
      changImg(currentIndexImg);
      checkBtn();
      slideNumber.textContent = `Slide #${currentIndexImg}`;
    }
  } else if (e.target.className == "next") {
    if (currentIndexImg >= 1 && currentIndexImg < arrOfImgs.length) {
      currentIndexImg++;
      changImg(currentIndexImg);
      checkBtn();
      slideNumber.textContent = `Slide #${currentIndexImg}`;
    }
  }
});

//when click in bullet (li)
lis.forEach((e) => {
  e.addEventListener("click", function () {
    lis.forEach((e) => e.classList.remove("active"));
    e.classList.add("active");
    //convert dataset-index to number
    currentIndexImg = +e.dataset.index;
    changImg(currentIndexImg);
    checkBtn();
    slideNumber.textContent = `Slide #${currentIndexImg}`;
  });
});
