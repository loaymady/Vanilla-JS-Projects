/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sections = Array.from(document.getElementsByTagName("section"));
const navbarList = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Begin Main Functions
 *
 */

// build the nav

function buildListItems(sections) {
  return sections.map((section) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    // getting the text from the section's h2
    const text = document.createTextNode(section.querySelector("h2").innerText);
    a.classList.add("menu__link");
    // setting the id to use it later in making the links scroll
    a.id = section.dataset.nav;
    a.appendChild(text);
    li.appendChild(a);
    return li;
  });
}

// Add class 'active' to section when near top of viewport

function closestToTheTop() {
  sections.forEach((section) => {
    const offsetTop = section.offsetTop;
    // getting the window height
    let sectionHeight = section.offsetHeight
    // checking the closest to top and making sure it's not above the view of the client
    // if it's closest to the top and still in view we add the active class 
    // else we remove that class
    if (
      scrollY >= offsetTop - sectionHeight / 2 &&
      scrollY < offsetTop  + sectionHeight / 2
    ) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
  });
}

// Scroll to anchor ID using scrollTO event

function scrollToDataNav(e) {
  // we get the item's id from the event's target which is the anchor tag to scroll to the
  // corresponding data-nav
  const dataNav = e.target.id;
  const section = document.querySelector(`section[data-nav="${dataNav}"]`);
  section.scrollIntoView({
    behavior: "smooth",
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

const sectionItems = buildListItems(sections);

sectionItems.forEach((item) => {
  navbarList.appendChild(item);
});

// Scroll to section on link click
sectionItems.forEach((item) => item.addEventListener("click", scrollToDataNav));

// Set sections as active

window.addEventListener("scroll", closestToTheTop);

// Adding a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.
// using url: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp 

let btn = document.querySelector("button");

window.onscroll = function () {
  if (window.scrollY >= 400) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

btn.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
