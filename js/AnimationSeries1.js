
//CANVAS CONFIGURATION
/*
-Getting element
-Getting width and height of screen
-Updating size with a resize event listener

*/
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


//only with canvas element for rezising
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}, false);

let particlesArray = [];
// ------- ---PROGRAM--------
function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
};
//prototype inheritance in JS
// LINK : https://www.toptal.com/javascript/es6-class-chaos-keeps-js-developer-up#:~:text=Prototypes%20vs.-,Classes,is%20itself%20an%20object%20instance.&text=Functions%20are%20first-class%20in,be%20properties%20of%20other%20objects.
// principalFunctionName.prototype.funtionNameOf'Object' = function(){}
Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
};

Particle.prototype.update = function () {
    if ((this.x + this.size > ctx.canvas.width) || (this.x + this.size < 0)) {
        this.directionX = -this.directionX;
    }
    if ((this.y + this.size > ctx.canvas.height) || (this.y + this.size < 0)) {
        this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;

};

function init() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        let size = Math.random() * 20 + 1;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let directionX = (Math.random() *0.4) - 0.2;
        let directionY = (Math.random() *0.4)- 0.2;
        let color = 'white';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    //this request could eliminate the call to functions of eventListener
    requestAnimationFrame(animate);
}
init();
animate();