define (require) ->
  # Require node types here to avoid circular dependency between
  # Node, Group and Nodes collection.
  require 'cs!threenodes/nodes/models/components/Base'
  require 'cs!threenodes/nodes/models/components/Conditional'
  require 'cs!threenodes/nodes/models/components/Geometry'
  require 'cs!threenodes/nodes/models/components/Lights'
  require 'cs!threenodes/nodes/models/components/Materials'
  require 'cs!threenodes/nodes/models/components/Math'
  require 'cs!threenodes/nodes/models/components/PostProcessing'
  require 'cs!threenodes/nodes/models/components/Three'
  require 'cs!threenodes/nodes/models/components/ConstructiveSolidGeometry'
  require 'cs!threenodes/nodes/models/components/Utils'
  require 'cs!threenodes/nodes/models/components/Spread'
  require 'cs!threenodes/nodes/models/components/Particle'
  require 'cs!threenodes/nodes/models/components/Group'
