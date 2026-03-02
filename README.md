This project provides a Google Earth Engine (GEE) workflow for:
Performing NDVI (Normalized Difference Vegetation Index) analysis using Sentinel-2 imagery
Selecting a region of interest (ROI) for vegetation analysis
Identifying and marking sub-regions requiring drone inspection
Exporting those sub-regions as KML files for mission planning
The primary goal is to reduce drone flight time by pre-identifying vegetation stress zones from satellite NDVI analysis before field deployment.
This approach enables:
Precision agriculture workflows
Targeted crop health inspection
Efficient UAV mission planning
Reduced operational cost and energy consumption

🚀 Why This Workflow?
Traditional drone scouting requires full-area coverage, which:
Increases flight time
Consumes more battery cycles
Requires multiple sorties
Raises operational costs
This workflow allows us to:
Use satellite NDVI to detect vegetation variability
Mark only suspicious or stressed zones
Export those zones to KML
Upload them into drone mission software (e.g., DJI, QGroundControl)
The drone then flies only where needed.

🛰️ Data Source
Sentinel-2 Surface Reflectance (Harmonized)
Dataset: COPERNICUS/S2_SR_HARMONIZED
Resolution: 10 meters
Bands used:
B4 → Red
B8 → Near Infrared (NIR)
Cloud masking: Scene Classification Layer (SCL)
NDVI formula:
NDVI = (B8 - B4)/(B8 + B4)

🧠 How the Code Works
The workflow is divided into clear stages:

1️⃣ Define Analysis Parameters
You specify:
Start date
End date
Maximum cloud percentage
The system filters Sentinel-2 imagery accordingly.

2️⃣ Draw Region of Interest (ROI)
Before running the script:
Draw a single polygon or rectangle
Rename it as geometry
This defines the NDVI analysis boundary.
📸 [Insert Screenshot – Drawing ROI before running script]

3️⃣ Cloud Masking
Clouds are removed using Sentinel-2’s SCL (Scene Classification Layer).
Masked classes:
Cloud shadows
Medium/high probability clouds
Cirrus
Snow
This ensures accurate NDVI computation.

4️⃣ NDVI Computation
After filtering and masking:
A median composite is created
NDVI is computed using B8 and B4
NDVI is clipped to ROI
Visualization includes:
True color Sentinel-2 image
NDVI color palette
📸 [Insert Screenshot – NDVI Visualization Result]

5️⃣ Mark Drone Inspection Zones
After NDVI appears:
Draw one or more polygons
These represent areas requiring drone inspection
Examples:
Low NDVI patches
Crop stress areas
Irrigation anomalies
Pest suspicion zones
📸 [Insert Screenshot – Marked Drone Inspection Polygons]

6️⃣ Export KML for Drone Software
Export format:
KML


🛠️ Step-by-Step Usage Guide
Step 1 — Open Google Earth Engine
Go to:
https://code.earthengine.google.com/

Step 2 — Paste the Script
Copy sentinel2_ndvi_script.js into a new script file.

Step 3 — Draw ROI
Use polygon or rectangle tool
Rename geometry as geometry

Step 4 — Press Run
NDVI will be calculated and displayed.

Step 5 — Draw Inspection Polygons
After NDVI appears:
Draw one or more polygons
These define drone flight targets

Step 6 — Export KML
In the console, run:
exportDrawnPolygons();

Then:
Open Tasks
Click Run
The KML will be saved to Google Drive.

🎯 Practical Workflow in Agriculture
Satellite NDVI screening
Identify vegetation stress clusters
Export inspection polygons
Upload to drone mission planner
Conduct focused UAV scouting
Apply localized treatment
This approach can reduce:
Flight time by more than 80%
Battery cycles
Field scouting labor
Fuel / energy consumption


🤝 Contribution
Contributions are welcome:
Algorithm improvements
UI enhancements
Statistical automation
Drone workflow integration
Precision agriculture extensions


👤 Author
Afework Alemu
Robotics & Precision Agriculture Research
Mechatronics Engineer
