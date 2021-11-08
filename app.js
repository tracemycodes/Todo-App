const UItoggle = document.querySelector(".toggle");
const UItaskInput = document.getElementById("input-task");
const UItaskField = document.querySelector(".input-field");
const UItaskIcon = document.querySelector(".checkbox");
const UItaskList = document.querySelector(".task-list");
const UIactive = document.querySelector(".active");
const UIall = document.querySelector(".all");
const UIcompleted = document.querySelector(".completed");
const UIclearAll = document.querySelector(".clearAll");
const UIlistItem = document.getElementsByTagName("li");
const UIspan = document.querySelector(".figure");

console.log(UIlistItem);

loadMyEvents();

function loadMyEvents() {
  document.addEventListener("DOMContentLoaded", getTasks);
  UItaskField.addEventListener("submit", addTask);
  UItaskList.addEventListener("click", removeTask);
  UItaskList.addEventListener("mousemove", dragListItem);
  UIactive.addEventListener("click", activeTask);
  UIall.addEventListener("click", allTask);
  UIcompleted.addEventListener("click", completedTask);
  UIclearAll.addEventListener("click", clearCompleted);
  UItoggle.addEventListener("click", darkMode);
}

function getTasks(e) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const UIul = document.querySelector(".task-list");

    const UIli = document.createElement("li");
    UIli.className = "list-item";
    // UIli.classList.add('draggable')
    UIli.setAttribute("draggable", "true");

    const UIcheck = document.createElement("div");
    UIcheck.className = "checkbox-div";

    const UIcheckIcon = document.createElement("img");
    UIcheckIcon.className = "checkbox";
    UIcheckIcon.setAttribute("src", "./images/icon-check.svg");

    const UItaskText = document.createElement("p");
    UItaskText.className = "task-text";
    UItaskText.textContent = task;

    const UIcloseIcon = document.createElement("img");
    UIcloseIcon.className = "close-icon";
    UIcloseIcon.setAttribute("src", "./images/icon-cross.svg");

    UIcheck.appendChild(UIcheckIcon);
    UIli.appendChild(UIcheck);
    UIli.appendChild(UItaskText);
    UIli.appendChild(UIcloseIcon);
    UIul.appendChild(UIli);
  });

  activeNum();
  e.preventDefault();
};

function addTask(e) {
  if (UItaskInput.value === "") {
    return alert("Fill in a valid task");
  }

  const UIul = document.querySelector(".task-list");

  const UIli = document.createElement("li");
  UIli.className = "list-item";
  // UIli.classList.add('draggable')
  UIli.setAttribute("draggable", "true");

  const UIcheck = document.createElement("div");
  UIcheck.className = "checkbox-div";

  const UIcheckIcon = document.createElement("img");
  UIcheckIcon.className = "checkbox";
  UIcheckIcon.setAttribute("src", "./images/icon-check.svg");

  const UItaskText = document.createElement("p");
  UItaskText.className = "task-text";
  UItaskText.textContent = UItaskInput.value;

  const UIcloseIcon = document.createElement("img");
  UIcloseIcon.className = "close-icon";
  UIcloseIcon.setAttribute("src", "./images/icon-cross.svg");

  UIcheck.appendChild(UIcheckIcon);
  UIli.appendChild(UIcheck);
  UIli.appendChild(UItaskText);
  UIli.appendChild(UIcloseIcon);
  UIul.appendChild(UIli);

  addEventsDragAndDrop(UIli);
  activeNum();
  addToLocalStorage();
  e.preventDefault();
  console.log(UIli);
};

const addToLocalStorage = () => {
  const task = UItaskInput.value;

  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  alert("Task saved successfully");
};

activeNum();

