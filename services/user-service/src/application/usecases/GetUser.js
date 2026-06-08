class GetUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.toJSON();
  }

  async executeAll() {
    const users = await this.userRepository.findAll();
    return users.map(u => u.toJSON());
  }
}

module.exports = GetUser;