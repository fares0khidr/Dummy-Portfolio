interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type Filter = "all" | "active" | "completed";

let todos: Todo[] = [];
let filter: Filter = "all";
let nextId = 1;
let editingId: number | null = null;

const input = document.getElementById("input") as HTMLInputElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const list = document.getElementById("list") as HTMLUListElement;
const count = document.getElementById("count") as HTMLSpanElement;
const filterBtns = document.querySelectorAll<HTMLButtonElement>(".filter");
const clearDoneBtn = document.getElementById("clear-done") as HTMLButtonElement;
const clearAllBtn = document.getElementById("clear-all") as HTMLButtonElement;

function addTodo(): void {
  const text = input.value.trim();
  if (text === "") return;
  todos.push({ id: nextId++, text: text, done: false });
  input.value = "";
  render();
}

function render(): void {
  list.innerHTML = "";

  const shown = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  shown.forEach((t) => {
    const li = document.createElement("li");

    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = t.done;
    box.addEventListener("change", () => {
      t.done = box.checked;
      render();
    });
    li.appendChild(box);

    if (editingId === t.id) {
      const editBox = document.createElement("input");
      editBox.type = "text";
      editBox.value = t.text;
      editBox.className = "edit";
      editBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && editBox.value.trim() !== "") {
          t.text = editBox.value.trim();
          editingId = null;
          render();
        }
      });
      li.appendChild(editBox);
      setTimeout(() => editBox.focus(), 0);
    } else {
      const span = document.createElement("span");
      span.textContent = t.text;
      if (t.done) span.className = "done";
      span.addEventListener("dblclick", () => {
        editingId = t.id;
        render();
      });
      li.appendChild(span);
    }

    const del = document.createElement("button");
    del.textContent = "🗑";
    del.className = "del";
    del.addEventListener("click", () => {
      todos = todos.filter((x) => x.id !== t.id);
      render();
    });
    li.appendChild(del);

    list.appendChild(li);
  });

  const left = todos.filter((t) => !t.done).length;
  count.textContent = left + " items left";

  filterBtns.forEach((b) => {
    b.classList.toggle("active", b.dataset.filter === filter);
  });
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

filterBtns.forEach((b) => {
  b.addEventListener("click", () => {
    filter = b.dataset.filter as Filter;
    render();
  });
});

clearDoneBtn.addEventListener("click", () => {
  todos = todos.filter((t) => !t.done);
  render();
});

clearAllBtn.addEventListener("click", () => {
  todos = [];
  render();
});

render();
