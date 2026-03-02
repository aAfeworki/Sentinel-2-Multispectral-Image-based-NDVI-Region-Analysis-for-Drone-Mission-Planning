/**
 * 1. SETUP & ROI STYLING
 * Draw one polygon, name it 'geometry', then run.
 */
var roi = ee.FeatureCollection([ee.Feature(geometry)]);
Map.centerObject(geometry, 12);

// Display ROI as outline only (Transparent fill)
Map.addLayer(roi.style({color: 'red', fillColor: '00000000', width: 2}), {}, 'ROI Boundary');
Map.drawingTools().setShown(true); // Hide tools initially
Map.drawingTools().layers().reset(); // Clear ROI from drawing list for clean export

/**
 * 2. DATA PROCESSING
 */
function maskS2(img) {
  var scl = img.select('SCL');
  var mask = scl.gte(4).and(scl.lte(7)); // Keep Vegetation, Bare Soil, Water, Unclassified
  return img.updateMask(mask).divide(10000).copyProperties(img, ['system:time_start']);
}

var image = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(geometry)
  .filterDate('2024-06-01', '2024-09-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .map(maskS2)
  .median()
  .clip(geometry);

var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');

/**
 * 3. VISUALIZATION
 */
var vis = {min: 0, max: 1, palette: ['white', 'brown', 'yellow', 'green', 'darkgreen']};
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, 'True Color');
Map.addLayer(ndvi, vis, 'NDVI');

/**
 * 4. EXPORT UTILITY
 */
print('Steps: 1. Use drawing tools to outline areas. 2. Type exportKML() in console.');

exports.exportKML = function() {
  var userPolygons = Map.drawingTools().toFeatureCollection();
  Export.table.toDrive({
    collection: userPolygons,
    description: 'NDVI_Digitized_Polygons',
    fileFormat: 'KML'
  });
  print('Export started for ' + userPolygons.size().getInfo() + ' features.');
};

// Make function accessible in console
var exportKML = exports.exportKML;