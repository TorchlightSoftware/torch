logger = require '..'

logger.red 'hi'
logger.gray 'stuff:'.yellow, {foo: {bar: {baz: 1}}}
logger {user: {first: 'Bill', last: 'Nye'}}

