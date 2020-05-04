
book()
function book(){
    //获取邮箱输入框
    var emailInput = document.getElementById('emailInput')
    //获取正确与错误的图标字体容器
    var testEmailContainer = document.getElementById('testEmail')

    //获取两个数用来相乘
    // var number1 = document.getElementById('number1').value
    var number2 = document.getElementById('number2').value

    //生成乘法表按钮
    var showMulti = document.getElementById('showMulti')
    //清屏按钮
    var clearMulti = document.getElementById('clearMulti')
    //乘法表容器
    var multiContainer = document.getElementById('multiContainer')

    document.getElementById("score").addEventListener('focus',function(){
        //绑定键盘响应函数
        document.onkeydown= function(event){
        if(event&&event.keyCode==13){
             //获取成绩输入框内容
            var value = document.getElementById("score").value
            assessScore(value)
        }
    }
    document.getElementById("score").addEventListener('blur',function(){
        document.onkeydown = null
    })
})
  
    function assessScore(value){
        //根据传进来的值，更新文本
        var isNum = isNum(value)
        //获取文本容器，更新文本
        var assessScore = document.querySelector("#assessScore>span")

        if(isNum&&(0<=+value<=100)){
            if((+value)>=90){
                assessScore.innerHTML = '你真棒！你获得了优秀！'
            }else if((+value)>=80&&(+value)<90){
                assessScore.innerHTML = '真不错！你的成绩是良好！'
            }else if((+value>=60)&&(+value)<80){
                assessScore.innerHTML = '还有上升的空间，你的成绩是及格'
            }else{
                assessScore.innerHTML = '真是抱歉！这次你没及格，下次努力吧！'
            }
        }else{
            alert('请输入有效的成绩！')
        }
        //判断输入的是否为数字
        function isNum(value){
            var reNum=/^\d*$/;
            return(reNum.test(value));
        }

    }
     //判断邮箱格式是否正确
    emailInput.addEventListener('input',function(){
        var email = emailInput.value
        testEmail(email)
    })
    // 检验邮箱的格式
     function testEmail(email){
        //检验邮箱的正则表达式
        var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if(pattern.test(email)){
            testEmailContainer.innerHTML =  '<use xlink:href="#icon-bianzu"></use>'
        }else{
            testEmailContainer.innerHTML =  '<use xlink:href="#icon-cuowu"></use>'
        }
    }

    // 生成乘法表
    showMulti.onclick = function(){
        var number1 = document.getElementById('number1').value
        console.log(number1)
        multiShow(number1)
    }
    clearMulti.onclick = function(){
        multiContainer.innerHTML = ''
    }
    //乘法表
    function multiShow(num1){
        //动态渲染dom元素
        for(var i =1;i<=num1;i++){
            for(var j=1;j<=i;j++){
                let span = document.createElement('span')
                span.innerText = j +'*'+ i
                multiContainer.appendChild(span)
            }
            let space = document.createElement('br')
            multiContainer.appendChild(space)
        }
    }

    //测试书本的显示与隐藏
    var booktest = document.getElementById('test')
    var book = document.getElementById('book')
    var cancleView = document.getElementById('cancleView')
    //表示书本是否显示
    var bookShow = false
    booktest.onclick = function(){
        if(!bookShow){
            book.style.animation = 'bookShow 2s cubic-bezier(.62,1.61,.92,.72)'
            book.style.opacity = '1'
            book.style.display = 'block'
            booktest.style.display = 'none'
            book.addEventListener('animationend',function(){
                book.style.animation = ''
                book.style.width = '500px'
                book.style.height = '600px'
                book.style.right = '0'
                book.style.overflow = 'visible'
                book.style.display = 'block'
                book.style.opacity = '1'
                booktest.style.display = 'none'
            })
        }
        bookShow = !bookShow
    }
    cancleView.onclick = function(){
        if(bookShow){
            book.style.overflow = 'hidden'
            book.style.animation = 'bookHide 2s cubic-bezier(.28,.45,.52,-0.61)'
        }
        book.addEventListener('animationend',function(){
            book.style.animation = ''
            book.style.width = '460px'
            book.style.height = '500px'
            book.style.right = '-550px'
            book.style.top   =  '140px'
            book.style.overflow = 'hidden'
            book.style.opacity='0'
            book.style.display = 'none'
            booktest.style.display = 'block'
        })
        bookShow = !bookShow
    }
}