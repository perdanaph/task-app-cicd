const RegisterUser = require('../../application/usecases/RegisterUser');
const LoginUser = require('../../application/usecases/LoginUser');
const GetUser = require('../../application/usecases/GetUser');

class UserController {
  constructor(userRepository) {
    this.registerUser = new RegisterUser(userRepository);
    this.loginUser = new LoginUser(userRepository);
    this.getUser = new GetUser(userRepository);
  }

  async register(req, res) {
    try {
      const user = await this.registerUser.execute(req.body);
      res.status(201).json(user);
    } catch (err) {
      const status = err.message.includes('already') ? 409 : 400;
      res.status(status).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const result = await this.loginUser.execute(req.body);
      res.json(result);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await this.getUser.execute(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const users = await this.getUser.executeAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;