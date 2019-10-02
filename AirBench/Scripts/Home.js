(async () => {
    var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
              source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([-73.925220, 40.755252]),
            zoom: 16
        })
    });

    async function getBenches(){
        return await fetch("/api/bench/all");
    }

    let response = await getBenches();
    let jsonResult = await response.json();
    let benches = jsonResult.Benches;
    console.log(benches);
    //let latlongs = [
    //    [-73.923220, 40.757352],
    //    [-73.925230, 40.753255],
    //    [-73.928212, 40.755254]
    //];

    var vectorSource = new ol.source.Vector({

    });

    for (let i = 0; i < benches.length; i++) {
        let lon = benches[i]["Longitude"];
        let lat = benches[i]["Latitude"];
        var marker = new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([lon, lat])
            ),  
        });
        vectorSource.addFeature(marker);
    }

    var markerVectorLayer = new ol.layer.Vector({
        source: vectorSource,
    });
    map.addLayer(markerVectorLayer);

})();




//for (let i = 0; i < latlongs.length; i++) {
//    let lat = latlongs[i][1];
//    let lon = latlongs[i][0];
//    console.log(lat, lon);
//    var pos = fromLonLat([lon, lat]);
//    var element = document.createElement('div');
//    element.innerHTML = '<img src="https://cdn.mapmarker.io/api/v1/fa/stack?size=50&color=DC4C3F&icon=fa-microchip&hoffset=1" />';
//    var marker = new ol.Overlay({
//        positioning: 'center-center',
//        position: pos,
//        element: element,
//        stopEvent: false
//    });
//    console.log(marker);
//    map.addOverlay(marker);
//}
