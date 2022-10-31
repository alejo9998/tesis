var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/algo/:idGateway', function(req, res, next) {
  
  res.send({message: 'respond with a resource de algo', idGateway: 123});
});

module.exports = router;
