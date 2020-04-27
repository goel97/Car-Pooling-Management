from django.shortcuts import render
from django.http import HttpResponse ,Http404
from django.template import loader
from django.shortcuts import render , get_object_or_404
from django.views import generic
from django.views.generic.edit import CreateView , UpdateView , DeleteView
from .models import ride

from django.core import serializers

from django.http import JsonResponse


# Create your views here.

def index(request):
	print(request.user.username)
	return render(request , "riderHome.html" , {'username' : request.user.username})
	# return HttpResponse("<h1>SUCCESS</h1>")

def rideInfo(request):
	if request.method == "POST":
		print(request.POST['userId'])
		print(request.POST['pickup'])
		print(request.POST['destination'])
		print(request.POST['latVal'])
		print(request.POST['lngVal']) 
		print(type(request.POST))
		r = ride(
			userId = request.POST['userId'], 
			pickUp = request.POST['pickup'],
			destination = request.POST['destination']
		)
		r.save()
		context ={'paramDict' : {'userId' : request.POST['userId'],'pickup' : request.POST['pickup'] , 'latVal' : request.POST['latVal'] , 
					'lngVal' : request.POST['lngVal'] , 'destination' : request.POST['destination'] }}
		#model of ride created
	return render(request , "rideProcess.html" , context)

def statusUpdate(request):
	print("here ----------------------------------")
	id = request.GET['id']
	rideDetils = get_object_or_404(ride, pk=id)
	print("hello ----------------------------------",id)
	if rideDetils.status :
		return JsonResponse({'success':True,'userId':rideDetils.userId})
	return JsonResponse({'success':False,'userId':rideDetils.userId})

## UNCOMMENT - if we redirect to new page after ride acceptance
# def rideSuccessful(request):
# 	print("kkk ----------------------------------")
# 	if request.method == "POST":
# 		id = request.POST['userId']
# 		print("rider id", id)
# 		rideDetails = get_object_or_404(ride, pk=id)
# 	return render(request, 'polls/results.html', {'rideDetails': rideDetails})