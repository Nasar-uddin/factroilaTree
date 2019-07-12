var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
var iw = canvas.parentElement.clientWidth;
var ih = canvas.parentElement.clientHeight;
canvas.width = iw;
canvas.height = ih;
const rad = Math.PI / 180;

class Tree {
    constructor(angle) {
        this.color = "rgb(30,180,55)";
        this.angle = angle;
        this.branchCount = 0;
        this.l_angle_scale = 1
        this.r_angle_scale = 1
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
        if (len < 30) {
            c.beginPath()
            c.arc(0,-len,2,0,360*rad);
            c.fillStyle = this.color;
            c.fill();
            c.restore();
            return;
        }
        this.draw(0,-len,len*0.75,-this.angle*this.l_angle_scale);
        this.draw(0, -len,len * 0.75,this.angle*this.r_angle_scale);
        c.restore();
        
    }
    update(left_angle_scale,right_angle_scale){
        this.l_angle_scale = left_angle_scale
        this.r_angle_scale = right_angle_scale
    }
}

var t1 = new Tree(15);
// var xx = 1;
// var speed  = 0.005;
// var sign = -1;
var x_ratio = 0;
var y_ratio = 1;
function animate(){
    // if(xx>=1.5){
    //     sign = -1
    // }else if(xx<0.8){
    //     sign = 1
    // }
    // xx = xx+speed*sign
    c.fillStyle = '#ffffff';
    y_ratio = 1-x_ratio;
    c.fillRect(0,0,iw,ih);
    t1.update(x_ratio+1,y_ratio);
    t1.draw(iw/2,ih,100,0);
    requestAnimationFrame(animate)
}
animate()
canvas.onmousemove = function(e){
    // console.log(`x:${e.x} y:${e.y}`);
    x_ratio = 1-(e.x/(iw/2))
    if(e.x<iw/2){
        // x_ratio = 1-(e.x/(iw/2))
        // console.log("X r is "+x_ration+" iw is "+iw/2+" ex "+e.x)
    }
}