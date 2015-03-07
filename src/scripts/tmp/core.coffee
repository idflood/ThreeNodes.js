Card = require './modules/Card'
class Core
  constructor: (name = 42) ->
    console.log("hello from UI" + name)

# Export submodules
Core.Card = Card

module.exports = Core
