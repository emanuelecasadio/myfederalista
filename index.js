const express  = require('express');
const crypto = require('crypto');
const app = express();

function getRandomByName(name, min, max) {
    const hash = crypto.createHash('sha256');
    hash.update(name);
    let uint26 = hash.digest().readUInt16BE(0, 6);
    let number = uint26/65535 * (max-min) + min;
    return number.toFixed(2);

}

app.set('view engine', 'ejs');

app.get(/^\/[^.]*$/, (req, res) => {
  let name = req.query.name || req.path.substring(1);
  name = name.trim().replace("%20", " ").replace("+", " ");

  if(!name || name==""){
      res.render('index.ejs', {});
  } else {
      res.render('cm.ejs', {
          name: name,
          cm: getRandomByName(name, 5, 20)
      });
  }
});

app.use(express.static('static'));

app.listen((process.env.PORT || 8080));
