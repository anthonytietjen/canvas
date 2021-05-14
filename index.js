var mouseIsPressed = false;
var context;
var theCanvas;
var xLast = null;
var yLast = null;
var drawMode = null;
var select_width;
var select_color;
var select_drawmode;

window.addEventListener('load', init);

function init() {
  // Store references to UI elements
  select_width = document.getElementById('select_width');
  select_color = document.getElementById('select_color');
  select_drawmode = document.getElementById('select_drawmode');
  theCanvas = document.getElementById('theCanvas');
  context = theCanvas.getContext("2d");
  
  // Set defaults
  setStrokeStyle();
  setFillStyle();
  setLineWidth();
  setDrawMode();

  // Add event listeners
  theCanvas.addEventListener('mousedown', mouseDown);
  theCanvas.addEventListener('mousemove', mouseMove);
  window.addEventListener('mouseup', mouseUp);
}

function mouseDown(ev) {
  mouseIsPressed = true;
}

function mouseUp(ev) {
  mouseIsPressed = false;
  xLast = null;
  yLast = null;
}

function mouseMove(ev) {
  if (mouseIsPressed) {
    xNow = ev.clientX - theCanvas.offsetLeft;
    yNow = ev.clientY - theCanvas.offsetTop;


    if (xLast != null) {

      if (drawMode == "stroke") {
        context.beginPath();
        context.moveTo(xLast, yLast);
        context.lineTo(xNow, yNow);
        context.stroke();
      } else if (drawMode == "fill") {
        context.beginPath();
        context.moveTo(xLast, yLast);
        context.lineTo(xLast + (context.lineWidth / 2), yLast + (context.lineWidth / 2));
        context.lineTo(xNow + (context.lineWidth / 2), yNow + (context.lineWidth / 2));
        context.lineTo(xNow, yNow);
        context.lineTo(xLast, yLast);
        context.fill();
      }
    }

    xLast = xNow;
    yLast = yNow;
  }
}

function setStrokeStyle() {
  context.strokeStyle = select_color.options[select_color.selectedIndex].value;
}

function setFillStyle() {
  context.fillStyle = select_color.options[select_color.selectedIndex].value;
}

function setLineWidth() {
  context.lineWidth = select_width.options[select_width.selectedIndex].value;
}

function setDrawMode(){
  drawMode = select_drawmode.options[select_drawmode.selectedIndex].value;
}

function erase() {
  context.fillStyle = 'rgb(255,255,255)';
  context.fillRect(0, 0, 1000, 500);
  init();
}