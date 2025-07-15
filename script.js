const input = document.querySelector(".inpt");
const list = document.querySelector("#list");

// Add item on Enter key
input.addEventListener("keydown", (eve) => {
    if (eve.key === 'Enter' && input.value.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = input.value;

        complete(li);
        del(li);

        list.appendChild(li);

        saveLocal();
        input.value = '';
    }
});

// Mark item as completed
function complete(li) {
    const btn = document.createElement("button");
    btn.textContent = "Complete";
    btn.classList.add("complete-task");

    li.append(btn);

    btn.addEventListener("click", () => {
        li.style.color = "green";
    });
}

// Delete item from DOM and localStorage
function del(li) {
    const btn1 = document.createElement("button");
    btn1.textContent = "Delete";
    btn1.classList.add("delete-icon");

    li.append(btn1);

    btn1.addEventListener("click", () => {
        li.remove(); // Remove from DOM
        saveLocal(); // Update localStorage
    });
}

// Save all list items to localStorage
function saveLocal() {
    const items = [];
    document.querySelectorAll("#list li").forEach((li) => {
        // Remove button text from li content
        const pureText = li.firstChild.textContent.trim();
        items.push(pureText);
    });
    localStorage.setItem("listLi", JSON.stringify(items));
}

// Load items from localStorage on page load
function loadFromLocalStorage() {
    const savedItems = JSON.parse(localStorage.getItem("listLi"));
    if (savedItems) {
        savedItems.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;

            complete(li);
            del(li);

            list.appendChild(li);
        });
    }
}

// Load list when page loads
window.addEventListener("load", loadFromLocalStorage);
