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

    function IsMarker(lat, lon, mlat, mlon){
        const maxDiff = 30;
        let latDiff = Math.abs(lat - mlat);
        let lonDiff = Math.abs(lon - mlon);
        if (latDiff < maxDiff && lonDiff < maxDiff){
            return true;
        }
        return false;
    }
    function coordDistance(x1, y1, x2, y2){
        let xdist = x1 - x2;
        let ydist = y1 -y2;
        console.log(xdist);
        return [xdist, ydist];
    }
    function clickMarker(event){
        var lonlat = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        document.cookie = "lat=" + lonlat[1] + ";path=/";
        document.cookie = "lon=" + lonlat[0] + ";path=/";
        //console.log(document.cookie);
        //console.log(event.coordinate);
        let benchlonlat = [benches[0]["Longitude"], benches[0]["Latitude"]];
        let coordinates = ol.proj.fromLonLat(benchlonlat);
        //console.log(coordinates);
        //console.log(coordDistance(event.coordinate[0],event.coordinate[1], coordinates[0], coordinates[1]));
        for(let i = 0; i < benches.length; i++){
            let benchlonlat = [benches[i]["Longitude"], benches[i]["Latitude"]];
            let coordinates = ol.proj.fromLonLat(benchlonlat);
            //console.log("Distance:" + coordDistance(event.coordinate[0],event.coordinate[1], coordinates[0], coordinates[1]));
            if (IsMarker(coordinates[0], coordinates[1], event.coordinate[0],event.coordinate[1])){
                console.log(benches[i]["Id"]);

            }
        }

        //document.location.href = "/Bench/Add";

    }

    let response = await getBenches();
    let jsonResult = await response.json();
    let benches = jsonResult.Benches;
    console.log(benches);



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

    function updateList(){
        let min = parseInt(document.getElementById('min').value, 10);
        let max = parseInt(document.getElementById('max').value, 10);
        console.log(min, max);
       

        //filter table rows based on data -> id
        let table = document.getElementById("list");
        let rows = table.getElementsByTagName("tr");
        for (let i=1; i < rows.length; i++){
            let numseats =  parseInt(rows[i].getAttribute("data-numseats"), 10);
            
            if (isNaN(min) && isNaN(max)){
                rows[i].style.display = "";
            }
            else if (numseats >= min && numseats <= max){
                rows[i].style.display = "";
            } 
            else if (numseats < min || numseats > max){
                rows[i].style.display = "none";            
            }
            else {
                rows[i].style.display = "";
            }
        }

    }
    document.getElementById('min').addEventListener('keyup', updateList);
    document.getElementById('max').addEventListener('keyup', updateList);
    map.addLayer(markerVectorLayer);

})();
