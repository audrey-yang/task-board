document.getElementById("submit-task-btn").onclick = (event) => {
    let form = document.getElementById("create-task");
    
    //Creates new div item representing the sticky note
    let sticky = document.createElement("DIV");
    sticky.classList.add("note");
    
    let title = document.createElement("H3");
    title.innerHTML = form.elements[0].value;
    let date = document.createElement("P");
    date.innerHTML = form.elements[1].value;
    let button = document.createElement("BUTTON");
    button.classList.add("close-btn");
    button.innerHTML = "x";
    
    sticky.appendChild(title);
    sticky.appendChild(date);
    sticky.appendChild(button);
    
    getSetColor(sticky, "color");
    
    document.getElementById("stickies").appendChild(sticky);
    
    button.onclick = function() {
        stickies.removeChild(sticky);
    };

    form.elements[0].value = "";
    form.elements[1].value = "";
        
    event.preventDefault();
    makeDraggable();
};


document.getElementById("submit-note-btn").onclick = () => {
    let form = document.getElementById("create-note");
    let sticky = document.createElement("DIV");
    sticky.classList.add("note");
    let text = document.createElement("P");
    text.innerHTML = form.elements[0].value;
    let button = document.createElement("BUTTON");
    button.classList.add("close-btn");
    button.innerHTML = "x";

    sticky.appendChild(text);
    sticky.appendChild(button);
    
    getSetColor(sticky, "note-color");

    document.getElementById("stickies").appendChild(sticky);

    button.onclick = function() {
        stickies.removeChild(sticky);
    };

    form.elements[0].value = "";

    event.preventDefault();
    makeDraggable();
}

document.getElementById("submit-image-btn").onclick = () => {
    let form = document.getElementById("create-image");
    let sticky = document.createElement("DIV");
    sticky.classList.add("note");
    sticky.classList.add("img-note");

    let image = document.createElement("IMG");
    image.src = URL.createObjectURL(form.elements[0].files[0]);

    let button = document.createElement("BUTTON");
    button.classList.add("close-btn");
    button.innerHTML = "x";

    sticky.appendChild(image);
    sticky.appendChild(button);

    button.onclick = function() {
        stickies.removeChild(sticky);
    };

    document.getElementById("stickies").appendChild(sticky);
    form.elements[0].value = "";

    event.preventDefault();
    makeDraggable();
}

const makeDraggable = () => {
    //Makes all sticky notes draggable
    var draggableStickies = document.getElementsByClassName("note");
    for (var i = 0; i < draggableStickies.length; i++) {
        dragElement(draggableStickies[i]);
    }
}
 
const getSetColor = (sticky, name) => {
    //Sets the color to which ever radio button is checked
    let color, ind;
    let btns = document.getElementsByName(name);
    for(let i = 0;i < btns.length;i++) {
        if (btns[i].checked) {
            color = btns[i].value;
            ind = i;
        }
    }

    sticky.style.backgroundColor = color;
    sticky.style.backgroundImage = "linear-gradient(to bottom right, " + color + ", white)";

    //Unchecks all radio buttons except for current
    for(let i = 1; i < btns.length; i++) {
      btns[i].checked = false;
    }
    btns[ind].checked = true;
}

/* View Form */
document.getElementById("view-task-form-btn").onclick = () => {
    let form = document.getElementById("create-task");   
    let formContainer = document.getElementById("task-form-container");
    viewForm(form , formContainer);
};

//function close(elmnt){
//    elmnt.remove();
//}

function thisprints(){
    console.log("i print");
}

document.getElementById("view-note-form-btn").onclick = () => {
  let form = document.getElementById("create-note");   
  let formContainer = document.getElementById("note-form-container");
  viewForm(form , formContainer);
};

document.getElementById("view-image-form-btn").onclick = () => {
  let form = document.getElementById("create-image");   
  let formContainer = document.getElementById("image-form-container");
  viewForm(form , formContainer);
};

const viewForm = (form, formContainer) => {
  if (form.style.display === "block") {
      form.style.display = "none";
  } else {
      form.style.display = "block";
  }

  if (!formContainer.style.backgroundColor) {
      formContainer.style.backgroundColor = "floralwhite";
      formContainer.style.border = "solid 1px wheat";
  } else {
      formContainer.style.backgroundColor = "";
      formContainer.style.border = "none";
  }
}

/* Dragging notes */
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

document.getElementById("background-change-btn").onclick = () => {
    let btn = document.getElementById("background-change-btn");
    if (btn.innerHTML === "Poster") {
        document.body.style.background = "none";
        btn.innerHTML = "Corkboard";
    } else {
        document.body.style.backgroundImage = "url(board.jpg)";
        btn.innerHTML = "Poster";
    }
}