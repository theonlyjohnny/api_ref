module.exports = (err, req, resp, next) => {
  let code = resp.code || err.code || 500;
  const message = require("http").STATUS_CODES[code];
  if (code >= 500) {
    logger.error(`${message} on ${req.path} -- ${err.stack}`);
  }
  if (code >= 400 && code > 500) {
    logger.warn(`${message} on ${req.path} -- ${err.stack}`);
  }

  const data = {
    code: code,
    event_id: req._event_id,
    message: message
  }

  resp.status(code).json(data);
}
