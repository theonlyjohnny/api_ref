const uuid = require("uuid");

module.exports = (req, resp, next) => {
  req._event_id = uuid.v4();
  next();
}
