var mouseIsPressed = false;
var context;
var theCanvas;
var xLast = null;
var yLast = null;
var drawMode = null;

function init(){
  var select_width = document.getElementById('select_width');
  var select_color = document.getElementById('select_color');
  var select_drawmode = document.getElementById('select_drawmode');

  theCanvas = document.getElementById('theCanvas');
  context = theCanvas.getContext("2d");
  context.strokeStyle = select_color.options[select_color.selectedIndex].value;
  context.fillStyle = select_color.options[select_color.selectedIndex].value;
  context.lineWidth = select_width.options[select_width.selectedIndex].value;
  
  drawMode = select_drawmode.options[select_drawmode.selectedIndex].value;
}

function mouseDown(ev){
  mouseIsPressed = true;
}

function mouseUp(ev){
  mouseIsPressed = false;
  xLast = null;
  yLast = null;
}

function mouseMove(ev){
  if(mouseIsPressed){
    xNow = ev.clientX - theCanvas.offsetLeft;
    yNow = ev.clientY - theCanvas.offsetTop;
    
    
    if(xLast != null){
      
      if(drawMode == "stroke"){
        context.beginPath();
        context.moveTo(xLast,yLast);
        context.lineTo(xNow, yNow);
        context.stroke();
      } else if(drawMode == "fill"){
        context.beginPath();
        context.moveTo(xLast,yLast);
        context.lineTo(xLast + (context.lineWidth/2),yLast + (context.lineWidth/2));
        context.lineTo(xNow + (context.lineWidth/2), yNow + (context.lineWidth/2));
        context.lineTo(xNow, yNow);
        context.lineTo(xLast, yLast);
        context.fill();
      }
    }
    
    xLast = xNow;
    yLast = yNow;
  }
}