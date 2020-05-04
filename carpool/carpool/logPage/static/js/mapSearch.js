// function initMap() {
// 	var map, infoWindow , marker, location;
// 	window.liveLatitude=0, window.liveLongitude=0, window.flag=true;
// 	map = new google.maps.Map(document.getElementById('map-canvas'), {
// 	center: {lat: -34.397, lng: 150.644},
// 		zoom: 6
// 	});
// 	infoWindow = new google.maps.InfoWindow;
// 	// Try HTML5 geolocation.
// 	var test = 10;
// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition(function(position) {
// 			console.log(test + " TEST")
// 			var pos = {
// 				lat: position.coords.latitude,
// 				lng: position.coords.longitude
// 			};
// 			window.liveLatitude = pos['lat'];
// 			window.liveLongitude = pos['lng'];
// 			// window.flag = false;
// 			marker = new google.maps.Marker(
// 			{
// 				position: pos,
// 				map: map,
// 				// icon: 'http://pngimages.net/sites/default/files/google-maps-png-image-70164.png',
// 				draggable: false
// 			});

// 			map.setCenter(pos);
// 			test = 20;
// 		},function() {
// 			handleLocationError(true, infoWindow, map.getCenter());
// 		});
// 	}
// 	else {
// 		// Browser doesn't support Geolocation
// 		handleLocationError(false, infoWindow, map.getCenter());
// 	}
// 	// console.log(test + " TEST OUT #")
// 	// while(test == 10){}
// 	console.log(test + " TEST OUT")
// 	// var pos = {
// 	// 	lat: window.liveLatitude,
// 	// 	lng: window.liveLongitude
// 	// };
// 	// return pos;
// }

// 	  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
// 		infoWindow.setPosition(pos);
// 		infoWindow.setContent(browserHasGeolocation ?
// 							  'Error: The Geolocation service failed.' :
// 							  'Error: Your browser doesn\'t support geolocation.');
// 		infoWindow.open(map);
// 	  }

var longVal = 0 , latVal = 0 , map, infoWindow , marker, location;
//initMap -> initialize()

