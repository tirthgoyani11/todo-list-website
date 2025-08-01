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
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
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
// Notion-style Section Logic
let sections = ['Inbox'];
let currentSection = 'Inbox';
let todos = { Inbox: [] };

function renderSidebar() {
  const sidebar = document.getElementById('sidebar-sections');
  sidebar.innerHTML = '';
  sections.forEach(section => {
    const sec = document.createElement('div');
    sec.textContent = section;
    sec.className = 'sidebar-section' + (section === currentSection ? ' active' : '');
    sec.onclick = () => { currentSection = section; renderAll(); };
    sidebar.appendChild(sec);
  });
  // Add Section Button
  const addBtn = document.createElement('button');
  addBtn.textContent = '+ New Section';
  addBtn.onclick = () => {
    const name = prompt('Enter new section/page name');
    if (name && !sections.includes(name)) {
      sections.push(name);
      todos[name] = [];
      currentSection = name;
      renderAll();
    }
  };
  sidebar.appendChild(addBtn);
}

function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos[currentSection].forEach((todo, idx) => {
    const item = document.createElement('li');
    item.className = 'todo-item' + (todo.completed ? ' completed' : '');
    item.innerHTML = `
      <span contenteditable="true" onblur="editTask(${idx}, this.innerText)">${todo.text}</span>
      ${todo.priority ? `<span class="priority-tag ${todo.priority}">${todo.priority}</span>` : ''}
      <button onclick="toggleComplete(${idx})">${todo.completed ? 'Undo' : 'Done'}</button>
      <button onclick="removeTask(${idx})">Delete</button>
    `;
    list.appendChild(item);
  });
}

function renderAll() {
  renderSidebar();
  renderTodos();
  document.getElementById('section-title').innerText = currentSection;
}
window.addEventListener('DOMContentLoaded', renderAll);

// Task CRUD
window.addTask = function() {
  const txt = document.getElementById('new-task-input').value;
  if (txt) {
    todos[currentSection].push({ text: txt, completed: false, priority: null });
    renderAll();
    document.getElementById('new-task-input').value = '';
  }
};

window.removeTask = function(idx) {
  todos[currentSection].splice(idx, 1);
  renderAll();
};

window.toggleComplete = function(idx) {
  todos[currentSection][idx].completed = !todos[currentSection][idx].completed;
  renderAll();
};

window.editTask = function(idx, txt) {
  todos[currentSection][idx].text = txt;
};

// ----- AI BUTTONS: STUBS -----
document.getElementById('btn-ai-suggest').onclick = function() {
  // Stub: Replace with actual API call
  alert("AI Suggestion: Plan tomorrow's tasks.\n(Connect API for real results!)");
};

document.getElementById('btn-ai-summarize').onclick = function() {
  // Stub: Replace with actual API call
  const completed = todos[currentSection].filter(t => t.completed).map(t => t.text);
  alert(`AI Summary:\nCompleted tasks: ${completed.length}\n${completed.join('\n')}`);
};
