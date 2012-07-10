/* Various raster base map sources for Polymaps
 * by Nelson Minar <nelson@monkey.org> licensed as Polymaps itself.
 *
 * org.polymaps.basemaps is defined as an array of map objects. By default,
 * no map layers are visible. The switchTo() function is a convenience
 * method for activating that one layer to the exclusion of other layers,
 * and setting zoom range accordingly.
 * Usage:
 *   map.add(po.basemaps.googleTerrain);    // Add a possible basemap
 *   map.add(po.basemaps.googleSatellite);  // And a second
 *   po.basemaps.googleTerrain.switchTo();  // Make Google Terrain active
 *   po.basemaps.none.switchTo();           // Hide all base maps
 *   console.log(po.basemaps.active.source.desc);    // Log which map is active
 */

// This module fills the rasters variable in the Polymaps namespace.
org.polymaps.basemaps = {}

var po = org.polymaps;

/* Table of raster map sources. Inclusion is not evidence of a license to use these services.
 * url: a template string URL (in Polymaps format) or else a function that returns a URL for tile
 */
var sources = {
    migurskiFull: {
        desc: "Stamen (full)",
        zoomRange: [0, 20],
        url: po.url('http://{S}.tile.stamen.com/terrain/{Z}/{X}/{Y}.jpg').hosts(["a", "b", "c", "d"])
    },
    migurskiBg: {
        desc: "Stamen (bg)",
        zoomRange: [0, 20],
        url: po.url('http://{S}.tile.stamen.com/terrain-background/{Z}/{X}/{Y}.jpg').hosts(["a", "b", "c", "d"])
    },
    // http://maps.google.com/
    googleTerrain: {
        desc: "Google Terrain",
        zoomRange: [0, 15],
        url: 'http://mts1.google.com/vt/lyrs=t@128,r@179150048&hl=en&x={X}&y={Y}&z={Z}'
    },
    // http://maps.google.com/
    googleSatellite: {
        desc: "Google Satellite",
        zoomRange: [3, 21],      // seems to vary by area
        url: 'http://khm1.google.com/kh/v=100&x={X}&s=&y={Y}&z={Z}'
    },
    // http://maps.google.com/
    googleStreet: {
        desc: "Google Street",
        zoomRange: [3, 21],
        url: 'http://mt1.google.com/vt/lyrs=m@146&hl=en&x={X}&y={Y}&z={Z}'
    },
    // http://vfrmap.com/
    vfrmap: {
        desc: "VFR",
        zoomRange: [1, 11],
        url: tms("http://vfrmap.com/20110113/tiles/sectc/")
    },
    // http://vfrmap.com/
    ifrLow: {
        desc: "Low IFR",
        zoomRange: [1, 11],
        url: tms("http://vfrmap.com/20110113/tiles/ifrlc/")
    },
    // http://maps.cloudmade.com/
    // This API key belongs to Nelson Minar, marked "Experimentation".
    cloudmade: {
        desc: "Cloudmade",
        url: po.url("http://{S}tile.cloudmade.com/fd1d66b69b544618b08f9c9b1cea9e7b" +
                      "/998/256/{Z}/{X}/{Y}.png").hosts(["a.", "b.", "c.", ""]),
    },
    // http://www.openstreetmap.org/ NoName layer
    // This API key presumably belongs to OpenStreetMap
    osmNoname: {
        desc: "OSM NoName",
        url: po.url("http://{S}tile.cloudmade.com/fd093e52f0965d46bb1c6c6281022199" +
                      "/3/256/{Z}/{X}/{Y}.png").hosts(["a.", "b.", "c.", ""]),
    },
    // http://www.opencyclemap.org/ (OSM cycle layer)
    openCyclemap: {
        desc: "Open Cycle Map",
        zoomRange: [0, 16],
        url: po.url("http://c.tile.opencyclemap.org/cycle/{Z}/{X}/{Y}.png"),
    },
    // http://www.openstreetmap.org/ Mapnik layer
    osmMapnik: {
        desc: "OSM Mapnik",
        url: po.url("http://{S}tile.openstreetmap.org/{Z}/{X}/{Y}.png")
                .hosts(["a.", "b.", "c.", ""])
    },
    // http://www.openstreetmap.org/ OsmaRender layer
    osmOsmarender: {
        desc: "OSM Osmarender",
        url: po.url("http://b.tah.openstreetmap.org/Tiles/tile/{Z}/{X}/{Y}.png")
    },
    // http://viewer.nationalmap.gov
    usgs1: {
        desc: "USGS 1",
        url: po.url("http://basemap.nationalmap.gov/ArcGIS/rest/services/TNM_Vector_Fills_Small/MapServer/tile/{Z}/{Y}/{X}.png")
    },
    usgsFeatures: {
        desc: "USGS Features",
        url: po.url("http://basemap.nationalmap.gov/ArcGIS/rest/services/TNM_Vector_Small/MapServer/tile/{Z}/{Y}/{X}.png")
    },
    // Currently broken: Z scale looks to be off by 7? Also see Small_Scale
    usgsTerrain: {
        desc: "USGS Terrain",
        url: po.url("http://raster1.nationalmap.gov/ArcGIS/rest/services/TNM_Medium_Scale_Shaded_Relief/MapServer/tile/{Z}/{Y}/{X}.png")
    },
    topOSM: {
        desc: "topOSM",
        zoomRange: [3, 15], 
        url: po.url("http://tile1.toposm.com/us/color-relief/{Z}/{X}/{Y}.jpg")
    },
    // sources from Bing / VirtualEarth.net / MapPoint
    // https://www.bingmapsportal.com/
    bingTerrainLabels: {
        desc: "Bing Terrain",
        zoomRange: [1, 20],
        url: quadkey("http://ecn.t3.tiles.virtualearth.net/tiles/r{quadkey}?g=671&mkt=en-us&lbl=l1&stl=h&shading=hill&n=z")
    },
    bingTerrainNoLabels: {
        desc: "Bing Terrain Light",
        zoomRange: [1, 20],
        url: quadkey("http://ecn.t3.tiles.virtualearth.net/tiles/r{quadkey}?g=671&mkt=en-us&lbl=l0&stl=h&shading=hill&n=z")
    },
    bing838: {
        desc: "Bing 838",  // initially described as "Bing Facebook tiles"
        zoomRange: [1, 20],
        url: quadkey("http://ecn.t3.tiles.virtualearth.net/tiles/r{quadkey}?g=838&mkt=en-US&lbl=l0&stl=fb&shading=hill&n=z")
    },
    // http://blog.geoiq.com/2011/01/19/announcing-acetate-better-thematic-mapping/
    // tile server is definitely not for production
    acetatePreview: {
        desc: "Acetate Preview",
        url: po.url("http://acetate.geoiq.com/tiles/acetate-hillshading/{Z}/{X}/{Y}.png"),
    },
    // http://mapbox.com/blog/mapbox-streets-terrain/
    mapboxWarden: {
        desc: 'MapBox Warden',
        url: po.url("http://{S}.tiles.mapbox.com/v3/mapbox.mapbox-warden/{Z}/{X}/{Y}.jpg").hosts(["a", "b", "c", "d"])
    },
    mapboxTerrain: {
        desc: 'MapBox Terrain',
        url: po.url("http://{S}.tiles.mapbox.com/v3/examples.map-4l7djmvo/{Z}/{X}/{Y}.jpg").hosts(["a", "b", "c", "d"])
    },
};
// Populate the basemaps array
for (var k in sources) {
    // Construct a Polymaps map layer for each source
    po.basemaps[k] = po.image()
                       .id(k)
                       .url(sources[k].url)
                       .visible(false);

    // Store away the source data
    po.basemaps[k].source = sources[k];

    // Bind a switchTo() function for this raster source
    po.basemaps[k].switchTo = function() { var t = k; return function() {
        // Hide all raster sources
        for (var h in po.basemaps) { po.basemaps[h].visible(false); }

        // Set up the selected layer
        var s = po.basemaps[t];
        // Set the zoom range if the source defines it
        if (s.source.hasOwnProperty("zoomRange")) {
            s.map().zoomRange(s.source.zoomRange);
        } else {
            s.map().zoomRange([0, 30]);
        }
        // Make the selected raster visible
        s.visible(true);
        // Record that it's active
        po.basemaps.active = s;
        // TODO: extend the hash control to include selected layer
    }}();
}

