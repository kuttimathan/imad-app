var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'kuttimathan',
    database: 'kuttimathan',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

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

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
//make a select request
//return response
pool.query("SELECT * FROM appdata", function (err, result){
    if (err) {
        res.status(500).send(err.toString());
    } else {
        res.send(JSON.stringify(result.rows));
    }
})
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//app.get('/:contentName', function (req, res) {
//    var co ntentName = req.params.contentName;
//    res.send(createTemplate(contents[contentName]));
//});

app.get('/contents/:contentName', function (req, res) {
    pool.query('SELECT * FROM appdata WHERE title = ' + req.params.contentName , function(err, result) {
       if(err) {
           res.status(500).send(err.toString());
       } else {
           if (result.rows.length === 0) {
               res.status(404).send("Data not found");
           } else {
               var contentData = result.rows[0];
               res.send(createTemplate(contentData));
           }
           
       }
    });
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
