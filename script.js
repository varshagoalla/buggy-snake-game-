const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;
const particlesArray = [];


function round(x){
    if (x % 10 == 0) return x;
    else if(x % 10 < 5) return Math.floor(x / 10) * 10;
    else return Math.ceil(x / 10) * 10;
}

function adjust(x , y){
    if (x + 5 >= canvas.width) {
        x -= canvas.width;
    } 
    if (y + 5 >= canvas.height) {
        y -= canvas.height;
    } 
    if (x - 5 < 0) {
        x += canvas.width;
    } 
    if (y - 5 < 0) {
        y += canvas.height;
    }
    return [x , y]; 
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

class SnakeSegment {
    constructor(x, y, Vx, Vy, color){
        this.Vx = Vx;
        this.Vy = Vy;
        this.color = color;
        this.X = x;
        this.Y = y;
    }
}

let change = true;

class Snake {
    constructor(){ 
        this.speed = 0;
        this.body = [new SnakeSegment(round(canvas.width/2), round(canvas.height/2), 0, 0, 'white')];
    }

    grow(n){
        for (let i = 0; i < n; i++){
            let lastSegment = this.body[this.body.length-1];
            let Vx = lastSegment.Vx;
            let Vy = lastSegment.Vy;
            let x = lastSegment.X - Vx * 10;
            let y = lastSegment.Y - Vy * 10;
            //console.log(x,y,Vx,Vy)
            this.body.push(new SnakeSegment(x, y, Vx, Vy, 'white'));
        }
    }

    update(){
        change = false;
        let speed_int = Math.floor(this.speed);
        let speed_dec = this.speed - speed_int;
        if (speed_int!=0){
        for (let i = this.body.length-1; i >= speed_int; i--){
            console.log("speed_int",speed_int);
            let prevSegment = this.body[i - speed_int];
            this.body[i].X = prevSegment.X;
            this.body[i].Y = prevSegment.Y;
            this.body[i].Vx = prevSegment.Vx;
            this.body[i].Vy = prevSegment.Vy;
        }
   
        for (let i = Math.min(this.body.length-1, speed_int-1); i >= 0; i--){
            console.log("speed_int",speed_int);
            let d = speed_int * 10 - i * 10;
            let Vx = this.body[0].Vx;
            let Vy = this.body[0].Vy;
            [this.body[i].X, this.body[i].Y] = adjust( this.body[0].X + d * Vx, this.body[0].Y + d * Vy );
            this.body[i].Vx = Vx;
            this.body[i].Vy = Vy;
        }
    }
        
        for (let i = this.body.length-1; i >= 0; i--){
            let Vx = this.body[i].Vx;
            let Vy = this.body[i].Vy;
            if (i!=0 && ((this.body[i].X - this.body[i-1].X)!=0 && (this.body[i].Y - this.body[i-1].Y)!=0 )){
                if (Vx==0) {
                    let distance =  Vy * (this.body[i-1].Y - this.body[i].Y)
                    // if (distance>10){
                    //     console.log(this.body[i-1]);
                    //     console.log(this.body[i]);
                    //     console.log("alert", this.body[i-1].Y, this.body[i].Y);
                    //     console.log("alert", distance);
                    //     if (this.body[i-1].Y > this.body[i].Y){
                    //        distance = Vy * (this.body[i-1].Y - canvas.height - this.body[i].Y)
                    //     }
                    //     else{
                    //        distance = Vy * (this.body[i-1].Y + canvas.height - this.body[i].Y) 
                    //     }
                    //     console.log("alert", distance);
                    // }
                    if (distance>10 || distance<0){
                        console.log(this.body[i-1]);
                        console.log(this.body[i]);
                    }
                    if (speed_dec * 10 < distance ){
                        this.body[i].Y += speed_dec * Vy * 10;
                    }
                    else{
                        this.body[i].Y += distance * Vy;
                        this.body[i].Vx = this.body[i-1].Vx;
                        this.body[i].Vy = this.body[i-1].Vy;
                        this.body[i].X += (speed_dec * 10 - distance) * this.body[i-1].Vx;
                    }
                    if (Math.abs(this.body[i].X-this.body[i-1].X)>10 || Math.abs(this.body[i].Y-this.body[i-1].Y)>10){
                        console.log("distance", distance, "speed", speed_dec);
                        console.log(this.body[i-1]);
                        console.log(this.body[i]);
                    }
                }
                else {
                    let distance =  Vx * (this.body[i-1].X - this.body[i].X)
                    // if (distance>10){
                    //     console.log(this.body[i-1]);
                    //     console.log(this.body[i]);
                    //     console.log("alert", this.body[i-1].X, this.body[i].X);
                    //     console.log("alert", distance);
                    //     if (this.body[i-1].X > this.body[i].X){
                    //        distance = Vx * (this.body[i-1].X - canvas.width - this.body[i].X)
                    //     }
                    //     else{
                    //        distance = Vx * (this.body[i-1].X + canvas.width - this.body[i].X) 
                    //     }
                    //     console.log("alert", distance);
                    // }
                    if (distance>10 || distance<0){
                        console.log(this.body[i-1]);
                        console.log(this.body[i]);
                    }
                    if (speed_dec * 10 < distance ){
                        this.body[i].X += speed_dec * Vx * 10;
                    }
                    else{
                        this.body[i].X += distance * Vx;
                        this.body[i].Vx = this.body[i-1].Vx;
                        this.body[i].Vy = this.body[i-1].Vy;
                        this.body[i].Y += (speed_dec * 10 - distance) * this.body[i-1].Vy;
                    }
                    if (Math.abs(this.body[i].X-this.body[i-1].X)>10 || Math.abs(this.body[i].Y-this.body[i-1].Y)>10){
                        console.log("distance", distance, "speed", speed_dec);
                        console.log(this.body[i-1]);
                        console.log(this.body[i]);
                    }
                }
            }
            else {
                this.body[i].X = this.body[i].X + speed_dec * Vx * 10;
                this.body[i].Y = this.body[i].Y + speed_dec * Vy * 10;
            }
            // [this.body[i].X, this.body[i].Y]  = adjust(this.body[i].X, this.body[i].Y);
            if (i!=0 && (Math.abs(this.body[i].X-this.body[i-1].X)>10 || Math.abs(this.body[i].Y-this.body[i-1].Y)>10)){
                console.log("snake");
                for (let j = 0; j<this.body.length; j++){
                    console.log(this.body[j])
                }
                console.log("snake");
                console.log("distance", "speed");
                console.log(this.body[i-1]);
                console.log(this.body[i]);
            }
            
        }


        

        for (let i = 1; i < this.body.length; i++){
            if (Math.abs(this.body[0][0]-snake.body[i][0]) < 10 && Math.abs(snake.body[0][1]-snake.body[i][1]) < 10) {
                console.log(this.body[0], this.body[i]);
                this.body.splice(i , this.body.length - i);
                console.log("splicing");
            }
        }
        change = true;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fill();
        // draw rect centered at the given points
        for(let i = 0; i < this.body.length; i++){
            ctx.fillRect(this.body[i].X-5, this.body[i].Y-5, 10, 10)
        }
    }
}

class Particle {
    constructor(x, y){ 
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1.5;
        this.speedY = Math.random() * 2 - 1.5;
        this.color =  'red';
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.05;
        
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

class Food {
    constructor(){
        this.X = round(Math.random() * (canvas.width - 5)) + 5;
        this.Y = round(Math.random() * (canvas.height - 5)) + 5;
        this.color = 'red';
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.fillRect(this.X - 5, this.Y - 5, 10, 10);
    }

    collapse() {
        for (let i =0; i<10; i++){
            particlesArray.push(new Particle(this.X, this.Y));
        }
    }


}

const snake = new Snake();
const foodArray = []
foodArray.push(new Food());
snake.draw();
let food = new Food();
let snakeSpeed = 1;
window.addEventListener('keydown', function(event){
    snake.speed = snakeSpeed;
    let head = snake.body[0];
    if (snake.body.length>1) {
        if ((snake.body[0].X-snake.body[1].X)!=0 && (snake.body[0].Y-snake.body[1].Y)!=0){
            console.log("leave");
            return;
        }
    }
    if (!change){
        console.log(discarded);
        return;
    }
    if (event.key === 'ArrowUp') {
        if (snake.body.length>1 && snake.body[1].Vy > 0){
            return;
        }
        if (head.Vy <= 0){
            head.Vx = 0;
            head.Vy = -1;
        }
    } else if (event.key === 'ArrowDown') {
        if (snake.body.length>1 && snake.body[1].Vy < 0){
            return;
        }
        if (head.Vy >= 0){
            head.Vx = 0;
            head.Vy = 1;
        }
    } else if (event.key === 'ArrowLeft') {
        if (snake.body.length>1 && snake.body[1].Vx > 0){
            return;
        }
        if (head.Vx <= 0){
            head.Vx = -1;
            head.Vy = 0;
        }
    } else if (event.key === 'ArrowRight') {
        if (snake.body.length>1 && snake.body[1].Vx < 0){
            return;
        }
        if (head.Vx >= 0){
            head.Vx = 1;
            head.Vy = 0;
        }
    }
})

function handleParticles(){
    // console.log(particlesArray);
    for (let i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        

        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1);
            i--;
        }
    }
}

let f = 0;
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
    
    if (Math.abs(snake.body[0].X-food.X) < 10 && Math.abs(snake.body[0].Y-food.Y) < 10){
        console.log("yes");
        food.collapse();
        food = new Food();
        snake.grow(10); 
        // snakeSpeed += 0.1;
        // snake.speed = snakeSpeed;
    }
    snake.update();
    snake.draw();
    if (particlesArray.length!=0){
        handleParticles(particlesArray);
    }
    food.draw();    
    requestAnimationFrame(animate);
}

animate();
