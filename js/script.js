const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const filterBtn = document.getElementById('filterBtn');

let todos = [];

function renderTodos(list = todos) {
    todoList.innerHTML = '';
    if (list.length === 0) {
        todoList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
        return;
    }

    list.forEach((todo, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${todo.task}</td>
        <td>${todo.date}</td>
        <td class="${todo.completed ? 'text-success' : 'text-warning'}">
        ${todo.completed ? '<b>Done</b>' : '<b>Pending</b>'}
        </td>
        <td class="actions">
            <button class="complete" onclick="toggleComplete(${index})">✓</button>
            <button class="delete" onclick="deleteTodo(${index})">✗</button>
            </td>
        `;
        todoList.appendChild(row);
    });
}

addBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
        alert('Please enter a task and due date!');
        return;
    }
    todos.push({task, date, completed: false});
    taskInput.value = '';
    dateInput.value = '';
    renderTodos();
});

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

deleteAllBtn.addEventListener('click', () => {
    if (!todos.length) {
        alert('No tasks to delete!');
        return;
    }
    if (confirm('Delete all tasks?')) {
        todos = [];
        renderTodos();
    }
});

filterBtn.addEventListener('click', () => {
    const filterInput = document.getElementById('filterInput');
    const keyword = filterInput.value.trim().toLowerCase();
    if (!keyword) {
        alert('Please enter a task name to filter!');
        return;
    }
    const filtered = todos.filter((todo) => todo.task.toLowerCase().includes(keyword));
    renderTodos(filtered);
});

renderTodos();
