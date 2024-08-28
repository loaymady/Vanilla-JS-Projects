let lis = document.querySelectorAll("ul li");
let allimgs = [...document.images];
let gallery = document.querySelector(".gallery");

lis.forEach((li) => {
  li.addEventListener("click", (event) => {
    removeActive(event);
    filterImages(event);
  });
});

function removeActive(event) {
  lis.forEach((el) => {
    el.classList.remove("active");
  });
  event.target.classList.add("active");
}

function filterImages(event) {
  let dataTarget = event.target.dataset.cat;

  allimgs.forEach((img) => {
    img.style.display = "none";
  });

  if (dataTarget === ".all") {
    allimgs.forEach((img) => {
      img.style.display = "block";
    });
  } else {
    document.querySelectorAll(dataTarget).forEach((e) => {
      e.style.display = "block";
    });
  }
}
