var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
var iw = canvas.parentElement.clientWidth;
var ih = canvas.parentElement.clientHeight;
canvas.width = iw;
canvas.height = ih;
const rad = Math.PI / 180;

class Tree {
    constructor(angle) {
        this.startX = 0
        this.startY = 0
        this.color = "rgb(30,180,55)";
        this.branchCount = 0;
        this.x = NaN
        this.y = NaN
        this.r_angle = angle
        this.l_angle = -angle
    }
    draw(startX,startY,len,angle) {
        // this.startX = startX
        // this.startY = startY
        c.beginPath();
        c.save();
        c.translate(startX, startY);
        if(this.branchCount!=0)
            c.rotate(angle * Math.PI / 180);
        else
            this.branchCount++;
        c.moveTo(0, 0);
        c.lineTo(0, -len);
        c.closePath()
        c.strokeStyle = this.color;
        c.stroke();
        if (len < 20) {
            c.beginPath()
            c.arc(0,-len,5,0,360*rad);
            c.fillStyle = this.color;
            c.fill();
            c.restore();
            return;
        }
        this.draw(0, -len, len * 0.8, this.l_angle);
        this.draw(0, -len, len * 0.8,this.r_angle);
        c.restore();
        window.requestAnimationFrame(this.draw)
    }
    interaction(){
        canvas.onmousemove = (e)=>{
            this.x = e.x
            this.y = e.y
            if(e.y<iw/3){
                this.r_angle = this.r_angle*0.8
                this.l_angle = this.l_angle*0.8
            }
            console.log(`mX ${this.x} mY ${this.y} angle ${this.r_angle} ${this.l_angle} sx ${this.startX}`)
        }
    }
}
var t1 = new Tree(20);
t1.draw(iw/3,ih,90);

var t2 = new Tree(20);
t2.draw(iw/1.5,ih,70);
t2.interaction()