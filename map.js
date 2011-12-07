var mapLocationInUrl = location.hash != "";
var po = org.polymaps;
var loadedMaps = [];
var map = null;
var compass = null;
var graticules = null;

function openmaps() {
    addBasemaps(["migurskiFull", "migurskiBg", "openCyclemap", "topOSM"]);
}

function othermaps() {
    addBasemaps(["googleTerrain", "bingTerrainLabels", "bing838", "googleStreet", "googleSatellite"]);
}

// Utility function for adding a list of base maps to the map
function addBasemaps(basemaps) {
    for (var i = 0; i < basemaps.length; i++) {
        var bm = po.basemaps[basemaps[i]];
        if (bm && bm.map) { map.add(po.basemaps[basemaps[i]]); }
        loadedMaps.push(basemaps[i]);
    }

    // Add the decorations after all the base maps, so they show on top
    map.add(po.graticules());
    map.add(po.compass());

    // Add the HTML buttons to switch layers
    addButtons();
}

// Allow graticules to be hidden
graticulesHidden = false;
function toggleGraticules() {
    graticulesHidden = !graticulesHidden;
    d3.selectAll(".graticules").style("display", graticulesHidden ? "none" : null);
}

// Utility function to add HTML buttons to map
function addButtons() {
    var buttonData = [];
    for (var i = 0; i < loadedMaps.length; i++) {
        var map = po.basemaps[loadedMaps[i]];
        buttonData.push({ t: map.source.desc,
                          f: map.switchTo });
    }
    buttonData.push({ t: "&nbsp;",
                      c: "spacer" });
    buttonData.push({ t: "Toggle graticules", 
                      f: toggleGraticules });

    // Create some clickable buttons for the baselayers
    d3.selectAll("#buttonbox").selectAll("div").remove();
    d3.selectAll("#buttonbox")
        .selectAll("div")
        .data(buttonData, function(d) { return d.t; })
      .enter()
        .append("div")
        .html(function(d) { return d.t })
        .attr("class", function(d) { if (d.c) { return d.c; } })
        .on("click", function(d) { if (d.f) { return d.f(); } });

    // Allow the button box to be hidden
    var buttonBoxHidden = false;
    d3.select("#button-control").on("click", function(d) {
        buttonBoxHidden = !buttonBoxHidden;
        d3.select("#buttonbox").style("display", buttonBoxHidden ? "none" : null); });
}

// Some key bindings for advanced users
// 1-9 switches map layer. g toggles graticules
function keyboardHandler(e) {
    if (e.keyCode == 71) {
        toggleGraticules();
    } else if (e.keyCode >= 49 && e.keyCode <= 57) {
        var selectedMap = e.keyCode - 49;
        if (selectedMap < loadedMaps.length) {
            po.basemaps[loadedMaps[selectedMap]].switchTo();
        }
    }
}


// Top level entry: make the map
function makeMap() {
    // Construct our map object
    map = po.map()
        .container(document.getElementById("map").appendChild(po.svg("svg")))
        .add(po.dblclick())
        .add(po.drag())
        .add(po.arrow())
        .add(po.wheel().smooth(false))
        .add(po.hash())
        .add(po.touch().rotate(false));

    // Center the map on the SF Bay Area if a location isn't specified
    if (!mapLocationInUrl) {
        map.center({lon: -122.2, lat: 37.8});
        map.zoom(10);
    }

    // Add some base maps
    openmaps();
    // othermaps();   // disabled pending license review

    // Choose which map is visible first
    po.basemaps.migurskiFull.switchTo();

    // Bind some keyboard events
    window.addEventListener("keydown", keyboardHandler, true);
}

