// Main Variables
let theInput = document.querySelector(".get-repos input"),
  dotted = document.querySelector(".dotted-loader"),
  getButton = document.querySelector(".get-button"),
  reposData = document.querySelector(".show-data");

getButton.addEventListener("click", async () => {
  if (!isValidUsername(theInput.value)) {
    reposData.innerHTML = "<span>Please enter a valid GitHub username.</span>";
    return;
  } else {
    dotted.style.display = "block";
  }
  try {
    let data = await fetchData();
    setTimeout(() => {
      // reset the display style
      dotted.style.display = "none";
      // Display the generated data
      createRepos(data);
    }, 500);
  } catch (error) {
    console.error("An error occurred:", error);
    reposData.innerHTML =
      "<span>Error fetching data. Please try again later.</span>";
  }
});

async function fetchData() {
  try {
    let data;
    reposData.innerHTML = "Loading....";
    let response = await fetch(
      `https://api.github.com/users/${theInput.value}/repos`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch repositories. Status: ${response.status}`
      );
    }
    data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Input Validation
function isValidUsername(username) {
  return username.trim() !== "";
}

// Create Repos
function createRepos(data) {
  // Empty The Container
  reposData.innerHTML = "";
  data.forEach((repo) => {
    let mainDiv = document.createElement("div");
    // Create Repo_Name
    let repoName = document.createElement("div");
    repoName.textContent = repo.name;
    mainDiv.appendChild(repoName);
    let childDiv = document.createElement("div");
    // Create Stars and Append
    let starsSpan = document.createElement("span");
    let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
    starsSpan.appendChild(starsText);
    childDiv.appendChild(starsSpan);
    // Create Url and Append
    let theUrl = document.createElement("a");
    let theUrlText = document.createTextNode("Visit");
    theUrl.appendChild(theUrlText);
    theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
    theUrl.setAttribute("target", "_blank");
    childDiv.appendChild(theUrl);
    mainDiv.appendChild(childDiv);
    mainDiv.className = "repo-box";
    // Append Main Div To Container
    reposData.appendChild(mainDiv);
  });
}
