let homeService = null;

class HomeController {
  constructor({ HomeService }) { // La inyección de HomeService la hace awilix
    // El nombre HomeService debe coincidir con el nombre del key que se agregó en
    // startup -> container.js -> container.register
    homeService = HomeService;
  }

  index(req, res) {
    return res.send(homeService.index());
  }
}

module.exports = HomeController;