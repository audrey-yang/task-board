tasks = []
for (let i = 0; i < tasks.length; i++) {
    document.getElementById("stickies").appendChild(tasks[i]);
}

function createNew(event) {
    let form = document.getElementById("create");
    let sticky = document.createElement("DIV");
    sticky.classList.add("note");
    
    let title = document.createElement("H3");
    title.innerHTML = form.elements[0].value;
    let date = document.createElement("P");
    date.innerHTML = form.elements[1].value;
    
    sticky.appendChild(title);
    sticky.appendChild(date);
    
    document.getElementById("stickies").appendChild(sticky);
    tasks.push(sticky)
    form.elements[0].value = "";
    form.elements[1].value = "";
    event.preventDefault();
    alert(tasks)
}

document.getElementById("submit-btn").onclick = createNew;