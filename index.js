let container = document.querySelector(".container");
let displayDate = document.getElementById("date");
let userInput = document.getElementById("user-input");
let taskContainer = document.getElementById("task-list");
let form = document.querySelector("form");
let clearBtn = document.getElementById("clear-list");
let checkTask = document.querySelector(".check");
let submitData = document.querySelector(".submit");

let userData = localStorage.getItem("to-do-list")
  ? JSON.parse(localStorage.getItem("to-do-list"))
  : [{ task: "Go to the Gym", completed: false }];
console.log(userData);

let editIndex = -1;

function initializePage() {
  displayUserData();
  dateDisplay();
  userInput.focus();
  setInterval(dateDisplay, 1000);
}

window.onload = initializePage();

//Show today's current date

function dateDisplay() {
  let date = new Date();
  displayDate.innerHTML = date.toLocaleString();
}

//Get user task input

form.addEventListener("submit", (e) => {
  e.preventDefault();
  displayUserData();
});

function getUserInput() {
  if (userInput.value != "") {
    userData.push({ task: userInput.value, completed: false });
    displayUserData();
    saveToLocalStorage();
  } else {
    let errorMessage = new Error("Error: Task not entered.");
    console.log(errorMessage);
    alert("Please enter a task");
  }
}

submitData.addEventListener("click", (e) => {
  e.preventDefault();
  getUserInput();
});

//Display user task input in main container
function displayUserData() {
  taskContainer.innerHTML = "";

  for (let i = 0; i < userData.length; i++) {
    let checkClass = userData[i].completed ? "completed" : "";

    taskContainer.innerHTML += `
  <p id="task-${i}" class="${checkClass} task">${userData[i].task}<span class="btn-container"><button class="check" data-index="${i}" title="completed"><i class="fa-solid fa-check check"></i></button><button class="edit" data-index="${i}"><i class="fa-regular fa-pen-to-square" title="edit"></i></button><button class="delete" data-index="${i}" title="delete"><i class="fa-solid fa-delete-left"></i></button></span></p>
  `;
  }

  localStorageData();
  userInput.value = "";
}

taskContainer.addEventListener("click", (e) => {
  let btnElement = e.target.closest("button");
  const index = btnElement.getAttribute("data-index");

  if (btnElement && btnElement.hasAttribute("data-index")) {
    if (btnElement.classList.contains("check")) {
      completeTask(Number(index));
    } else if (btnElement.classList.contains("delete")) {
      deleteTask(Number(index));
    } else if (btnElement.classList.contains("edit")) {
      editTask(Number(index));
    } else {
      alert("Error 406: Not Acceptable");
      console.log("Error 406: Not Acceptable");
    }
  }
});

//Delete a Task

function deleteTask(index) {
  userData.splice(index, 1);
  localStorageData();
  displayUserData();
}

//Complete Task

function completeTask(index) {
  userData[index].completed = !userData[index].completed;
  localStorageData();
  displayUserData();
}

function editTask(index) {
  let taskTarget = document.getElementById(`task-${index}`);
  let value = userData[index];
  userInput.value = value.task;
  editIndex = index;
  userInput.focus();
  taskContainer.removeChild(taskTarget);
  userData.splice(index, 1);
}

//store task display
function localStorageData() {
  localStorage.setItem("to-do-list", JSON.stringify(userData));
}

//clear the list
function clearList() {
  userInput.value = "";
  taskContainer.innerHTML = "";
  userData = [];
  localStorage.clear();
  userInput.focus();
}

clearBtn.addEventListener("click", clearList);
