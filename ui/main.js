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
//Button
var counter = 0;
var element = document.getElementById('counter')
button.onclick = function () {
    // Make a request to counter end-point
    // Capture the response and store it in a variable
    // Render the variable in the correct span
    counter = counter + 1;
    var span = document.getElementById('span')
    span.innerHTML = counter.toString();
}
