const express = require('express');

let _express = null;
let _config = null;

class Server {

  constructor({ config, router }) { // config, router: El nombre exactamente igual a como se definió en container.js
    _config = config;
    _express = express().use(router);
  }

  start() {
    return new Promise(resolve => {
      _express.listen(_config.PORT, () => {
        console.log(`${_config.APPLICATION_NAME} API running on port ${_config.PORT}`);
      });

      resolve();
    });
  }
}

module.exports = Server;