function initialize(coords) {

	// setTimeout(() => {  console.log("World!"); }, 20000);
	// console.log(type(liveLocation));
	console.log(coords['lat'] + " ************ " + coords['lng'])
	//console.log(window.liveLatitude + "-------------" + window.liveLongitude);
	var mapOptions, map, marker, searchBox, searchBox1, city,infoWindow = '', addressEl = document.querySelector( '#map-search' ),
		pickPoint = document.querySelector('#map-pickup'),
		latElem = document.getElementById('lat'),
		lngElem = document.getElementById('lng');


		latElem.value = coords['lat'];
		lngElem.value = coords['lng'];

		console.log(latElem.value + " &&&&&&&&&&&& " + lngElem.value)
	// 	element = document.getElementById( 'map-canvas' );
	mapOptions = {
		// How far the maps zooms in.
		zoom: 8,
		// Current Lat and Long position of the pin/
		center: new google.maps.LatLng( 18.5204, 73.8567 ),
		// center : {
		// 	lat: -34.397,
		// 	lng: 150.644
		// },
		disableDefaultUI: false, // Disables the controls like zoom control on the map if set to true
		scrollWheel: true, // If set to false disables the scrolling on the map.
		draggable: true, // If set to false , you cannot move the map around.
		// mapTypeId: google.maps.MapTypeId.HYBRID, // If set to HYBRID its between sat and ROADMAP, Can be set to SATELLITE as well.
		// maxZoom: 11, // Wont allow you to zoom more than this
		// minZoom: 9  // Wont allow you to go more up.

	};

	/**
	 * Creates the map using google function google.maps.Map() by passing the id of canvas and
	 * mapOptions object that we just created above as its parameters.
	 *
	 */
	// Create an object map with the constructor function Map()
	// map = new google.maps.Map( element, mapOptions ); // Till this like of code it loads up the map.

	/**
	 * Creates the marker on the map
	 *
	 */
	// marker = new google.maps.Marker({
	// 	position: mapOptions.center,
	// 	map: map,
	// 	// icon: 'http://pngimages.net/sites/default/files/google-maps-png-image-70164.png',
	// 	draggable: true
	// });

	/**
	 * Creates a search box
	 */
	searchBox = new google.maps.places.SearchBox( addressEl );
	searchBox1 = new google.maps.places.SearchBox( pickPoint);
	// /**
	//  * When the place is changed on search box, it takes the marker to the searched location.
	//  */
	google.maps.event.addListener( searchBox, 'places_changed', function () {
		console.log( 'I was touched-----------------------------------------------------------------\n' );
		var places = searchBox.getPlaces(),
			bounds = new google.maps.LatLngBounds(),
			i, place, lat, long, resultArray,
			addresss = places[0].formatted_address;

		for( i = 0; place = places[i]; i++ ) {
			bounds.extend( place.geometry.location );
			marker.setPosition( place.geometry.location );  // Set marker position new.
		}

		map.fitBounds( bounds );  // Fit to the bound
		map.setZoom( 15 ); // This function sets the zoom to 15, meaning zooms to level 15.
		// console.log( map.getZoom() );

		lat = marker.getPosition().lat();
		long = marker.getPosition().lng();
		latEl.value = lat;
		longEl.value = long;

		resultArray =  places[0].address_components;

		// Get the city and set the city input value to the one selected
		for( var i = 0; i < resultArray.length; i++ ) {
			if ( resultArray[ i ].types[0] && 'administrative_area_level_2' === resultArray[ i ].types[0] ) {
				citi = resultArray[ i ].long_name;
				city.value = citi;
			}
		}

		// Closes the previous info window if it already exists
		if ( infoWindow ) {
			infoWindow.close();
		}
		/**
		 * Creates the info Window at the top of the marker
		 */
		infoWindow = new google.maps.InfoWindow({
			content: addresss
		});

		infoWindow.open( map, marker );
	} );


	google.maps.event.addListener( searchBox1, 'places_changed', function () {
		console.log( 'I was touched-----------------------------------------------------------------\n' );
		var places = searchBox.getPlaces(),
			bounds = new google.maps.LatLngBounds(),
			i, place, lat, long, resultArray,
			addresss = places[0].formatted_address;

		for( i = 0; place = places[i]; i++ ) {
			bounds.extend( place.geometry.location );
			marker.setPosition( place.geometry.location );  // Set marker position new.
		}

		map.fitBounds( bounds );  // Fit to the bound
		map.setZoom( 15 ); // This function sets the zoom to 15, meaning zooms to level 15.
		// console.log( map.getZoom() );

		lat = marker.getPosition().lat();
		long = marker.getPosition().lng();
		latEl.value = lat;
		longEl.value = long;

		resultArray =  places[0].address_components;

		// Get the city and set the city input value to the one selected
		for( var i = 0; i < resultArray.length; i++ ) {
			if ( resultArray[ i ].types[0] && 'administrative_area_level_2' === resultArray[ i ].types[0] ) {
				citi = resultArray[ i ].long_name;
				city.value = citi;
			}
		}

		// Closes the previous info window if it already exists
		if ( infoWindow ) {
			infoWindow.close();
		}
		/**
		 * Creates the info Window at the top of the marker
		 */
		infoWindow = new google.maps.InfoWindow({
			content: addresss
		});

		infoWindow.open( map, marker );
	} );




	/**
	 * Finds the new position of the marker when the marker is dragged.
	 */
	// google.maps.event.addListener( marker, "dragend", function ( event ) {
		// var lat, long, address, resultArray, citi;

		// console.log( 'i am dragged' );
		// lat = marker.getPosition().lat();
		// long = marker.getPosition().lng();

		// var geocoder = new google.maps.Geocoder();
		// geocoder.geocode( { latLng: marker.getPosition() }, function ( result, status ) {
		// 	if ( 'OK' === status ) {  // This line can also be written like if ( status == google.maps.GeocoderStatus.OK ) {
		// 		address = result[0].formatted_address;
		// 		resultArray =  result[0].address_components;

		// 		// Get the city and set the city input value to the one selected
		// 		for( var i = 0; i < resultArray.length; i++ ) {
		// 			if ( resultArray[ i ].types[0] && 'administrative_area_level_2' === resultArray[ i ].types[0] ) {
		// 				citi = resultArray[ i ].long_name;
		// 				console.log( citi );
		// 				city.value = citi;
		// 			}
		// 		}
		// 		addressEl.value = address;
		// 		latEl.value = lat;
		// 		longEl.value = long;

		// 	} else {
		// 		console.log( 'Geocode was not successful for the following reason: ' + status );
		// 	}

		// 	// Closes the previous info window if it already exists
		// 	if ( infoWindow ) {
		// 		infoWindow.close();
		// 	}

		// 	/**
		// 	 * Creates the info Window at the top of the marker
		// 	 */
		// 	infoWindow = new google.maps.InfoWindow({
		// 		content: address
		// 	});

		// 	infoWindow.open( map, marker );
		// } );
	// });


	}


