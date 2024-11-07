interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todos: Todo[] = [];
let todoId = 0;

const newTodoInput = document.getElementById("new-todo") as HTMLInputElement;
const addTodoButton = document.getElementById("add-todo") as HTMLButtonElement;
const todoTableBody = document.getElementById("todo-list") as HTMLTableSectionElement;


const addTodo = () => {
  const text = newTodoInput.value.trim();
  if (text === "") return;

  const todo: Todo = {
    id: todoId++,
    text,
    completed: false,
  };

  todos.push(todo);
  newTodoInput.value = "";
  renderTodos();
};


const deleteTodo = (id: number) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodos();
  }
};


const toggleTodo = (id: number) => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
};


const renderTodos = () => {
  todoTableBody.innerHTML = "";
  todos.forEach(todo => {
    const row = document.createElement("tr");
    row.className = `todo-item ${todo.completed ? "completed" : ""}`;

    const taskCell = document.createElement("td");
    taskCell.textContent = todo.text;
    taskCell.onclick = () => toggleTodo(todo.id); 

    const actionsCell = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "action-button delete";
    deleteButton.onclick = () => deleteTodo(todo.id);

    actionsCell.appendChild(deleteButton);
    row.appendChild(taskCell);
    row.appendChild(actionsCell);
    todoTableBody.appendChild(row);
  });
};


addTodoButton.addEventListener("click", addTodo);
newTodoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});
