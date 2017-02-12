module.exports = (req, resp, next) => {
  const code = resp.code || 200;
  logger.info(`${code} on ${req.path}`);
  next();
};