// let mapFunc = function(){
// 		//all map position . long and lat computed
//     console.log("all complete")
    
//     return new Promise(function(resolve , reject){resolve("lat long")}); 
// };

// let getCoord = function(coords){
// 	console.log(coords)
//   //set your lat and long here
// }

// //the below function goes in navigatorgeolocation.getcurrentposition
// let func = function(){
// mapFunc.then(function(result){ return getCoord(result) })
// };


let mapFunc = function(position){
		//all map position . long and lat computed
    console.log("all complete")
    //console.log(test + " TEST")

	var pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};

	window.liveLatitude = pos['lat'];
	window.liveLongitude = pos['lng'];
	// window.flag = false;
	marker = new google.maps.Marker(
	{
		position: pos,
		map: map,
		// icon: 'http://pngimages.net/sites/default/files/google-maps-png-image-70164.png',
		draggable: false
	});

	//map.setCenter(pos);
	test = 20;
    return new Promise(function(resolve , reject){resolve(pos)}); 
};

let getCoord = function(coords){
	longVal = coords['lat']
	latVal = coords['lng']
	console.log(longVal + " ************* " + latVal)
	return new Promise(function(resolve , reject){resolve(coords)}); 
};

//pawar123 -- > 1234567

// let func = function(position){
// mapFunc(position).then(function(result){ return getCoord(result) })
// };



function initMap() {
	//console.log(isGlobal + "--------------##########@@@@@@@@@@@@@@@@@@@@@")
	console.log("Get here")
	window.liveLatitude=0, window.liveLongitude=0, window.flag=true;
	// map = new google.maps.Map(document.getElementById('map-canvas'), {
	// center: {lat: -34.397, lng: 150.644},
	// 	zoom: 6
	// });
	infoWindow = new google.maps.InfoWindow;
	// Try HTML5 geolocation.
	var test = 10;
	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition
		(
			function(position)
			{
				mapFunc(position).then(function(result){ return getCoord(result) }).then(function(result){return initialize(result)})
			},
			function()
			{
				handleLocationError(true, infoWindow, map.getCenter());
			}
		);
	}
	else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}

	// console.log(test + " TEST OUT #")
	// while(test == 10){}
	console.log(test + " TEST OUT")
	// var pos = {
	// 	lat: window.liveLatitude,
	// 	lng: window.liveLongitude
	// };
	// return pos;
	//return new Promise(function(resolve , reject){resolve(pos)}); 
}





// let mapFunc = function(){
// 		//all map position . long and lat computed
//     console.log("all complete")
    
//     return new Promise(function(resolve , reject){resolve("lat long")}); 
// };

// let getCoord = function(coords){
// 	console.log(coords)
//   //set your lat and long here
// }

// //the below function goes in navigatorgeolocation.getcurrentposition
// let func = function(){
// mapFunc.then(function(result){ return getCoord(result) })
// };
