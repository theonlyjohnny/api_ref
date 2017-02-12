const express = require("express"),
  router = new express.Router();

router.get("/err", (req, resp, next) => {
  next(new Errors.DefaultError());
})

router.get("*", (req, resp, next) => {
  resp.result = 1;
  next();
})


module.exports = router;
