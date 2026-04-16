let user = localStorage.getItem("user");

if (!user) {
    window.location.href = "login.html";
}

document.getElementById("welcome").innerText = "Welcome, " + user + " 👋";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    let high = document.getElementById("highList");
    let medium = document.getElementById("mediumList");
    let low = document.getElementById("lowList");

    high.innerHTML = "";
    medium.innerHTML = "";
    low.innerHTML = "";

    let completed = 0;

    tasks.forEach((task, index) => {
        if (task.completed) completed++;

        let li = document.createElement("li");
        li.className = task.priority + (task.completed ? " completed" : "");

        li.innerHTML = `
            <div>
                <span class="task-text" onclick="toggleComplete(${index})">${task.text}</span>
                ${task.completed ? '<div class="status">✔ Completed</div>' : ''}
            </div>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        if (task.priority === "high") high.appendChild(li);
        else if (task.priority === "medium") medium.appendChild(li);
        else low.appendChild(li);
    });

    let total = tasks.length;
    let pending = total - completed;

    document.getElementById("totalTasks").innerText = total;
    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = pending;

    let progress = total === 0 ? 0 : (completed / total) * 100;
    document.getElementById("progressFill").style.width = progress + "%";

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");

    if (input.value.trim() === "") return;

    let priority = document.getElementById("priority").value;

    tasks.push({ text: input.value, priority, completed: false });

    input.value = "";
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function searchTask() {
    let search = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll("li");

    items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(search) ? "flex" : "none";
    });
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

document.getElementById("toggleMode").onclick = function () {
    document.body.classList.toggle("dark");
};

renderTasks();