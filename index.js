let items = [];

const itemsDiv = document.getElementById("items")
const input = document.getElementById("itemInput")
const storageKey = "items"

function renderItems() {
    // Sort tasks by priority
    items.sort((a, b) => {
        const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    itemsDiv.innerHTML = null;

    for (const [idx, task] of Object.entries(items)) {
        const container = document.createElement("div");
        container.classList.add("task-container"); // Add task-container class

        const text = document.createElement("p");
        text.style.display = "inline";
        text.style.marginRight = "10px";
        text.innerHTML = `${task.name} - <span class="${task.priority.toLowerCase()}-priority">${task.priority}</span>: `;

        const button = document.createElement("button");
        button.textContent = "DONE";
        button.onclick = () => removeItem(idx);

        container.appendChild(text);
        container.appendChild(button);

        itemsDiv.appendChild(container);
    }
}



function loadItems() {
    const oldItems = localStorage.getItem(storageKey)
    if (oldItems) items = JSON.parse(oldItems)
    renderItems()
}

function saveItems() {
    const stringItems = JSON.stringify(items)
    localStorage.setItem(storageKey, stringItems)
}

function addItem() {
    const value = input.value;
    const priority = prioritySelect.value; 

    if (!value) {
        alert("You can't add an empty item!");
        return;
    }

    const task = {
        name: value,
        priority: priority
    };

    items.push(task);
    renderItems();
    input.value = "";
    saveItems();
}

function removeItem(idx) {
    items.splice(idx, 1)
    renderItems()
    saveItems()
}

document.addEventListener("DOMContentLoaded", loadItems)
