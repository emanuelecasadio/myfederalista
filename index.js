const express  = require('express');
const mongoose = require('mongoose');
const app = express();
const Person = require('models/person');

function getRandomArbitrary(min, max){
  return Math.random() * (max-min)+min;
}

mongoose.connect(process.env.MONGODB_URI);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs', {});
});

app.get(/\/(?!\s*$).+/, (req, res) => {
  let name = req.query.name || req.path.substring(1);

  Person.findOne({name}).exec()
  .then(person => {
    if(!person){
      person = new Person({
        name,
        cm: getRandomArbitrary(10, 30);
      });
      person.save()
      .then(()=>{;})
      .catch(err=>{logger.error(err)});
    }
    res.render('cm.ejs', {
      name,
      cm: cm.toFixed(1)
    });
  })
  .catch(err => {
    logger.error(err);
  });
});

app.use(express.static('static'));

app.listen((process.env.PORT || 8080));
