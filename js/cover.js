// 开始遮盖层
function cover(){
    //获取遮盖层
    var cover = document.getElementById('startCover')
    var coverLeft = document.getElementById('startCoverLeft')
    var coverRight = document.getElementById('startCoverRight')
    var show = true //指示是否显示
    cover.style.display = 'block'
    if(show){
        coverLeft.style.animation = 'coverLeftShow 3s'
        coverRight.style.animation = 'coverRightShow 3s'
        show = false 
    }
    coverRight.addEventListener('animationend',function(){
        coverRight.style.animation = 'coverRightHide 3s'
    })
    coverLeft.addEventListener('animationend',function(){
        coverLeft.style.animation = 'coverLeftHide 3s'
    })

}