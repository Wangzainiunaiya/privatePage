
ballAnimation()
function ballAnimation(){

//小球构造函数
var Ball = function(x,y,radius,color){
    this.x = x
    this.y = y
    this.color = color
    this.radius = radius
    // 水平与垂直方向速度
    this.vx = 0 
    this.vy = 0
}

// 小球原型方法
Ball.prototype = {
    // 绘制方法
    draw: function(){
        context.save();
        context.fillStyle= this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, Math.PI / 180 * 0, Math.PI / 180 * 360);
        context.fill();
        context.restore();  
    },

    // 运动方法
    run: function(t){
    
        // 水平与垂直方向速度变化
        this.vx += this.vx>0 ? -a*t : a*t
        this.vy += g*t

        // 水平方向与垂直方向的位移变化,由于时间极短,故将其看作匀速直线运动
        this.x += this.vx*t*Xm
        this.y += this.vy*t*Xm

        //判断是否撞击边界,进行速度修正 与位置修正
        if(this.x> (canvas.width -this.radius)|| this.x<radius){
            //撞击了水平边界,反向,赋予撞击加速度
            this.x = (this.x<this.radius)?this.radius:(canvas.width-this.radius)
            this.vx = -this.vx*popA
        }
        if(this.y> canvas.height -this.radius|| this.y<radius){
            //撞击了水平边界,反向,赋予撞击加速度
            this.y = this.y<this.radius?this.radius:(canvas.height-this.radius)
            this.vy = -this.vy*popA
        }
        this.draw()

    }
}

    ballaAnimation()

function ballaAnimation(){

    canvas = document.getElementById("canvas1")
    context = canvas.getContext('2d');

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // 所用常量
    radius = 12     //小球半径
    g = 9.8         //竖直加速度
    a = 0.5          //水平加速度
    popA = 0.99      //弹力加速度
    Xm = canvas.width/20  //像素与实际距离之间的映射
    balls=[]         //小球数组
    //随机生成小球
    for(var i =0;i<100;i++){
        var ball = new Ball(getRandom(radius,canvas.width-radius),getRandom(radius,canvas.height-radius),14,'rgba('+getRandom(0,255)+','+getRandom(0,255)+','+getRandom(0,255)+',1)')
        balls.push(ball)
    }
    //将小球暴露出去，给window
    window.balls = balls 
    // 开始进行动画
    animate1()    
    

    // 点击屏幕任意地方,赋予小球初速度,按距离远近分配
    canvas.onclick = function(e){
        e = event || window.event
        // 获取其坐标
        var x = e.clientX
        var y = e.clientY

        // 按距离分配速度
        balls.forEach(function(ball){
            ball.vx = (x-ball.x)/40
            ball.vy = (y-ball.y)/40
        })
    }



}
   
// 碰撞检测
function collision() {
for (var i = 0; i < balls.length; i++) {
for (var j = 0; j < balls.length; j++) {
  
var b1 = balls[i], b2 = balls[j];
if (b1 !== b2) {
    var rc = Math.sqrt(Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2));
    if (rc < (b1.radius + b2.radius)) {

        //获得碰撞后速度的增量
        var ax = ((b1.vx - b2.vx) * Math.pow((b1.x - b2.x), 2) + (b1.vy - b2.vy) * (b1.x - b2.x) * (b1.y - b2.y)) / Math.pow(rc, 2);
        var ay = ((b1.vy - b2.vy) * Math.pow((b1.y - b2.y), 2) + (b1.vx - b2.vx) * (b1.x - b2.x) + (b1.y - b2.y)) / Math.pow(rc, 2);

        //给与小球新的速度
        b1.vx = (b1.vx - ax) * popA;
        b1.vy = (b1.vy - ay) * popA;
        b2.vx = (b2.vx + ax) * popA;
        b2.vy = (b2.vy + ay) * popA;

        // // 位置修正
        var stickLength = (b1.radius+ b2.radius-rc+2)/2    //两球嵌入的长度,平均分配
        var cx = stickLength * Math.abs((b1.x - b2.x)) /rc;
        var cy = stickLength * Math.abs((b1.y - b2.y)) /rc;
        b1.x += b1.x<b2.x? -cx:cy
        b2.x += b1.x<b2.x? cx:-cx
        b1.y += b1.y<b2.y? -cy:cy
        b2.y += b1.y<b2.y? cy:-cy
    }
  }
}
}
}


//动画绘制
function animate1(){

    // 每次执行动画前重绘页面
    context.clearRect(0,0, canvas.width, canvas.height);

    // 俩帧间隔时间
    var Time = 16/1000

    // 碰撞检测与修正
    collision()
    // 遍历小球进行运动
   balls.forEach(function(ball){
       ball.run(Time)
   })

   window.animate1 = window.requestAnimationFrame(animate1)
}

// 随机数生成
function getRandom(a,b){
    return Math.random()*(b-a) +a       
 }


}
