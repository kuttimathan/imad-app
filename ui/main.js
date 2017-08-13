console.log('Loaded!');
//Change a field name
var element = document.getElementById('main-text')
element.innerHTML = 'CodeBulls Inc.'
//Move the Image
var img = document.getElementById('main-image')
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 3;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function(){
    var interval = setInterval(moveRight, 50);
    //img.style.marginRight='200px'; One time move
}   
//alert('Hi There!');