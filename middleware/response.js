module.exports = (req, res, next) => {

  if (!res.code && !req.route && !res.result) {
    res.code = 404;
  }

  if (!res.result) {
    res.result = [];
  }

  if (res.redirect_url) {
    res.code = 302;
  }

  var data = {
    code: res.code || 200,
    event_id: req._event_id,
    total_results: res.count || res.result.length,
    result: res.result,
    current_at: Date.now()
  };

  res.status(data.code).json(data);
  next();
};
