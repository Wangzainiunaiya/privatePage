var canvas3 = document.getElementById('canvas3')
canvas(canvas3)
function canvas(canvas){
    var context = canvas.getContext('2d')

    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    // 鼠标信息
    var mouse = {
        x:null,
        y:null,
        max : 20000
    }

    // 鼠标移动时赋予鼠标更新鼠标信息
    canvas.onmousemove = function(e){
        e = event||window.event
        mouse.x = e.clientX
        mouse.y = e.clientY
    }
    canvas.onmouseout = function(){
        mouse.x= null
        mouse.y = null
    }

    // 随机粒子
    var dots=[]

    for(var i = 0;i<150;i++){
        var dot = {
            x : Math.random()*canvas.width,
            y : Math.random()*canvas.height,
            xa : Math.random()*2-1,     //
            ya : Math.random()*2-1,      //垂直加速度
            max :6000
        }
        dots.push(dot)
    }
    // 执行动画
    animate()


    // 动画
    function animate(){
        // 重绘页面
        context.save();
        context.fillStyle='rgba(0,0,0,0.4)';    
        context.beginPath();
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
    

        // 每次将鼠标点压入粒子数组中
        var Alldots = [mouse].concat(dots)

        // 遍历所有点
        dots.forEach(function(dot){

            //修正点的位置
            dot.x += dot.xa
            dot.y += dot.ya

            //修正点的偏移量
            dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
            dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;

            // 绘制所有点
            context.save();
            context.fillStyle='rgba(0,0,0,0)';
            
            context.beginPath();
            context.fillRect(dot.x,dot.y,2,2);        
            context.restore();

            // 遍历所有点包括鼠标点
            for(i=0;i<Alldots.length;i++){
                
                var d2 = Alldots[i]
                // 如果不为同一点，且鼠标不位于画板外，则比较两点之间的距离
                if(dot!==d2 || d2.x != null || d2.y != null)
                {
                    var x = dot.x - d2.x        //两点之间的水平距离
                    var y = dot.y - d2.y        //两点之间的垂直距离

                    var length = x*x + y*y      //两点之间的距离平方
                    // 计算一点相对于另一点的距离比，据此绘制线宽，与透明度
                    var ratio = (d2.max-length)/d2.max
                    //如果两点之间距离小于临界值，则两点画线
                    if(length<d2.max){

                        // 如果遍历的点为鼠标点，则在距离之内的点被鼠标点吸引,规定吸引半径
                        // if(d2 === mouse && length>d2.max/1.8 && (d2.x!==null || d2.y!==null))
                        // {
                        //     dot.x-=x*0.03
                        //     dot.y-=y*0.03                                  
                        // }

                        // 连线
                        // context.save();
                        context.lineWidth=ratio*2;
                        context.beginPath();
                        context.strokeStyle='rgba(0,255,0,'+ (ratio+0.2)+')'
                        context.moveTo(dot.x, dot.y);
                        context.lineTo(d2.x, d2.y); 
                        context.stroke(); 
                        // context.restore();   
                    }
                }else{
                        alert(11)
                        console.log('出来了')
                      // 连线
                        // context.save();
                        context.lineWidth=ratio*2;
                        context.beginPath();
                        context.strokeStyle='rgba(0,255,0,'+ (ratio+0.2)+')'
                        context.moveTo(dot.x, dot.y);
                        context.lineTo(d2.x, d2.y); 
                        context.stroke(); 
                        // context.restore();   
                }

            }                   

            
        })
        window.requestAnimationFrame(animate)
    }


}
