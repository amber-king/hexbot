let canvas;
let ctx;
let appWidth;
let appHeight;
let text = 'Hello world';  // text to display

// called by NOOPBOT on window.onload
function start_app() {

  // size canvas to window
  sizeCanvas();

  // set up a ticker to refresh page automatically.
  let speed = 300;  // how often screen refreshes, in milliseconds.
  let ticker = NOOPBOT_TICK_SETUP(draw, speed);

  // fire a draw event
  draw();

  // redraw when canvas is clicked
  canvas.addEventListener('click', draw);
}

function sizeCanvas() {
  appWidth = window.innerWidth;
  appHeight = window.innerHeight;
  canvas = document.getElementById('canvas');
  ctx = NOOPBOT_SETUP_CANVAS( { canvas: canvas, bgColor:'#ffffff' });
}

function draw() {
  //get the data
  NOOPBOT_FETCH({
    API: 'hexbot',
    count: text.length,
  }, drawText);
}

// add each character of text to the canvas with a new color
function drawText(responseJson) {
  let { colors } = responseJson;
  let index = 0;
  let x = (appWidth/2) - (text.length/2)*50;
  let y = appHeight/2;
  colors.forEach(function(color) {
    let char = text[index];
    ctx.font = '60px Courier';
    ctx.fillStyle = color.value;
    ctx.fillText(char, x, y);
    x += 50;
    index++;
  })
}

window.onresize = function(event){
  sizeCanvas();
  draw();
};
