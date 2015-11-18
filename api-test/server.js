var express = require('express');
var app = express();
var port = process.env.PORT || 9000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/test');
var Dinosaur = require('./models/dinosaur');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Require the node module
var mustacheExpress = require('mustache-express');
// Tell Express to use the mustache engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
// Tell Express what folder to look in for the views
app.set('views', __dirname + '/views');

// app.get('/', function(req, res) {
//     res.send({message: 'We made an API!'});
// });
// app.get('/', function(req, res) {
//   res.render('index', {
//     title: 'Hey',
//     message: 'Hello there!'
//   });
// });
//
// app.get('/', function(req, res) {
//   res.render('test', {
//     header: 'To do list',
//     display: 'Buy more fruit',
//     display2: 'Do laundry',
//     display3: 'Vacuum floors'
//   });
// });
//
// app.get('/', function(req, res){
//   res.render('test', {
//     header: 'To do list',
//     display:  'Buy more fruit\n' + '\nDo laundry\n' + '\nVacuum floors\n'
//   });
// });

app.post('/dinosaurs', function(req, res) {
  var dino = new Dinosaur();
  dino.name = req.body.name;
  dino.save(function(err) {
    if (err)
      res.send(err);
    else
    res.json({
      message: 'Dino created!'
    });
  });
});

app.get('/dinosaurs', function(req, res) {
  Dinosaur.find(function(err, dinos) {
    if (err)
      res.send(err);

    res.json(dinos);
  });
});

app.delete('/dinosaurs', function(req, res) {
  var dinos = Dinosaur.find(function(err, dinos) {
    if (err)
      res.send(err);

    res.json(dinos);
  }
});

// app.get('/dinosaurs/:id', function(req, res) {
//   Dinosaur.findById(req.params.id, function(err, dinos) {
//     if (err)
//       res.send(err);
//     res.json(dinos);
//   });
// });
//
// app.post('/', function(req, res) {
//     res.send('POST request');
// });
//
// app.put('/', function(req, res) {
//     res.send('PUT request');
// });
//
// app.delete('/', function(req, res) {
//     res.send('DELETE request');
// });

app.listen(port);
console.log('We are on port ' + port + '. Check out localhost:9000!');
