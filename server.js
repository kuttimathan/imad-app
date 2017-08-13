var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var contents = {
    'contact': {
      title: 'Contact Us',
      heading: 'Address',
      address: 'Chennai, Tamilnadu',
      content: `
        <p>
            Please contact us at codebulls@gmail.com
        </p>
      `
    },
    'products': {
      title: 'Products',
      heading: 'Products',
      address: 'Chennai, Tamilnadu',
      content: `
        <p>
            Please contact us at codebulls@gmail.com
        </p>
      `
    },
    'aboutus': {
      title: 'About Us',
      heading: 'About Us',
      address: 'Chennai, Tamilnadu',
      content: `
        <p>
            Please contact us at codebulls@gmail.com
        </p>
      `
    }
}; 
function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var address = data.address;
    var content = data.content;
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container"> 
                <hr/>
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${address}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate
}

var counter = 0;
app.get('/counter', function (req, res) {
    counter= counter + 1;
    res.send(counter.toString());
});

var names = [];
//app.get('/submit-name/:name', function (req, res) {
//var name = req.params.name;
app.get('/submit-name', function (req, res) {
    var name = req.query.name;
    names.push(name);
    //JSON Javascript Object Notation - converting js scripts to string
    res.send(JSON.stringify(names));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:contentName', function (req, res) {
    var contentName = req.params.contentName;
    res.send(createTemplate(contents[contentName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80
//  res.send("Products Information Requested"); to send a text response rather than a file
//  res.sendFile(path.join(__dirname, 'ui', 'contact.html')); to send a file response


var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
