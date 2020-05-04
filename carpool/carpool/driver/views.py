from django.shortcuts import render
from django.http import HttpResponse ,Http404
from django.template import loader
from django.shortcuts import render , get_object_or_404
from django.views import generic
from django.views.generic.edit import CreateView , UpdateView , DeleteView
from django.http import JsonResponse
from rider.models import ride
from django.core import serializers

import googlemaps 
import json


def driverHome(request):
	print(request.user.username)
	return render(request , "driverHome.html" , {'username' : request.user.username})

def driverInfo(request):
	print(request.user.username + " driveInfo")
	print(request.POST['destination'])
	return render(request , "driverProcess.html" , {'username' : request.user.username , 'dest' : request.POST['destination']})

def searchRider(request):
	driverId = request.GET['id']
	liveLat = request.GET['liveLat']
	liveLong = request.GET['liveLong']
	print(liveLat + "++++++" + liveLong);
	print(request.GET['destination'])

	if liveLat == "" or liveLong == "":
		return JsonResponse({'success': False})

	riderSet = ride.objects.select_for_update().filter(status = False , complete = False)
	rideList = []

	gmaps = googlemaps.Client(key='AIzaSyB64EM3P7XmfNlop7aUjzacIXAQJVAMjkA') 
	for r in riderSet:
		print(type(r))
		print(r)
		my_dist = gmaps.distance_matrix((liveLat , liveLong) , r.pickUp)['rows'][0]['elements'][0]["distance"]["value"]
		my_dist = my_dist/1000.0
		print("the distance is " + str(my_dist))
		if my_dist < 1000:
			data_dict = {'riderId':r.userId , 'pickUp': r.pickUp , 'destination' : r.destination}
			rideList.append(data_dict)

	rideList = json.dumps(rideList)
	return JsonResponse({'rideList': rideList})
	#algo rider search 

	#[{"model": "rider.ride", "pk": "lodhuji", "fields": {"pickUp": "Bhopal Railway Station, Bajariya, Navbahar Colony, Bhopal, Madhya Pradesh, India", "destination": "New Delhi, Delhi, India", "complete": false, "status": false, "cost": 0}}]
