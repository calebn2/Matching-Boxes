var boxes = document.getElementsByClassName("box");
var container = document.getElementById("container").getBoundingClientRect();

for (var i = 0; i < boxes.length; i++) {
  var box = boxes[i];
  var randY = Math.floor(Math.random() * 700);
  var randX = Math.floor(Math.random() * 700);
  for (var j = 0; j < boxes.length; j++) {
    if (Math.abs(randX - boxes[j].style.left) < 100 || Math.abs(randY - boxes[j].style.top) < 100) {
      i--;
      break;
    }
    box.style.left = randX + "px";
    box.style.top = randY + "px";
  }
  dragElement(box);
}
function dragElement(el) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var boxRect;
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
    boxRect = el.getBoundingClientRect();

    if (pos2 > 0 && boxRect.top === container.top + 5) pos2 = 0;
    else if (pos2 < 0 && boxRect.bottom === container.bottom - 5) pos2 = 0;
    if (pos1 > 0 && boxRect.left === container.left + 5) pos1 = 0;
    else if (pos1 > 0 && boxRect.right === container.right - 5) pos1 = 0;
    
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
}