function removeTask(e) {
  if (e.target.classList.contains("close-icon")) {
    if (confirm("You are about to delete a task")) {
      e.target.parentElement.remove();
      removeFromLocalStorage(e.target.parentElement);
    }
  }

  if (e.target.classList.contains("checkbox-div")) {
 
    if (document.body.className.includes("dark")) {
      e.target.lastElementChild.style.display = "flex";
      e.target.parentElement.classList.add("striked");
      e.target.parentElement.children[1].setAttribute(
        "style",
        "text-decoration: line-through;color: hsl(233, 14%, 35%);"
      );
    } else {
      e.target.lastElementChild.style.display = "flex";
      e.target.parentElement.classList.add("striked");
      e.target.parentElement.children[1].setAttribute(
        "style",
        "text-decoration: line-through;color: hsl(236, 33%, 92%);"
        );
    }

  } else if (e.target.classList.contains("checkbox")) {

    if (document.body.className.includes("dark")) {
      e.target.style.display = "none";
      e.target.parentElement.parentElement.classList.remove("striked");
      e.target.parentElement.parentElement.children[1].setAttribute(
        "style",
        "text-decoration: none;color: hsl(236, 33%, 92%);"
        );
      } else {
      e.target.style.display = "none";
      e.target.parentElement.parentElement.classList.remove("striked");
      e.target.parentElement.parentElement.children[1].setAttribute(
        "style",
        "text-decoration: none;color: hsl(233, 14%, 35%);"
        );
      }
  
  }
  activeNum();

  e.preventDefault();
};

const removeFromLocalStorage = (taskItem) => {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

function activeTask(e) {
  let myList = document.querySelectorAll(".list-item");

  myList.forEach(function (task) {
    if (task.classList.contains("striked")) {
      task.style.display = "none";
    } else {
      task.style.display = "flex";
    }
  });
};

function activeNum() {
  let UIfigure = document.querySelector(".figure");
  let myList = document.querySelectorAll(".list-item");
  let taskArr = [];

  myList.forEach(function (task) {
    if (!task.classList.contains("striked")) {
      taskArr.push(task);
    }
  });

  UIfigure.textContent = taskArr.length;
};

function completedTask(e) {
  let myList = document.querySelectorAll(".list-item");

  myList.forEach(function (task) {
    if (task.className.includes("striked") == false) {
      task.style.display = "none";
      console.log(task);
    } else {
      task.style.display = "flex";
    }
  });

  e.preventDefault();
};

function allTask(e) {
  let myList = document.querySelectorAll(".list-item");

  myList.forEach(function (task) {
    if (task.classList.contains("list-item")) {
      task.style.display = "flex";
    }
  });

  e.preventDefault();
};

function clearCompleted(e) {
  let myList = document.querySelectorAll(".list-item");

  if (confirm("Are you sure you want to clear all completed task")) {
    myList.forEach((task) => {
      if (task.classList.contains("striked")) {
        task.remove();
        clearLocalStorage(task);
      }
    });
    allTask(e);
  };

  e.preventDefault();
};

const clearLocalStorage = (items) => {
  console.log(items);
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (items.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

function addEventsDragAndDrop(el) {
  el.addEventListener("dragstart", dragStart, false);
  el.addEventListener("dragenter", dragEnter, false);
  el.addEventListener("dragover", dragOver, false);
  el.addEventListener("dragleave", dragLeave, false);
  el.addEventListener("drop", dragDrop, false);
  el.addEventListener("dragend", dragEnd, false);
};

function dragListItem(e) {
  var listItems = document.querySelectorAll(".list-item");
  [].forEach.call(listItems, function (item) {
    addEventsDragAndDrop(item);
  });

  e.preventDefault();
};

function dragStart(e) {
  this.style.opacity = "0.1";
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);

  e.preventDefault();
};

function dragEnter(e) {
  this.classList.add("over");

  e.preventDefault();
};

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove("over");

  e.preventDefault();
};

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;

  e.preventDefault();
};

function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;

  e.preventDefault();
};

function dragEnd(e) {
  var listItems = document.querySelectorAll(".draggable");
  [].forEach.call(listItems, function (item) {
    item.classList.remove("over");
  });
  this.style.opacity = "1";

  e.preventDefault();
};

function darkMode (e) {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");


  if (document.body.className.includes("dark")) {
    e.target.setAttribute("src", "./images/icon-moon.svg");
  } else {
    e.target.setAttribute("src", "./images/icon-sun.svg");
  };

  e.preventDefault();
};
