from django.shortcuts import render
from django.http import HttpResponse ,Http404
from django.template import loader
from django.shortcuts import render , get_object_or_404
from django.views import generic
from django.views.generic.edit import CreateView , UpdateView , DeleteView


# Create your views here.

def index(request):
	print(request.user.username)
	return render(request , "riderHome.html" , {'username' : request.user.username})
	# return HttpResponse("<h1>SUCCESS</h1>")

def rideInfo(request):
	if request.method == "POST":
		print(request.POST['pickup'])
		print(request.POST['destination'])
		print(request.POST['latVal'])
		print(request.POST['lngVal']) 
		print(type(request.POST))
		context ={'paramDict' : {'pickup' : request.POST['pickup'] , 'latVal' : request.POST['latVal'] , 
					'lngVal' : request.POST['lngVal'] , 'destination' : request.POST['destination'] }}

		#model of ride created
	return render(request , "rideProcess.html" , context)