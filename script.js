  const input = document.querySelector(".inpt");
  const list = document.querySelector("#list");

  input.addEventListener("keydown", (eve) =>{
    const li = document.createElement("li");
    if(eve.key === 'Enter' && input.value.trim() !== "")
    {
        li.textContent = input.value;

        complete(li);
        del(li);
        
        list.appendChild(li);

        saveLocal(); 

        input.value = '';

    }
});

function complete (li) {
    const btn = document.createElement("button");
    btn.textContent = "Complete";
    btn.classList.add("complete-task");

    li.append(btn);

    btn.addEventListener("click", ()=>{
        li.style.color = "green";
    });

}

function del (li){
    const btn1 = document.createElement("button");
    btn1.textContent = "Delete";
    btn1.classList.add("delete-icon");

    li.append(btn1);

    btn1.addEventListener("click", () =>{
        li.style.color = "red";
    });

}

function saveLocal () {
    const items = []; 
    document.querySelectorAll("#list li").forEach ((li) =>{
        items.push(li.textContent.replace("CompleteDelete", "").trim());
    });
    localStorage.setItem("listLi", JSON.stringify(items));

    
}



// Call the function to load the list on page load

function loadFromLocalStorage () {
    const savedItems = JSON.parse(localStorage.getItem("listLi"));
    if(savedItems)
    {
        savedItems.forEach((item) => { 
            const li = document.createElement("li");

            li.textContent = item;

            complete(li);
            del(li);   

            list.appendChild(li);

        })
    }
}

window.addEventListener("load",loadFromLocalStorage);

  