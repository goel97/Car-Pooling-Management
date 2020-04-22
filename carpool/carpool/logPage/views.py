from django.shortcuts import render
from django.http import HttpResponse ,Http404
from django.template import loader
from django.shortcuts import render , get_object_or_404
from django.views import generic
from django.views.generic.edit import CreateView , UpdateView , DeleteView

# Create your views here.
from .models import user

def index(request):
	return render(request , "login.html" , {})

def drive_or_ride(request):
	return render(request  , "drive_or_ride.html" , {})

def register(request):
	return render(request , "register.html" , {})

def forget(request):
	return render(request , "forgot-password.html" , {})

def validateForm(input):	
	try:
		newUser = user.objects.get(pk = input["userId"])
		return True
	except:
		newUser = user(userId = input['userId'] , passWd = input['passWd'] ,
					   firstName = input['firstName'] , lastName = input['lastName'])
		newUser.save()
		return False


def addUser(request):
	print("BLAH -----------\n BLAH =============\n")
	if request.method == "POST":
		if validateForm(request.POST) == True:
			return render(request , "register.html" , {'userExist' : True})

	return render(request  , "drive_or_ride.html" , {})


# if {{userExist}}