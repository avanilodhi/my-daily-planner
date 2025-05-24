const STORAGE_KEY = "daily-tasks";

export function loadTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveTask(task) {
  const tasks = loadTasks();
  tasks.push(task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function updateTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function deleteTask(id) {
  const tasks = loadTasks().filter(task => task.id !== id);
  updateTasks(tasks);
}

export function clearTasks() {
  localStorage.removeItem(STORAGE_KEY);
}
