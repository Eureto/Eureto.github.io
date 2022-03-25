function ShowMap()
{
    let leftSide = document.getElementById("LeftSide");
    let rightSide = document.getElementById("RightSide");

    if(leftSide.style.width == "50vw")
    {
        leftSide.style.width = "100vw";
    }else{
        leftSide.style.width = "50vw";
    }

}
let positionLatLng;
function initMap() {
    const myLatlng = { lat: 50.02436082585222, lng: 19.977744874959612 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Tu Jestś",
      position: myLatlng,
    });
    infoWindow.open(map);
    
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close();
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
        content: "A teraz tu",
      });
      positionLatLng = mapsMouseEvent.latLng;
    //   infoWindow.setContent(
    //     JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    //   );
      infoWindow.open(map);
    });
  }
  