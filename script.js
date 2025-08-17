document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load existing tasks
    tasks.forEach(task => {
        renderTask(task);
    });

    // Add task
    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {// atrbue set of nwe added item 
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";
    });

    // Render task in UI
    function renderTask(task) {
        let li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        li.textContent = task.text;

        // Add checked state
        if (task.completed) {
            li.classList.add("checked");
        }
         
        // Click to toggle complete 
        li.addEventListener("click", (e) => {
            if (e.target.tagName !== "span") { // Ignore delete clicks
                li.classList.toggle("checked");//When you click anywhere inside the <li> except the delete <span> (or <button>), it toggles the task's completion status.
                task.completed = li.classList.contains("checked");
                saveTasks();// save new modified task (where task completed(true))
            }
        });

        // Delete button (as <span>, matches CSS)
        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7"; // × symbol"\u00d7"
        deleteBtn.addEventListener("click", () => {
           
            tasks = tasks.filter(t => t.id !== task.id);// which task id not match with clicked task that not store in tasks arrray 
            // by this creat new tasks array that save 
            saveTasks();// new task save in local storage where deleted task not present 
            li.remove();
        });

        li.appendChild(deleteBtn);//Put the delete button inside the <li> so it shows up next to the task text.
        todoList.appendChild(li);//“Add the whole <li> (with task text and delete button) into the main todo list on the page.
    }

    // Save to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});

/*
e (short for event object) is useful when you need details about the click — like:
e.target → the exact element clicked.
e.currentTarget → the element the listener is bound to.
Mouse position (e.clientX, e.clientY).
Preventing default actions (e.preventDefault()).

Here, the delete button is already the exact element we care about.(for Delete button)
We don’t need to inspect e.target or prevent anything — we just remove the task. (so don't ned use e )


  DOMContentLoaded is like finishing the build of a house's frame. You can now walk inside and start arranging the furniture (manipulating the DOM).

load is like finishing the entire house, including all the landscaping, paintings, and appliances. Everything is ready, and the house is fully "complete."
*/
