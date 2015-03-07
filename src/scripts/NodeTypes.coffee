# Require node types here to avoid circular dependency between
# Node, Group and Nodes collection.
module.exports =
  Base: require 'threenodes/nodes/models/components/Base'
  Conditional: require 'threenodes/nodes/models/components/Conditional'
  Code: require 'threenodes/nodes/models/components/Code'
  Geometry: require 'threenodes/nodes/models/components/Geometry'
  Lights: require 'threenodes/nodes/models/components/Lights'
  Materials: require 'threenodes/nodes/models/components/Materials'
  Math: require 'threenodes/nodes/models/components/Math'
  PostProcessing: require 'threenodes/nodes/models/components/PostProcessing'
  Three: require 'threenodes/nodes/models/components/Three'
  ConstructiveSolidGeometry: require 'threenodes/nodes/models/components/ConstructiveSolidGeometry'
  Utils: require 'threenodes/nodes/models/components/Utils'
  Spread: require 'threenodes/nodes/models/components/Spread'
  Particle: require 'threenodes/nodes/models/components/Particle'
  Group: require 'threenodes/nodes/models/components/Group'
