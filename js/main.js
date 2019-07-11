var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
var iw = canvas.parentElement.clientWidth;
var ih = canvas.parentElement.clientHeight;
canvas.width = iw;
canvas.height = ih;
const rad = Math.PI / 180;

class Tree {
    constructor(sX, sY, eX, eY) {
        this.sX = sX;
        this.sY = sY;
        this.eX = eX;
        this.eY = eY;
        this.color = "rgb(30,180,55)";
        this.branchCount = 0;
    }
    draw(startX,startY,len,angle) {
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
        this.draw(0, -len, len * 0.8, -angle);
        this.draw(0, -len, len * 0.8,angle);
        c.restore();
    }
}
var t1 = new Tree(0, 0, 0, -50);
t1.draw(iw/2,ih,70,20);