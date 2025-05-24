import { loadTasks, saveTask, updateTasks, deleteTask, clearTasks } from './storage.js';
import { debounce, throttle } from './utils.js';

export function renderTasks(tasks) {
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}" data-id="${task.id}">${task.text}</span>
      <div>
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}" />
        <button data-id="${task.id}" class="delete">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

export function setupEventListeners() {
  document.getElementById('add-task-btn').addEventListener('click', () => {
    const input = document.getElementById('task-input');
    const task = { id: Date.now(), text: input.value, completed: false };
    saveTask(task);
    renderTasks(loadTasks());
    input.value = '';
  });

  document.getElementById('task-list').addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (e.target.classList.contains('delete')) {
      deleteTask(id);
    } else if (e.target.type === 'checkbox') {
      const tasks = loadTasks().map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      updateTasks(tasks);
    }
    renderTasks(loadTasks());
  });

  document.getElementById('search-input').addEventListener('input', debounce(e => {
    const query = e.target.value.toLowerCase();
    const filtered = loadTasks().filter(task => task.text.toLowerCase().includes(query));
    renderTasks(filtered);
  }, 300));

  document.getElementById('clear-all').addEventListener('click', () => {
    clearTasks();
    renderTasks([]);
  });

  window.addEventListener('scroll', throttle(() => {
    const btn = document.getElementById('back-to-top');
    if (window.scrollY > 200) btn.classList.remove('hidden');
    else btn.classList.add('hidden');
  }, 200));

  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
