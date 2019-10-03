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

    function clickMarker(event){
        //console.log('click');
        //console.log(event.pixel);
        //console.log(map.getCoordinateFromPixel(event.pixel));
        var lonlat = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        console.log(lonlat[0]);
        document.cookie = "lat=" + lonlat[1] + ";path=/";
        document.cookie = "lon=" + lonlat[0] + ";path=/";
        console.log(document.cookie);
        document.location.href = "/Bench/Add";
        //displayFeatureInfo(event.pixel);
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
    map.on('click', clickMarker);
    //map.addEventListener('click', clickMarker);
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
