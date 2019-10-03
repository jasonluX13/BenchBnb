(async () => {
    const maxEntries = 5;

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
        let maxDiff = 30;
        let zoom = map.getView().getZoom();
        if (zoom > 17){
            zoom = zoom - 17;
            zoom = Math.pow(2, zoom) 
            maxDiff = maxDiff/zoom;
            console.log("MaxDiff: "+ maxDiff);
        }
        else if (zoom < 15){
            zoom = 15 - zoom;
            zoom = Math.pow(2, zoom) 
            maxDiff = maxDiff * zoom;
            console.log("MaxDiff: "+ maxDiff);
        }
        let latDiff = Math.abs(lat - mlat);
        let lonDiff = Math.abs(lon - mlon);
        if (latDiff < maxDiff && lonDiff < maxDiff){
            return true;
        }
        return false;
    }


    function clickMarker(event){
        var lonlat = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        document.cookie = "lat=" + lonlat[1] + ";path=/";
        document.cookie = "lon=" + lonlat[0] + ";path=/";

        //Loop through list of benches and check if any were clicked
        for(let i = 0; i < benches.length; i++){
            let benchlonlat = [benches[i]["Longitude"], benches[i]["Latitude"]];
            let coordinates = ol.proj.fromLonLat(benchlonlat);
            
            if (IsMarker(coordinates[0], coordinates[1], event.coordinate[0],event.coordinate[1])){
                console.log(benches[i]["Id"]);
                let bench = document.getElementById('selectedBench');
                //Redirect to details
                document.location.href = "/Bench/Details/" + benches[i]["Id"];
                break;
            }
            else if (i == benches.length-1){
                //Redirect to add
                document.location.href = "/Bench/Add";
            }
        }

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
    function resetList(){
        let rows = document.querySelectorAll('#list tr');
        for (let i= 0 ; i < rows.length; i++){
            rows[i].style.display = "";
        }
    }
    function updateList(pageNum){
        resetList();
        let min = parseInt(document.getElementById('min').value, 10);
        let max = parseInt(document.getElementById('max').value, 10);
        console.log(min, max);
        
        //let pageStart = (pageNum-1)*maxEntries + 1;
        //let pageEnd = pageStart + maxEntries;
        //filter table rows based on data -> id
        let table = document.getElementById("list");
        let rows = table.getElementsByTagName("tr");
        rows[0].style.display = "";

        for (let i=0; i < rows.length; i++){
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
        showPage(pageNum, false);
        
    }
    function showPage(pageNum, isInitial){
        //const maxEntries = 5; 
        let rows = document.querySelectorAll('#list tr');
        let min = (pageNum-1)*maxEntries + 1;
        let max = min + maxEntries;
        if (isInitial){
            for (let i= 0 ; i < rows.length; i++){
                if (i >= min && i < max){
                    rows[i].style.display = "";
                }
                else if (i != 0){
                    rows[i].style.display = "none";            
                }
            }
        }
        else {
            let count = 0;
            for (let i= 0 ; i < rows.length; i++){
                if (rows[i].style.display == "" && count > maxEntries){
                    rows[i].style.display = "none";
                }
                else if (rows[i].style.display == "") {
                    count++;         
                }
                console.log(count);
            }
        }
        
    }
    showPage(1,true);
    document.getElementById('filter').addEventListener('keyup', function (){
        updateList(1);
    });
    //document.getElementById('max').addEventListener('keyup', updateList);
    map.addLayer(markerVectorLayer);

})();
