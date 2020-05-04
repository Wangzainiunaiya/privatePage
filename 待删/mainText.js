var textAnimation = function textAnimation(canvas){
    // 初始化动画
    initAnimate()
    function initAnimate(){
        dots.forEach(function(){
            // this.currentX = Math.random()*canvas.width;
            // this.currentY = Math.random()*canvas.height;
            // this.currentZ = Math.random()*focallength*2 - focallength;

            this.currentX = 100
            this.currentY = 100
            this.currentZ = 12

            this.expandX = Math.random()*canvas.width;
            this.expandY = Math.random()*canvas.height;
            this.expandZ = Math.random()*focallength*2 - focallength;


            this.draw();
            
        });
        // 执行动画
        animate()
    } 
    // 粒子移动之前的瞬时时间
    var lastTime = 0
    function animate(){
        // 遍历粒子数组 
        var beforeTime = +new Date()   
         // 擦除上一帧
         context.clearRect(0, 0, canvas.width, canvas.height);  

        dots.forEach(
            function(){

            if(shrinkFlag){
                // 正在收缩
               if(Math.abs(this.currentX-this.shrinkX)<0.1 && Math.abs(this.currentY-this.shrinkY)<0.1 &&Math.abs(this.currentZ-this.shrinkZ)<0.1)
                    {//粒子到达指定位置
                            this.currentX = this.shrinkX
                            this.currentZ = this.shrinkZ
                            this.currentY = this.shrinkY
                            
                            // 设定延迟时间
                            if(beforeTime-lastTime>300){
                                shrinkFlag = false
                            }
                    }
                else{//粒子正在收缩途中,逐渐缩小差距
                    this.currentX = this.currentX +(this.shrinkX-this.currentX)*0.02
                    this.currentY = this.currentY +(this.shrinkY-this.currentY)*0.02
                    this.currentZ = this.currentZ +(this.shrinkZ-this.currentZ)*0.02
                    // 记录实时当前时间
                    lastTime = +new Date()
                }     
            }
            else{//粒子已经收缩完毕，反向扩张
                if(Math.abs(this.currentX-this.expandX)<0.1 && Math.abs(this.currentY-this.expandY)<0.1 && Math.abs(this.currentZ-this.expandZ)<0.1)
                {
                    // 到达扩张位置，扩张完毕，停止动画执行
                    animateFlag = false; 
                }
                else{//粒子正在扩张途中，逐渐缩小差距
                    this.currentX = this.currentX +(this.expandX-this.currentX)*0.02
                    this.currentY = this.currentY +(this.expandY-this.currentY)*0.02
                    this.currentZ = this.currentZ +(this.expandZ-this.currentZ)*0.02
                    animateFlag = true
                }
                
            }
            // 更新粒子位置
                this.draw()
        })
        if(animateFlag) {
            if("requestAnimationFrame" in window){
                requestAnimationFrame(animate);
            }
            else if("webkitRequestAnimationFrame" in window){
                webkitRequestAnimationFrame(animate);
            }
            else if("msRequestAnimationFrame" in window){
                msRequestAnimationFrame(animate);
            }
            else if("mozRequestAnimationFrame" in window){
                mozRequestAnimationFrame(animate);
            }
        }
    }
    
    
    // console.log(document.getElementById('start').onclick)

    
    document.getElementById('start').onclick = function(){
        // 如果动画正在执行中则退出此次操作
        if(animateFlag) return;
        // 清除上一次界面
        context.save();
        context.fillStyle='rgba(0,0,0,0)';         
        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        dots = getimgdata(document.getElementById('name').value);
        shrinkFlag=true;
        animateFlag= true;
        initAnimate()
    }

    }
    


// 获取画板像素信息
function getimgdata(text){
    drawText(text)
    // 粒子数组
    var dots=[]
    // 获取像素信息
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);    
    // 判断像素信息
    for(var x=0;x<imgData.width;x+=6){
        for(var y=0;y<imgData.height;y+=6){
            // 第i个像素位置的R值
            var i = (y*imgData.width+x)*4
            if(imgData.data[i]>0){
                // 不为透明像素，将其存入粒子数组中
                var dot = new Dot(x,y,0,3)
                dots.push(dot)
            }
        }
    }
    context.clearRect(0, 0, canvas.width, canvas.height);  
    return dots
    
}
// 绘制文字
function drawText(text)
{
    context.save()
    context.font = "200px 微软雅黑 bold";
    context.fillStyle = "rgba(255,0,0)";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text , canvas.width/2 , canvas.height/2);
    context.restore();
    
}
// 粒子数组构造函数
var Dot = function(X,Y,Z,radius){
    // 收缩目标位置
    this.shrinkX = X
    this.shrinkY = Y
    this.shrinkZ = Z

    // 实时当前位置
    this.currentX = X
    this.currentY = Y
    this.currentZ = Z

    //扩散目标位置
    this.expandX = X
    this.expandY = Y
    this.expandZ = Z

    // 半径
    this.radius = radius

}
// 向原型中添加绘制方法
Dot.prototype = {
    draw:function(){
        context.save();
        var colorR =Math.random()*255
        var colorG =Math.random()*255
        var colorB =Math.random()*255
        var scale = focallength/(focallength + this.currentZ);  
        context.beginPath();
        var gradient = context.createRadialGradient(canvas.width/2 + (this.currentX-canvas.width/2)*scale, canvas.height/2 + (this.currentY-canvas.height/2)*scale, this.radius*scale/2, canvas.width/2 + (this.currentX-canvas.width/2)*scale, canvas.height/2 + (this.currentY-canvas.height/2)*scale,  this.radius*scale);
        context.arc(canvas.width/2 + (this.currentX-canvas.width/2)*scale, canvas.height/2 + (this.currentY-canvas.height/2)*scale, this.radius*scale , 0 , 2*Math.PI);
        // context.fillStyle='rgba('+colorR+','+colorG+','+colorB+','+scale+')'
        // gradient.addColorStop(0, 'red');
        // gradient.addColorStop(1, 'pink');              
        // context.fillStyle=gradient;
        context.fillStyle='rgba(0,0,0,1)';
        
        context.fill();
        context.restore();
        
    }
}
// 指定数组的this为当前访问的元素,即单个像素
Array.prototype.forEach = function(callback){
    // 指定当前遍历的粒子为this
    for(var i=0;i<this.length;i++){
        callback.call(this[i]);
    }
}
export {textAnimation}