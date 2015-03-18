_ = require 'Underscore'
Backbone = require 'Backbone'
Utils = require 'threenodes/utils/Utils'
CodeExporter = require 'threenodes/utils/CodeExporter'

require 'libs/BlobBuilder.min'
require 'libs/FileSaver.min'
require 'libs/json2'

class FileHandler extends Backbone.Events
  constructor: (@core) ->
    _.extend(FileHandler::, Backbone.Events)

  saveLocalFile: () =>
    bb = new BlobBuilder()
    result_string = @getLocalJson()
    bb.append(result_string)
    fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.json")

  exportCode: () =>
    # get the json export and convert it to code
    json = @getLocalJson(false)
    exporter = new CodeExporter()
    res = exporter.toCode(json)

    bb = new BlobBuilder()
    bb.append(res)
    fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.js")

  getLocalJson: (stringify = true) =>
    res =
      uid: @ncore.odes.indexer.getUID(false)
      nodes: jQuery.map(@core.nodes.models, (n, i) -> n.toJSON())
      connections: jQuery.map(@core.nodes.connections.models, (c, i) -> c.toJSON())
      groups: jQuery.map(@core.group_definitions.models, (g, i) -> g.toJSON())

    if stringify
      return JSON.stringify(res)
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
