define [
  'Underscore',
  'Backbone',
], (_, Backbone) ->
  #"use strict"

  namespace "ThreeNodes",
    Breadcrumb: class Breadcrumb extends Backbone.View
      initialize: () ->
        super
        @$el.click(@onClick)

      reset: () =>
        @items = []
        @$el.html("")

      set: (items) =>
        # items is an ordered array of groups
        @items = items
        @$el.html("<a href='#' data-gid='global'>Global</a>")
        for item in items
          name = item.get("name")
          gid = item.get("gid")
          @$el.append(" ▶ " + "<a href='#' class='grp' data-gid='#{gid}'>#{name}</a>")

      onClick: (e) =>
        gid = $(e.target).data("gid")
        if gid == "global"
          @trigger("click", "global")
