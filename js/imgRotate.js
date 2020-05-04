imgRotate()
function imgRotate(){
    //获取图片外部容器
    var imgContainer = document.querySelectorAll('#studyImg >div')
    var img = document.querySelectorAll('#studyImg>div>img')
    var div = document.querySelectorAll('#studyImg>div>div')
    for(let i=0;i<imgContainer.length;i++){
        imgContainer[i].addEventListener('mouseenter',function(){
            img[i].style.animation = 'studyImgHide 1s cubic-bezier(.52,1.65,.83,.67)'
            img[i].style.transform = 'rotateY(180deg)'
            div[i].style.animation = 'studyDivShow 1s cubic-bezier(.52,1.65,.83,.67)'
            div[i].style.transform = 'rotateY(0deg)'
        })
        imgContainer[i].addEventListener('mouseleave',function(){
            img[i].style.animation = 'studyImgShow 1s cubic-bezier(.52,1.65,.83,.67)'
            img[i].style.transform = 'rotateY(0deg)'
            div[i].style.animation = 'studyDivHide 1s cubic-bezier(.52,1.65,.83,.67)'
            div[i].style.transform = 'rotateY(180deg)'
        })
    }
}