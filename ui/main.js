console.log('Loaded!');
//Change a field name
var element = document.getElementById('main-text')
element.innerHTML = 'CodeBulls Inc.'
//Move the Image
var img = document.getElementById('main-image')
function moveRight(){
    marginLeft = marginLeft + 10;
    img.style.marginRight = marginLeft + 'px';
}
img.onclick = function(){
    var interval = setInterval(moveRight, 100);
    //img.style.marginRight='200px'; One time move
}