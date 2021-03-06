let dt = new Date();
document.getElementById("date").innerHTML = 
    `Today: ${formatDate(dt).substring(0, formatDate(dt).length - 5)}`;
  
document.getElementById("view-date-btn").onclick = () => {
    let btn = document.getElementById("view-date-btn");
    let date = document.getElementById("date-container");
    btn.classList.toggle("active");
    if (date.style.display === "block") {
        date.style.display = "none";
    } else {
      date.style.display = "block";
    }

    dragElement(document.getElementById("date-container"), document.getElementById("date-container"));
}

document.getElementById("submit-task-btn").onclick = (event) => {
    let form = document.getElementById("create-task");
    
    //Creates new div item representing the sticky note
    let sticky = document.createElement("DIV");
    sticky.classList.add("note");
    
    let title = document.createElement("H3");
    title.innerHTML = form.elements[0].value;
    
    let descrip = document.createElement("H5");
    descrip.innerHTML = form.elements[1].value;
    let date = document.createElement("P");
    if (form.elements[2].value != ""){
      var d = new Date(form.elements[2].value);
      date.innerHTML = "By " + formatDate(d);
    };

    let button = document.createElement("BUTTON");
    button.classList.add("close-btn");
    button.innerHTML = "x";

    let pin = document.createElement("BUTTON");
    pin.classList.add("pin-btn");
    pin.style.backgroundColor = "transparent";
    
    sticky.appendChild(title);
    sticky.appendChild(descrip);
    sticky.appendChild(date);
    sticky.appendChild(button);
    sticky.appendChild(pin);
    
    getSetColor(sticky, "color");
    
    document.getElementById("stickies").appendChild(sticky);
    
    button.onclick = function() {
      stickies.removeChild(sticky);
    };

    pin.onclick = function() {
      if(pin.style.backgroundColor === "transparent") {
        sticky.onmousedown = null;
        pin.style.backgroundColor = "ghostwhite";
        } else {
        dragElement(sticky, sticky);
        pin.style.backgroundColor = "transparent";
        }
    };

    form.elements[0].value = "";
    form.elements[1].value = "";
    form.elements[2].value = "";
    document.getElementById("red").checked = true;
        
    event.preventDefault();
    dragElement(sticky, sticky);
};


/* Unused */
const sendEmail = (recipient, title, body, date) => {
    Email.send({
        Host: "smtp.gmail.com",
        Username : "email@email.com",
        Password : "password.com",
        To : recipient,
        From : "Task Board Reminder System",
        Subject : "[REMINDER]" + title,
        Body : "Hello, this is an automated reminder set for " + date + ".\n " + body,
    }).then(
        message => alert("Mail sent successfully")
    );
}

document.getElementById("submit-note-btn").onclick = () => {
    let form = document.getElementById("create-note");
    let sticky = document.createElement("DIV");
    sticky.classList.add("note");
    let text = document.createElement("P");
    text.innerHTML = form.elements[0].value;
    let button = document.createElement("BUTTON");
    button.classList.add("close-btn");
    button.innerHTML = "x";
    let pin = document.createElement("BUTTON");
    pin.classList.add("pin-btn");
    pin.style.backgroundColor = "transparent";

    sticky.appendChild(text);
    sticky.appendChild(button);
    sticky.appendChild(pin);
    
    getSetColor(sticky, "note-color");

    document.getElementById("stickies").appendChild(sticky);

    button.onclick = function() {
        stickies.removeChild(sticky);
    };

    pin.onclick = function() {
      if(pin.style.backgroundColor === "transparent") {
        sticky.onmousedown = null;
        pin.style.backgroundColor = "ghostwhite";
        } else {
        dragElement(sticky, sticky);
        pin.style.backgroundColor = "transparent";
        }
    };

    form.elements[0].value = "";
    document.getElementById("red").checked = true;

    event.preventDefault();
    dragElement(sticky, sticky);
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

    let pin = document.createElement("BUTTON");
    pin.classList.add("pin-btn");
    pin.style.backgroundColor = "transparent";

    sticky.appendChild(image);
    sticky.appendChild(button);
    sticky.appendChild(pin);

    button.onclick = function() {
        stickies.removeChild(sticky);
    };

    pin.onclick = function() {
      if(pin.style.backgroundColor === "transparent") {
        image.onmousedown = null;
        pin.style.backgroundColor = "ghostwhite";
        } else {
        dragElement(sticky, image);
        pin.style.backgroundColor = "transparent";
        }
    };

    document.getElementById("stickies").appendChild(sticky);
    form.elements[0].value = "";

    event.preventDefault();
    dragElement(sticky, image);
}

/*Currently unused but may become useful again*/
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
    document.getElementById("view-task-form-btn").classList.toggle("active");
    let form = document.getElementById("create-task");   
    let formContainer = document.getElementById("task-form-container");
    viewForm(form , formContainer);
};

function thisprints(){
    console.log("i print");
}

document.getElementById("view-note-form-btn").onclick = () => {
    document.getElementById("view-note-form-btn").classList.toggle("active");
    let form = document.getElementById("create-note");   
    let formContainer = document.getElementById("note-form-container");
    viewForm(form , formContainer);
};

document.getElementById("view-image-form-btn").onclick = () => {
    document.getElementById("view-image-form-btn").classList.toggle("active");
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
function dragElement(elmnt, dragby) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    /*move the DIV from anywhere inside the DIV:*/
    dragby.onmousedown = dragMouseDown;
  
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

//toggle bg image between poster and corkboard
document.getElementById("background-change-btn").onclick = () => {
    let btn = document.getElementById("background-change-btn");
    if (btn.innerHTML === "Posterboard") {
        document.body.style.background = "none";
        btn.innerHTML = "Corkboard";
    } else {
        document.body.style.backgroundImage = "url(board.jpg)";
        btn.innerHTML = "Posterboard";
    }
}

//formatting date
function formatDate(d){
  var day;
  switch (d.getDay()) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
  }

  var month;
  switch (d.getMonth()) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
  }

  var min;
  if(d.getMinutes() < 10){
    min = "0" + d.getMinutes();
  } else {
    min = d.getMinutes();
  }

  var dateString = `${day}, ${month} ${d.getDate()} ${d.getHours()}:${min}`
  return dateString;
}