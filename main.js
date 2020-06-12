function createNew(event) {
    let form = document.getElementById("create");
    let sticky = document.createElement("DIV");
    sticky.classList.add("sticky");
    
    let title = document.createElement("H3");
    title.innerHTML = form.elements[0].value;
    let date = document.createElement("P");
    date.innerHTML = form.elements[1].value;
    
    sticky.appendChild(title);
    sticky.appendChild(date);
    
    document.getElementById("stickies").appendChild(sticky);
    event.preventDefault();
}

document.getElementById("submit-btn").onclick = createNew;