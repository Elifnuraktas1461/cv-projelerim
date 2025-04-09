document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.textContent = taskInput.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.backgroundColor = '#f44336';
        deleteButton.style.color = '#fff';
        deleteButton.style.border = 'none';
        deleteButton.style.padding = '5px 10px';
        deleteButton.style.borderRadius = '4px';
        deleteButton.style.cursor = 'pointer';

        deleteButton.addEventListener('click', function() {
            taskList.removeChild(newTask);
        });

        newTask.appendChild(deleteButton);
        taskList.appendChild(newTask);

        taskInput.value = '';
    }
});
