const { Router } = require('express');


// Todo lo siguiente funciona como una clase y
module.exports = function({ HomeController }) { // function hace de constructor
  const router = Router();

  router.get('/', HomeController.index);

  return router;
}