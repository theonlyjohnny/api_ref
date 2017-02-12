const express = require("express"),
  fs = require("fs"),
  app = express(),
  logger = require("logger"),
  config = require("./config.js"),
  errors = require("./errors.js"),
  middleware = ['event_id', 'response', 'connect', 'errorHandle'];
//use order you want them to apply in

global.logger = logger;
global.Errors = errors;

logger.log(`Server running on '${config.env}' env`);


const setupRoutes = () => {
  fs.readdirSync("./routes").forEach((rt) => {
    rt = rt.split(".")[0];
    try {
      app.use(`/${rt}`, require(`./routes/${rt}.js`));
      logger.info(`Registered '${rt}' route`);
    } catch (err) {
      logger.error(`Could not register '${rt}' route -- ${err} \n ${err.stack}`);
    }
  })
}

const setupMiddleware = () => {
  middleware
    .forEach((name, i) => {
      try {
        app.use(require(`./middleware/${name}.js`))
        logger.info(`Successfully registered ${name} middleware`);
      } catch (err) {
        logger.error(`Could not register ${name} middleware`);
      }
    })
}

setupRoutes();
setupMiddleware();

app.listen(config.port, () => {
  logger.log(`Server listening on port ${config.port}`);
})
