{inspect} = require 'util'
curry = (fn, args...) -> fn.bind fn.prototype, args...
chalk = require 'chalk'

log = (color, args...) ->
  # Build a deep string representation of the objects in 'args'
  msgs = args.map (a) ->
    if (typeof a) is 'string' then a else inspect a, null, null

  # If 'color' is known to 'chalk'
  if chalk[color]
    msgs = msgs.map (m) -> chalk[color] m

  console.log msgs...

logger = curry log, null

for color in ['white', 'grey', 'black', 'blue', 'cyan', 'green', 'magenta', 'red', 'yellow']
  logger[color] = curry log, color

module.exports = logger
