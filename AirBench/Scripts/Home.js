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
        let numSeats = benches[i]["NumSeats"];
        let scale = 0.02 * numSeats;
        if (scale > 0.6){
            scale = 0.6;
        }
        var marker = new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([lon, lat])
            ),  
        });
        marker.setStyle(new ol.style.Style({
            image: new ol.style.Icon(({
                crossOrigin: 'anonymous',
                src: '/Images/bench.png',
                scale: 0.1
            }))
        }));
        vectorSource.addFeature(marker);
    }

    var markerVectorLayer = new ol.layer.Vector({
        source: vectorSource,
    });
    map.on('click', clickMarker);
    //map.addEventListener('click', clickMarker);
    function updateList(){
        let min = document.getElementById('min').value;
        let max = document.getElementById('max').value;
        console.log(min, max);
        //console.log(min, max);
        //call api
        //let response = await fetch("/api/bench/filtered/?min=" + min + "&max=" + max);
        //let jsonResult = await response.json();
        //console.log(jsonResult);

        //filter table rows based on data -> id
        let table = document.getElementById("list");
        let rows = table.getElementsByTagName("tr");
        for (let i=1; i < rows.length; i++){
            let numseats =  parseInt(rows[i].getAttribute("data-numseats"), 10);
            
            if (min == "" && max==""){
                rows[i].style.display = "";
            }
            else if (numseats >= min && numseats <= max){
                rows[i].style.display = "";
            } 
            else {
                rows[i].style.display = "none";            
            }
        }

    }
    document.getElementById('min').addEventListener('keyup', updateList);
    document.getElementById('max').addEventListener('keyup', updateList);
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
