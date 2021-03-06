// Generated by CoffeeScript 1.10.0
(function() {
  var chalk, color, curry, depth, elapsedEnabled, getElapsed, i, inspect, lastTime, len, log, logger, ref,
    slice = [].slice;

  inspect = require('util').inspect;

  curry = function() {
    var args, fn;
    fn = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return fn.bind.apply(fn, [fn.prototype].concat(slice.call(args)));
  };

  chalk = require('chalk');

  log = function() {
    var args, color, msgs;
    color = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    msgs = args.map(function(a) {
      if ((typeof a) === 'string') {
        return a;
      } else {
        return inspect(a, {
          depth: depth
        });
      }
    });
    if (elapsedEnabled) {
      msgs = [getElapsed(), 'ms:'].concat(msgs);
    }
    if (chalk[color]) {
      msgs = msgs.map(function(m) {
        return chalk[color](m);
      });
    }
    return console.log.apply(console, msgs);
  };

  logger = curry(log, null);

  lastTime = null;

  getElapsed = function() {
    var elapsed, thisTime;
    thisTime = new Date;
    elapsed = lastTime ? thisTime - lastTime : 0;
    lastTime = thisTime;
    return elapsed;
  };

  elapsedEnabled = false;

  logger.toggleElapsed = function() {
    return elapsedEnabled = !elapsedEnabled;
  };

  depth = null;

  logger.setDepth = function(d) {
    return depth = d;
  };

  ref = Object.keys(chalk.styles);
  for (i = 0, len = ref.length; i < len; i++) {
    color = ref[i];
    logger[color] = curry(log, color);
  }

  module.exports = logger;

}).call(this);
