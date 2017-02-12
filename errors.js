const http = require("http");

Object.keys(http.STATUS_CODES).forEach(function(code) {
  var http_message = http.STATUS_CODES[code];
  var name = http_message.replace(/\s+/g, "");
  // logger.info("//  " + name + " (" + code + ")" );
  module.exports[name] = class extends Error {
    constructor(message) {
      if (typeof(message) === 'string') {
        super(message);
      } else if (typeof(message) === 'object') {
        super();
        if (message.stack) {
          this.stack = message.stack;
        }
        if (message.message) {
          this.message = message.message;
        } else {
          this.message = http_message;
        }
      } else {
        super(http_message);
      }
      this.code = code;
    };
  };
});

module.exports.DefaultError = class DefaultError extends Error {
  constructor(err) {
    var code = 500;
    if (typeof(err) === 'string') {
      super(err);
    } else if (typeof(err) === 'object') {
      super();
      if (err.stack) {
        this.stack = err.stack;
      }
      if (err.code) {
        code = err.code;
      }
      if (err.message) {
        this.message = err.message;
      } else {
        this.message = http.STATUS_CODES[code];
      }
    } else {
      super(http.STATUS_CODES[code]);
    }
    this.code = code;
  };
};
