var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/echo", function (req, res) {
  var speech =
    req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  console.log(req.body);
  return res.json({
    source: "webhook-echo-sample"
  });
});
router.get('/getName', function (req, res) {
  res.send('Swarup Bam');
});
router.post('/getMovies', function (request, response) {
  if (request.body.result.parameters['top-rated']) {
    var req = unirest("GET", "https://api.themoviedb.org/3/movie/top_rated");
    req.query({
      "page": "1",
      "language": "en-US",
      "api_key": ""
    });
    req.send("{}");
    req.end(function (res) {
      if (res.error) {
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify({
          "speech": "Error. Can you try it again ? ",
          "displayText": "Error. Can you try it again ? "
        }));
      } else if (res.body.results.length > 0) {
        let result = res.body.results;
        let output = '';
        for (let i = 0; i < result.length; i++) {
          output += result[i].title;
          output += "\n"
        }
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify({
          "speech": output,
          "displayText": output
        }));
      }
    });
  }
});

module.exports = router;
