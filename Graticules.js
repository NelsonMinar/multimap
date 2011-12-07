// Graticules for Polymaps: latitude/longitude lines
// Started as cut and paste from Grid.js in Polymaps,
// Nelson Minar <nelson@monkey.org> licensed as Polymaps itself.

var zero = {x: 0, y: 0};
po.graticules = function() {
  var grid = {},
      map,
      g = po.svg("g");

  g.setAttribute("class", "graticules");

  function move(e) {
    var p,
        line = g.firstChild,
        label = null,
        size = map.size(),
        nw = map.pointLocation(zero),
        se = map.pointLocation(size),
        step = Math.pow(2, 8 - Math.round(map.zoom())),
        prec = 0;

    if      (map.zoom() == 9)  { prec = 1; }
    else if (map.zoom() == 10)  { prec = 2; }
    else if (map.zoom() == 11) { prec = 3; }
    else if (map.zoom()  > 11) { prec = 4; }

    // Round to step.
    nw.lat = Math.floor(nw.lat / step) * step;
    nw.lon = Math.ceil(nw.lon / step) * step;
    var orignw = { lat: nw.lat, lon: nw.lon };

    // Longitude ticks.
    for (var x; (x = map.locationPoint(nw).x) <= size.x; nw.lon += step) {
      if (!line) line = g.appendChild(po.svg("line"));
      line.setAttribute("x1", x);
      line.setAttribute("x2", x);
      line.setAttribute("y1", 0);
      line.setAttribute("y2", size.y);
      label = line.nextSibling;

      if (!label) label = g.appendChild(po.svg("text"));
      label.setAttribute("x", x + 2);
      label.setAttribute("y", map.locationPoint(orignw).y + 12);
      label.textContent = "" + nw.lon.toFixed(prec);

      line = label.nextSibling;
    }

    // Latitude ticks.
    for (var y; (y = map.locationPoint(nw).y) <= size.y; nw.lat -= step) {
      if (!line) line = g.appendChild(po.svg("line"));
      line.setAttribute("y1", y);
      line.setAttribute("y2", y);
      line.setAttribute("x1", 0);
      line.setAttribute("x2", size.x);
      label = line.nextSibling;

      if (!label) label = g.appendChild(po.svg("text"));
      label.setAttribute("x", map.locationPoint(orignw).x + 2);
      label.setAttribute("y", y + 10);
      if (y == map.locationPoint(orignw).y) {
        label.textContent = "";  // don't show top latitude (collides with longitude)
      } else {
        label.textContent = "" + nw.lat.toFixed(prec);
      }

      line = label.nextSibling;
    }

    // Remove extra ticks.
    while (line) {
      var next = line.nextSibling;
      g.removeChild(line);
      line = next;
    }
  }

  grid.map = function(x) {
    if (!arguments.length) return map;
    if (map) {
      g.parentNode.removeChild(g);
      map.off("move", move).off("resize", move);
    }
    if (map = x) {
      map.on("move", move).on("resize", move);
      map.container().appendChild(g);
      map.dispatch({type: "move"});
    }
    return grid;
  };

  return grid;
};