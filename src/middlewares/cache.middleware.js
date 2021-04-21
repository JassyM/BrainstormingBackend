const mcache = require('memory-cache');
const { CACHE_KEY }  = require('../config');

module.exports = function(duration) {
  return (req, res, next) => {
    const key = CACHE_KEY + req.originalUrl || req.url;
    // se concatena el cache key con la url original que fue solicitada (es propiedad de express)
    // si no existe originalUrl, entonces se pone la url. (route->index => /v1/api )
    const cachedBody = mcache.get(key);

    if(cachedBody) { // si ya existe una caché creada con ese key
      return res.send(JSON.parse(cachedBody)); // se retorna esa info caché
    } else { // si no, se cachea
      res.sendResponse = res.send;
      res.send = (body) => { // Cuando se ejecute el send, se tiene que enviar un body
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body); // y que el body se ponga en caché.
      };
      next();
    }
  }
}