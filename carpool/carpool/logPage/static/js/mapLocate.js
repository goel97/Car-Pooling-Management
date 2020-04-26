  function initMap() {

    console.log("initMap")
    //console.log(params)
    // var directionsService = new google.maps.DirectionsService();
    // var directionsRenderer = new google.maps.DirectionsRenderer();
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 7,
    //   center: {lat: 41.85, lng: -87.65}
    // });
    // directionsRenderer.setMap(map);
    // calculateAndDisplayRoute(directionsService, directionsRenderer , params);
    // console.log("ended initMap")

    // document.getElementById('start').addEventListener('change', onChangeHandler);
    // document.getElementById('end').addEventListener('change', onChangeHandler);
  }
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer , params) {
    console.log("In calcandDisplay")
    console.log(params)

    directionsService.route(
    {
      origin:{lat: params['latVal'], lng: params['lngVal']},
      destination: params['pickup'],
      travelMode: 'DRIVING'
    },
    
    function(response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });


  }