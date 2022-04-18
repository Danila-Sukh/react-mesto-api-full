class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statucCode = 401;
  }
}

module.exports = UnauthorizedError;
