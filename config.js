class Config {
  constructor() {
    this.env = process.env.NODE_ENV || 'local';
    this.port = process.env.PORT || 8080;
  }
}




module.exports = new Config();
