const { authService } = require("../services");

const authController = {
  async register(req: Request, res: Response, next: any) {
    try {
      authService.register();
    } catch (error) {}
  },
};

module.exports = authController;
