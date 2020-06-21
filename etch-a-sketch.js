// Select elements on the page - canvas, shake button

const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const newPenLocation = document.querySelector('.new-location');
const newPenSize = document.querySelector('.pen-size');
const newPenColor = document.querySelector('.pen-color');
let MOVE_AMOUNT = 3;
let PEN_SIZE = 15;

// Setup our canvas for drawing

const { width, height } = canvas;

// Create random x and y starting points on the canvas via a function

// window.onload = setPen();

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = PEN_SIZE;

ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();

function setPen() {

	x = Math.floor(Math.random() * width);
	y = Math.floor(Math.random() * height);

	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.lineWidth = PEN_SIZE;

	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x,y);
	ctx.stroke();
}

// Set new pen size

function setPenSize() {
	console.log("Button works!");
	PEN_SIZE = Math.floor(Math.random() * 20);
	console.log(PEN_SIZE);
	ctx.lineWidth = PEN_SIZE;
}

// Set new pen color
function setPenColor() {
	console.log("Color Button Works!");
	hue = Math.floor(Math.random() * 360);
	console.log(hue);
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
}


// Write a draw function

function draw( { key }) {
	console.log(key);
	// hue = hue + 1;
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	ctx.moveTo(x, y);

	switch (key) {
		case 'ArrowUp': y -= MOVE_AMOUNT;
		break;
		case 'ArrowDown': y += MOVE_AMOUNT;
		break;
		case 'ArrowLeft': x -= MOVE_AMOUNT;
		break;
		case 'ArrowRight': x += MOVE_AMOUNT;
		break;
	}
	ctx.lineTo(x, y);
	ctx.stroke();
}


// Write a handler for the keys

function handleKey(e) {
	if (e.key.includes('Arrow')) {
		draw({ key: e.key });
		e.preventDefault();
		// console.log(e.key);
		// console.log('Handling Key!');
	}
}

// Clear or shake function

function clearCanvas() {
	canvas.classList.add('shake');
	ctx.clearRect(0, 0, width, height);

	canvas.addEventListener('animationend', function() {
		canvas.classList.remove('shake');
	},
	{
		once: true
	});

	setTimeout(function() { 
      location.reload();
  	}, 300); 

}

// Listen for arrow keys

window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
newPenLocation.addEventListener('click', setPen);
newPenSize.addEventListener('click', setPenSize);
newPenColor.addEventListener('click', setPenColor);

// My Modifications
// Random background upon page load
// Random background on shake
// Random pen size, distance, and color buttons
// New pen location button