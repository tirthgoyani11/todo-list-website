/* main.js - JavaScript file that handles all the interactive functionality for the Todo List application
 * Including adding, deleting, toggling tasks, and updating statistics */

// Todo List App JavaScript
let todos = [];
let todoIdCounter = 1;

// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Functions
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const todo = {
        id: todoIdCounter++,
        text: todoText,
        completed: false
    };
    
    todos.push(todo);
    todoInput.value = '';
    renderTodos();
    updateStats();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
    updateStats();
}

function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        updateStats();
    }
}

function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        
        todoList.appendChild(li);
    });
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    
    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderTodos();
    updateStats();
});
