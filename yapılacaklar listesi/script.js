let taskList = document.getElementById('taskList');

// Yeni görev ekleme fonksiyonu
function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Lütfen bir görev girin.");
        return;
    }

    // Yeni liste öğesi oluştur
    let listItem = document.createElement('li');
    listItem.innerHTML = `
        ${taskText}
        <button onclick="deleteTask(this)">sil</button>
    `;

    // Listeye yeni görevi ekle
    taskList.appendChild(listItem);

    // Giriş alanını temizle
    taskInput.value = '';

    // Görevi ayrı bir sayfada sakla
    saveTask(taskText);
}

// Görev silme fonksiyonu
function deleteTask(button) {
    let taskItem = button.parentElement;
    let taskText = taskItem.textContent.trim();

    // Silme işlemi
    taskList.removeChild(taskItem);

    // Silinen görevi localStorage'tan sil
    deleteTaskFromStorage(taskText);
}

// Görevi localStorage'a kaydetme
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Görevi localStorage'tan silme
function deleteTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Sayfa yüklendiğinde görevleri yükleme
document.addEventListener('DOMContentLoaded', loadTasks);

// Kayıtlı görevleri yükleme fonksiyonu
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            ${taskText}
            <button onclick="deleteTask(this)">görevi geri al</button>
        `;
        taskList.appendChild(listItem);
    });
}
