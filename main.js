
page()
function page(){
    //获取菜单项
    var menuItems = document.getElementsByClassName('menuItem')
    var menuItemUps = document.querySelectorAll('#menu .menuTextUp')
    //获取轮播项
    var contentItem = document.querySelectorAll('#content>li')
    var oldIndex = 0
    for(let i=0;i<menuItems.length;i++){
        menuItems[i].addEventListener(('click'),function(){
            for(let i =0;i<menuItems.length;i++){
                menuItemUps[i].classList.remove('menuItemActive')
            }  
            menuItemUps[i].classList.add('menuItemActive')
            move(i)
            console.log(i)
        })
    }
    function move(index){
        if(index>oldIndex){
            for(let i=0;i<contentItem.length;i++){
                contentItem[i].classList.remove('leftShow')
                contentItem[i].classList.remove('rightHide')
                contentItem[i].classList.remove('rightShow')
                contentItem[i].classList.remove('leftHide')
                contentItem[i].classList.remove('active')
            }
            contentItem[oldIndex].classList.add('leftHide')
            contentItem[index].classList.add('rightShow')
            contentItem[index].classList.add('active')
        }
       else{
            for(let i=0;i<contentItem.length;i++){
                contentItem[i].classList.remove('leftShow')
                contentItem[i].classList.remove('rightHide')
                contentItem[i].classList.remove('rightShow')
                contentItem[i].classList.remove('leftHide')
                contentItem[i].classList.remove('active')
            }
            contentItem[oldIndex].classList.add('rightHide')
            contentItem[index].classList.add('leftShow')
            contentItem[index].classList.add('active')
        }
        oldIndex = index
    }
}