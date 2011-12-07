##Multiple basemap viewer
by Nelson Minar &lt;nelson@monkey.org>

A web view for slippy miles of tiled maps, designed for quickly comparing multiple base layers. Designed to support projects like [Mike Migurski's OSM terrain layer](http://mike.teczno.com/notes/osm-us-terrain-layer/background.html), to make it easy to quickly view, bookmark, and compare map views.

For a live demo, see http://www.somebits.com/multimap/map.html

##Usage

The map works like a typical slippy map. Compass, mouse, and touch controls all pan and zoom. Note the URL auto-updates as you pan and zoom; you can copy and paste a link at any time and get the current view. Buttons on the right toggle what base layer is active. You can hide the purple graticules with the button, and you can collapse the buttons themselves by clicking the "Basemaps" title.

The code is designed to make it as simple as possible to add extra basemaps. If you want to add a map, simply add an entry to basemaps.js and then modify the openmaps() function in map.js to include it. See the [Polymaps docs](http://polymaps.org/docs/) for more information on how the URL templates work.

Installation is as simple as copying all the files to a web directory and serving them statically. No server code is required.

##Contents

###Original code

* map.html: HTML and style sheets for the map
* map.js: Main javascript for the map
* basemaps.js: defines specific raster base layers for polymaps
* Graticules.js: latitude / longitude guides, derived from Polymaps' Grid.js

###Third party code:

* [d3.js](https://github.com/mbostock/d3): DOM manipulation library 
* [polymaps.js](http://polymaps.org/): mapping library
