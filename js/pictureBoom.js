
var pictureBox = document.querySelectorAll('.pictureItem')
//图片列表
const allPicture = ['./img/spring1.jpg','./img/spring2.jpg','./img/summer1.jpeg','./img/summer2.jpeg','./img/autumn1.jpeg','./img/autumn2.jpeg','./img/winter1.jpeg','./img/winter2.jpeg']
for(let i=0;i<pictureBox.length;i++){
    pictureBoom(pictureBox[i],allPicture.slice((2*i),2*i+2))
}
function pictureBoom(picturueBox,pictureList){

    // 图片炸裂的效果
    //图片下标
    var index = 0
    //参数：行，列。将图片分为几行几列
    // pictureMainBoom(15,15)

    // 创建div用来盛放图片
    var pictureContainer = document.createElement('div')
    pictureContainer.style.background = 'url('+pictureList[0]+')'
    picturueBox.appendChild(pictureContainer)
    function pictureMainBoom(l,r){

        //设置for循环，用来动态生成小图片
        for(var i = 0 ;i<l;i++){
            for(var j = 0;j<r;j++){
                
                //生成单个小图片
                var sPicture = document.createElement('div')

                //设置位置,尺寸信息
                sPicture.style.background = 'url(' + pictureList[index] +')'
                sPicture.style.width = picturueBox.clientWidth/l + 'px'
                sPicture.style.height = picturueBox.clientHeight/r + 'px'
                sPicture.style.left = (picturueBox.clientWidth/l)*j + 'px'
                sPicture.style.top = (picturueBox.clientHeight/r)*i + 'px'
                sPicture.style.backgroundPositionX = (picturueBox.clientWidth/l)*(-j) + 'px'
                sPicture.style.backgroundPositionY = (picturueBox.clientHeight/r)*(-i) + 'px'
                sPicture.style.transition = (Math.random()*1 + 1) +'s'

                //将小图片插入到容器中
                pictureContainer.appendChild(sPicture)
            }
        }
    }
      //获取所有的小图片，进行操作其transform
      var allPicture = pictureContainer.children

      //绑定事件监听
      pictureContainer.addEventListener('click',function(){
         pictureMainBoom(15,15)
          //遍历所有的小图片
          index ++
          index = index>pictureList.length-1?0:index
          for(let i=0;i<allPicture.length;i++){
              let rond = Math.random()*300
              allPicture[i].style.transform = ' perspective(800px) rotateX(+' + rond+'deg)' + ' rotateY(+' + rond+'deg)'+' rotateZ(+' + rond+'deg)'+ ' translateX(+' + rond/3+'px)' +' translateY(+' + rond/3+'px)' +' translateZ(+' + rond/3+'px)'
              allPicture[i].style.opacity = 0
          }
          pictureContainer.style.background = 'url('+pictureList[index]+')'
          var timer1 = setTimeout(function(){
              pictureContainer.innerHTML = ''
              clearTimeout(timer1)
          },2000)
      })
      
}
