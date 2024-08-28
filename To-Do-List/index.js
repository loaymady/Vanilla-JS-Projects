let tasks = document.querySelector(".tasks"),
  input = document.querySelector(".input"),
  add = document.querySelector(".add"),
  existingJSONString = window.localStorage.getItem("tasks");
// if found > convert this to array
arr = existingJSONString ? JSON.parse(existingJSONString) : [];

function createAndAdd() {
  if (input.value !== "") {
    let id = Math.floor(Math.random() * 1e15); //create Random id
    let title = input.value; // create title
    let obj = { id: id, title: title, completed: false }; // create object to add to array
    addTask(obj);
    input.value = "";
    arr.push(obj);
    // Convert the array to a JSON string
    let updatedJSONString = JSON.stringify(arr);
    // Store the JSON string in localStorage
    window.localStorage.setItem("tasks", updatedJSONString);
  } else {
    window.alert("The Field is Empty");
  }
}

add.onclick = () => {
  //check if field input is empty or not
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].title.toLowerCase() === input.value.toLowerCase()) {
        window.alert("This Task already Created , Please Change it");
        return;
      }
    }
  }
  //create Obj and Add to localstorage
  createAndAdd();
};

// Add Data from local storage(if founded) When Reload The page
if (arr.length > 0) {
  arr.forEach((e) => {
    addTask(e);
  });
}

//For buuton Delete
document.addEventListener("click", function (e) {
  if (e.target.className === "btn") {
    arr = arr.filter((item) => item.id !== Number(e.target.parentElement.id));
    // Convert the array to a JSON string
    let updatedJSONString = JSON.stringify(arr);
    // Store the JSON string in localStorage
    window.localStorage.setItem("tasks", updatedJSONString);
    e.target.parentElement.remove();
  }
});

//Function For add task to body
function addTask(object) {
  let task = document.createElement("div");
  let div = document.createElement("div");
  let btn = document.createElement("button");
  btn.innerHTML = "Delete";
  btn.classList = "btn";
  task.classList = "task";
  task.id = object.id;
  div.innerHTML = object.title;
  task.appendChild(div);
  task.appendChild(btn);
  tasks.appendChild(task);
}

//for set done and completed or not
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    arr.forEach((objel) => {
      if (objel.id == e.target.id) {
        objel.completed === false
          ? (objel.completed = true)
          : (objel.completed = false);
        // Convert the array to a JSON string
        let updatedJSONString = JSON.stringify(arr);
        // Store the JSON string in localStorage
        window.localStorage.setItem("tasks", updatedJSONString);
      }
    });
  }
});
