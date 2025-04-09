document.addEventListener("DOMContentLoaded", () => {
    let tasks = document.querySelectorAll(".task");
    let columns = document.querySelectorAll(".column");
    let addTaskButtons = document.querySelectorAll(".addTaskBtn");
    let darkModeToggle = document.getElementById("darkModeToggle");

    tasks.forEach(task => {
        task.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", task.innerHTML);
            setTimeout(() => task.style.display = "none", 0);
        });

        task.addEventListener("dragend", (e) => {
            task.style.display = "block";
        });
    });

    columns.forEach(column => {
        column.addEventListener("dragover", (e) => {
            e.preventDefault();
            column.classList.add("drag-over");
        });

        column.addEventListener("dragleave", () => {
            column.classList.remove("drag-over");
        });

        column.addEventListener("drop", (e) => {
            e.preventDefault();
            let data = e.dataTransfer.getData("text/plain");
            let newTask = document.createElement("div");
            newTask.className = "task";
            newTask.draggable = true;
            newTask.innerHTML = data;
            newTask.style.background = "#55efc4"; 
            column.appendChild(newTask);
            column.classList.remove("drag-over");

            newTask.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", newTask.innerHTML);
                setTimeout(() => newTask.style.display = "none", 0);
            });

            newTask.addEventListener("dragend", (e) => {
                newTask.style.display = "block";
            });

            showNotification("Yeni görev eklendi!", "success");
        });
    });

    
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });


    addTaskButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            let taskText = prompt("Görev adını girin:");
            if (taskText) {
                let newTask = document.createElement("div");
                newTask.className = "task";
                newTask.draggable = true;
                newTask.innerHTML = taskText;
                newTask.style.background = "#fdcb6e";  
                e.target.parentElement.appendChild(newTask);
                showNotification("Yeni görev oluşturuldu!", "info");
                
                newTask.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("text/plain", newTask.innerHTML);
                    setTimeout(() => newTask.style.display = "none", 0);
                });

                newTask.addEventListener("dragend", (e) => {
                    newTask.style.display = "block";
                });
            }
        });
    });

 
    function showNotification(message, type) {
        let notification = document.createElement("div");
        notification.className = `notification ${type}`;
        notification.innerText = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});
