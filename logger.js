const path = require("path"),
  winston = require("winston"),
  PROJECT_ROOT = path.join(__dirname, "."),
  logger = new winston.Logger({
    level: 5,
    transports: [
      new(winston.transports.Console)({
        level: 'verbose',
        colorize: true,
        timestamp: true,
        exitOnError: false
      })
    ]
  })


class Logger {
  constructor() {

    this.err = this.error;
    this.log = this.info;

    this.doLog = this.doLog.bind(this);

    this.logger = logger;
  }

  getStackInfo(stackIndex) {
    var stacklist = (new Error()).stack.split('\n').slice(3)
    var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
    var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi

    var s = stacklist[stackIndex] || stacklist[0]
    var sp = stackReg.exec(s) || stackReg2.exec(s)

    if (sp && sp.length === 5) {
      return {
        method: sp[1],
        relativePath: path.relative(PROJECT_ROOT, sp[2]),
        line: sp[3],
        pos: sp[4],
        file: path.basename(sp[2]),
        stack: stacklist.join('\n')
      }
    }
  }



  mkLogArgs(depth, args) {
    var level = args[0];
    args = args[1];
    var stackInfo = this.getStackInfo(depth);
    let _args = [];
    Object.keys(args)
      .forEach((i) => {
        if (typeof args[i] !== 'string') {
          _args.push(JSON.stringify(args[i]))
        } else {
          _args.push(args[i]);
        }
      })
    args = _args;

    if (stackInfo) {
      var calleeStr = '[' + stackInfo.relativePath + ':' + stackInfo.line + ']';

      if (typeof(args[0]) === 'string') {
        args[0] = calleeStr + ' ' + args[0];
      } else {
        args.unshift(calleeStr);
      }
    }

    args.unshift(level);
    return args;
  }

  doLog() {
    const logs = this.mkLogArgs(2, arguments);
    this.logger.log(logs[0], logs[1]);
  }

  info() {
    this.doLog('info', arguments);
  }

  debug() {
    this.doLog('verbose', arguments);
  }

  warn() {
    this.doLog('warn', arguments);
  }

  error() {
    this.doLog('error', arguments);
  }
}

module.exports = new Logger();
