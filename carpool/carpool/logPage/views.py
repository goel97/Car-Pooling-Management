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
	context = {'userExist' : False}
	return render(request , "register.html" , context)

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
	context = {'userExist' : False}
	if request.method == "POST":
		if validateForm(request.POST) == True:
			context['userExist'] = True
			return render(request , "register.html" , context)

	return render(request  , "drive_or_ride.html" , {})

def verifyUser(request):
	context = {'loginFail' : False , 'userExist' : True}
	if request.method == "POST":
		try:
			newUser = user.objects.get(pk = request.POST["userId"])
			if newUser.passWd != request.POST["passWd"]:
				context['loginFail'] = True
				return render(request , "login.html" , context)
			else:
				return render(request  , "drive_or_ride.html" , {})
		except:
			context['userExist'] = False
			return render(request , "login.html" ,context)


# if {{userExist}}