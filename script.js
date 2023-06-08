var container = document.getElementById("container");
var rect2;
var boxes;

// loadBoxes() takes data from a JSON file in a server to populate the container.
/*
function loadBoxes() {
  fetch('boxes.json')
    .then(response => response.json())
    .then(data => {
      boxes = data;
      makeBoxes();
    })
    .catch(error => console.error('Error loading boxes:', error));
}
*/
boxes = [
  {
      "identifier": "box1",
      "class": "1",
      "data": "System.out.println('hello world')"
  },
  {
      "identifier": "box2", 
      "class": "1",
      "data": "hello world"
  },
  {
      "identifier": "box3",
      "class": "2",
      "data": "System.out.println('Hello, World!')" 
  },
  {
      "identifier": "box4",
      "class": "2",
      "data": "Hello, World!"
  },
  {
      "identifier": "box5",
      "class": "3",
      "data": "System.out.println('hello, world')"
  },
  {
      "identifier": "box6",
      "class": "3",
      "data": "hello, world"
  }
]
makeBoxes();

function makeBoxes() {
  for (var i = 0; i < boxes.length; i++) {
    var card = document.createElement("div");
    container.appendChild(card);
    card.id = boxes[i].identifier;
    card.classList.add("box");
    card.classList.add(boxes[i].class);
    card.innerHTML = boxes[i].data;
  }
  boxes = container.childNodes;
  setBoxLocation();
}

function setBoxLocation() {
  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    var randY = Math.floor(Math.random() * (700 - box.offsetWidth));
    var randX = Math.floor(Math.random() * (600 - box.offsetHeight));
    box.style.left = randX + "px";
    box.style.top = randY + "px";
    dragElement(box);
  }
}

function dragElement(el) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  el.onmousedown = dragStart;

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault;

    pos3 = e.clientX;
    pos4 = e.clientY;
    el.classList.add("top-layer");

    document.onmouseup = dragEnd;
    document.onmousemove = drag;
  }

  function dragEnd(e) {
    checkOverlap();
    el.classList.remove("top-layer");
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function drag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    isTouchingBorder(el, container);
    if(el.classList.contains("Top") || el.classList.contains("Bottom")) pos2 = 0;
    if(el.classList.contains("Left") || el.classList.contains("Right")) pos1 = 0;
    
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
  }

  function checkOverlap() {
    for (var i = 0; i < boxes.length; i++) {
      var currentBox = boxes[i];
      var currentBoxRect = currentBox.getBoundingClientRect();

      for (var j = i + 1; j < boxes.length; j++) {
        var otherBox = boxes[j];
        var otherBoxRect = otherBox.getBoundingClientRect();

        if (
          !currentBox.classList.contains("disappear") &&
          !otherBox.classList.contains("disappear") &&
          currentBox.classList[1] === otherBox.classList[1] &&
          doBoxesOverlap(currentBoxRect, otherBoxRect)
        ) {
          currentBox.classList.add("disappear");
          otherBox.classList.add("disappear");
        }
      }
    }
  }

  function doBoxesOverlap(box1, box2) {
    return (
      box1.left < box2.right &&
      box1.right > box2.left &&
      box1.top < box2.bottom &&
      box1.bottom > box2.top
    );
  }

  function isTouchingBorder(element1, element2) {
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();

    var touchingLeft = rect1.right >= rect2.left + 5 && rect1.left <= rect2.left + 5;
    var touchingRight = rect1.left <= rect2.right - 5 && rect1.right >= rect2.right - 5;
    var touchingTop = rect1.bottom >= rect2.top + 5 && rect1.top <= rect2.top + 5;
    var touchingBottom = rect1.top <= rect2.bottom - 5 && rect1.bottom >= rect2.bottom - 5;

    if (touchingLeft && !el.classList.contains("Left") && pos1 > 0) el.classList.add("Left");
    else if (pos1 < 0 && el.classList.contains("Left")) el.classList.remove("Left");
    if (touchingRight && !el.classList.contains("Right") && pos1 < 0) el.classList.add("Right");
    else if (pos1 > 0 && el.classList.contains("Right")) el.classList.remove("Right");
    if (touchingTop && !el.classList.contains("Top") && pos2 > 0) el.classList.add("Top");
    else if (pos2 < 0 && el.classList.contains("Top")) el.classList.remove("Top");
    if (touchingBottom && !el.classList.contains("Bottom") && pos2 < 0) el.classList.add("Bottom");
    else if (pos2 > 0 && el.classList.contains("Bottom")) el.classList.remove("Bottom");
  }
}

loadBoxes();