// Shortcut to hide all layers
po.basemaps.none = { source: { desc: "No basemap" }};
po.basemaps.none.visible = function() {};
po.basemaps.none.switchTo = function() {
    for (var h in po.basemaps) { po.basemaps[h].visible(false); }
    po.basemaps.active = po.basemaps.none;
}

// State tracking which map is active
po.basemaps.active = po.basemaps.none;
po.basemaps.active.visible = function() {};

// Generic TMS URL function.
// See http://wiki.osgeo.org/wiki/Tile_Map_Service_Specification
function tms(base) {
    return function (c) {
        var x = c.column % (1 << c.zoom);
        if (x < 0) { x = x + (1 << c.zoom) }
        var y = (1 << c.zoom) - c.row - 1;
        return base + c.zoom + "/" + y + "/" + x + ".jpg";
    }
}

// Microsoft/Bing QuadKey function. See http://polymaps.org/ex/bing.html
function quadkey(url) {
    /** Returns the given coordinate formatted as a 'quadkey'. */
    function quad(column, row, zoom) {
        var key = "";
        for (var i = 1; i <= zoom; i++) {
            key += (((row >> zoom - i) & 1) << 1) | ((column >> zoom - i) & 1);
        }
        return key;
    }
    return function(c) {
        var quadKey = quad(c.column, c.row, c.zoom);
        return url.replace("{quadkey}", quadKey);
    };
}
