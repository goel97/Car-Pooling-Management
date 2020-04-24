var longVal = 0 , latVal = 0 , map, infoWindow , marker, location;

let mapFunc = function(position){
		//all map position . long and lat computed
    console.log("all complete")
    console.log(test + " TEST")

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

	map.setCenter(pos);
	test = 20;
    return new Promise(function(resolve , reject){resolve(pos)}); 
};

let getCoord = function(coords){
	longVal = coords['lat']
	latVal = coords['lng']
	console.log(longVal + " ************* " + latVal)
};

// let func = function(position){
// mapFunc(position).then(function(result){ return getCoord(result) })
// };



function initMap() {
	console.log("Get here")
	window.liveLatitude=0, window.liveLongitude=0, window.flag=true;
	map = new google.maps.Map(document.getElementById('map-canvas'), {
	center: {lat: -34.397, lng: 150.644},
		zoom: 6
	});
	infoWindow = new google.maps.InfoWindow;
	// Try HTML5 geolocation.
	var test = 10;
	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition
		(
			function(position)
			{
				mapFunc(position).then(function(result){ return getCoord(result) })
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
