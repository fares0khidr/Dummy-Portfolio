"use strict";
let todos = [];
let filter = "all";
let nextId = 1;
let editingId = null;
const input = document.getElementById("input");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");
const count = document.getElementById("count");
const filterBtns = document.querySelectorAll(".filter");
const clearDoneBtn = document.getElementById("clear-done");
const clearAllBtn = document.getElementById("clear-all");
function addTodo() {
    const text = input.value.trim();
    if (text === "")
        return;
    todos.push({ id: nextId++, text: text, done: false });
    input.value = "";
    render();
}
function render() {
    list.innerHTML = "";
    const shown = todos.filter((t) => {
        if (filter === "active")
            return !t.done;
        if (filter === "completed")
            return t.done;
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
        }
        else {
            const span = document.createElement("span");
            span.textContent = t.text;
            if (t.done)
                span.className = "done";
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
    if (e.key === "Enter")
        addTodo();
});
filterBtns.forEach((b) => {
    b.addEventListener("click", () => {
        filter = b.dataset.filter;
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
