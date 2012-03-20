define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.CodeExporter
    toCode: (json) =>
      res = "//\n"
      res += "// code exported from ThreeNodes.js (github.com/idflood/ThreeNodes.js)\n"
      res += "//\n\n"
      res += "require.config({paths: {jQuery: 'loaders/jquery-loader',Underscore: 'loaders/underscore-loader',Backbone: 'loaders/backbone-loader'}});"
      res += "require(['order!threenodes/App', 'order!libs/jquery-1.6.4.min', 'order!libs/underscore-min', 'order!libs/backbone'], function(App) {"
      res += "\n\n"
      res += '"use strict";\n'
      res += "var app = new App();\n"
      res += "var nodegraph = app.nodegraph;\n\n"
      res += "//\n"
      res += "// nodes\n"
      res += "//\n"
      
      for node in json.nodes
        res += @nodeToCode(node)
      
      res += "\n"
      res += "//\n"
      res += "// connections\n"
      res += "//\n\n"
      
      for connection in json.connections
        res += @connectionToCode(connection)
        
      res += "\n\n"
      res += "// set player mode\n"
      res += "app.setDisplayMode('SetDisplayModeCommand', true);\n"
      res += "});"
      return res
    
    nodeToCode: (node) =>
      anim_to_code = (anims) ->
        res = "{\n"
        for propName of anims
          res += "\t\t" + "'#{propName}' : [\n"
          for anim in anims[propName]
            res += "\t\t\t" + "{time: #{anim.time}, value: #{anim.value}, easing: '#{anim.easing}'},\n"
          res += "\t\t" + "],\n"
        res += "\t}"
        return res
      
      fields_to_code = (fields) ->
        res = "{'in': [\n"
        for field in fields.in
          if field.val
            res += "\t\t{name: '#{field.name}', val: #{field.val}},\n"
          else
            res += "\t\t{name: '#{field.name}'},\n"
        res += "\t]}"
        res
      
      res = "\n// node: #{node.name}\n"
      res += "var node_#{node.nid}_data = {\n"
      res += "\t" + "nid: #{node.nid},\n"
      res += "\t" + "name: '#{node.name}',\n"
      res += "\t" + "type: '#{node.type}',\n"
      res += "\t" + "x: #{node.x},\n"
      res += "\t" + "y: #{node.y},\n"
      res += "\t" + "fields: #{fields_to_code(node.fields)},\n"
      res += "\t" + "anim: #{anim_to_code(node.anim)}\n"
      res += "};\n"
      res += "var node_#{node.nid} = nodegraph.create_node(node_#{node.nid}_data);\n"
      return res
    
    connectionToCode: (connection) ->
      res = "var connection_#{connection.id}_data = {\n"
      res += "\t" + "id: #{connection.id},\n"
      res += "\t" + "from_node: #{connection.from_node}, from: '#{connection.from}',\n"
      res += "\t" + "to_node: #{connection.to_node}, to: '#{connection.to}'\n"
      res += "};\n"
      res += "var connection_#{connection.id} = nodegraph.createConnectionFromObject(connection_#{connection.id}_data);\n"
      res
