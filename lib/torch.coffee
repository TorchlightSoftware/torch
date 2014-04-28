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

# timer functionality
lastTime = null
elapsed = (msg...) ->
  thisTime = new Date

  elapsed = if lastTime
    (thisTime - lastTime)
  else
    0

  logger.white elapsed, 'ms:', msg...
  lastTime = thisTime

logger.elapsed = elapsed

for color in Object.keys chalk.styles
  logger[color] = curry log, color

module.exports = logger
