document.getElementById("submit-btn").onclick = (event) => {
    let form = document.getElementById("create");
    let sticky = document.createElement("DIV");
    sticky.classList.add("note");
    
    let title = document.createElement("H3");
    title.innerHTML = form.elements[0].value;
    let date = document.createElement("P");
    date.innerHTML = form.elements[1].value;
    let button = document.createElement("BUTTON");
    button.innerHTML = "aaa";
    
    sticky.appendChild(title);
    sticky.appendChild(date);
    sticky.appendChild(button);
    
    document.getElementById("stickies").appendChild(sticky);
    form.elements[0].value = "";
    form.elements[1].value = "";
    event.preventDefault();

    sticky.style.backgroundColor = "lightgoldenrodyellow";
    sticky.style.backgroundImage = "linear-gradient(to bottom right, " + sticky.style.backgroundColor + ", white)";

    var draggableStickies = document.getElementsByClassName("note");
    for (var i = 0; i < draggableStickies.length; i++) {
        dragElement(draggableStickies[i]);
    }
};

document.getElementById("view-form-btn").onclick = () => {
    let btn = document.getElementById("view-form-btn");
    let form = document.getElementById("create");   
    
    if (form.style.display === "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }

    let formContainer = document.getElementById("form-container");
    if (!formContainer.style.backgroundImage) {
        formContainer.style.backgroundImage = 'url("./stick.png")';
    } else {
        formContainer.style.backgroundImage = "";
    }
};

//function close(elmnt){
//    elmnt.remove();
//}

function thisprints(){
    console.log("i print");
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
      console.log("this happened");
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

document.getElementById("submit-btn").onclick = createNew;
