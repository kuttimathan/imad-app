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
var button = document.getElementById('counter')
button.onclick = function () {
    // Create a request
    var request = new XMLHTTPRequest();
    // Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState == XMLHTTPRequest.DONE) {
            if(request.status == 200) {
                var counter = request.responseText
                var span = document.getElementById('count')
                span.innerHTML = counter.toString();
            }
        }
    }
    // Make request
    request.open('Get', 'http://kuttimathan.imad.hasura-app.io/counter', true);
    request.send(null);
}
