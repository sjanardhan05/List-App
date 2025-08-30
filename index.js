// Variables
const addTask = document.getElementById('add-task');
const taskContainer = document.getElementById('task-container');
const inputTask = document.getElementById('input-task');

// Load tasks from localStorage on page load
window.addEventListener("load", () => {
    taskContainer.innerHTML = localStorage.getItem("tasks") || "";
    restoreTaskEvents(); // re-attach event listeners
});

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", taskContainer.innerHTML);
}

// Function to attach event listeners to check & delete buttons
function restoreTaskEvents() {
    const checkButtons = document.querySelectorAll(".checkTask");
    const deleteButtons = document.querySelectorAll(".deleteTask");

    checkButtons.forEach((checkButton) => {
        checkButton.addEventListener("click", function () {
            checkButton.parentElement.style.textDecoration = "line-through";
            saveTasks();
        });
    });

    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", function (e) {
            e.target.closest(".task").remove();
            saveTasks();
        });
    });
}

// Event Listener for add button
addTask.addEventListener("click", function () {
    if (inputTask.value === "") {
        alert("Please Enter a Task");
    } else {
        let task = document.createElement("div");
        task.classList.add("task");

        let li = document.createElement("li");
        li.innerText = `${inputTask.value}`;
        task.appendChild(li);

        let checkButton = document.createElement("button");
        checkButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
        checkButton.classList.add("checkTask");
        task.appendChild(checkButton);

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        deleteButton.classList.add("deleteTask");
        task.appendChild(deleteButton);

        taskContainer.appendChild(task);

        // Re-attach event listeners for new task
        restoreTaskEvents();

        // Save tasks to localStorage
        saveTasks();

        inputTask.value = "";
    }
});
