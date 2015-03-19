_ = require 'Underscore'
Backbone = require 'Backbone'
Utils = require 'threenodes/utils/Utils'
CodeExporter = require 'threenodes/utils/CodeExporter'

require 'Blob'
require 'FileSaver'
#require 'libs/json2'

class FileHandler extends Backbone.Events
  constructor: (@core) ->
    _.extend(FileHandler::, Backbone.Events)

  saveLocalFile: () =>
    result_string = @getLocalJson()
    blob = new Blob([result_string], {"text/plain;charset=utf-8"})
    fileSaver = saveAs(blob, "nodes.json")

  exportCode: () =>
    # get the json export and convert it to code
    json = @getLocalJson(false)
    exporter = new CodeExporter()
    res = exporter.toCode(json)

    blob = new Blob([res], {"text/plain;charset=utf-8"})
    fileSaver = saveAs(blob, "nodes.js")

  getLocalJson: (stringify = true) =>
    res =
      uid: @core.nodes.indexer.getUID(false)
      nodes: jQuery.map(@core.nodes.models, (n, i) -> n.toJSON())
      connections: jQuery.map(@core.nodes.connections.models, (c, i) -> c.toJSON())
      groups: jQuery.map(@core.group_definitions.models, (g, i) -> g.toJSON())

    if stringify
      return JSON.stringify(res, null, 2)
    else
      return res

  loadFromJsonData: (txt) =>
    # Parse the json string
    loaded_data = JSON.parse(txt)
    @core.setNodes(loaded_data)

  loadLocalFile: (e) =>
    # Clear the workspace first
    @trigger("ClearWorkspace")

    # Load the file
    file = e.target.files[0]
    reader = new FileReader()
    self = this
    reader.onload = (e) ->
      txt = e.target.result
      # Call loadFromJsonData when the file is loaded
      self.loadFromJsonData(txt)
    reader.readAsText(file, "UTF-8")

module.exports = FileHandler
