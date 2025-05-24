import { loadTasks, saveTask, deleteTask, clearTasks } from './storage.js';
import { renderTasks, setupEventListeners } from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
  renderTasks(loadTasks());
  setupEventListeners();
});
