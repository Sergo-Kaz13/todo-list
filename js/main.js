"use strict";

const formElement = document.getElementById("form");
const todoBoard = document.querySelector(".todo_board");

let todoData = JSON.parse(localStorage.getItem("todoData")) || [];

todoBoard.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const eId = e.target.parentElement.id;
    const removeTodoData = todoData.filter((item) => {
      const id = item.id + "";
      return id !== eId;
    });

    todoData = removeTodoData;
    localStorage.setItem("todoData", JSON.stringify(removeTodoData));

    todoBoard.innerHTML = ``;
    addItem(todoData);
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("doun-item");
  }
});

addItem(todoData);

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formElement);
  const item = formData.get("item");
  const id = Date.now();
  todoData.push({ id, item });
  localStorage.setItem("todoData", JSON.stringify(todoData));

  todoBoard.innerHTML = ``;
  addItem(todoData);
  formElement.reset();
});

function addItem(todoData) {
  todoData &&
    todoData.map((elem) => {
      const li = document.createElement("li");
      li.id = elem.id;
      const btnRemove = document.createElement("button");
      btnRemove.textContent = "X";
      li.append(elem.item, btnRemove);
      todoBoard.appendChild(li);
    });
}
