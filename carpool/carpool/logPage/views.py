from django.shortcuts import render
from django.http import HttpResponse ,Http404
from django.template import loader
from django.shortcuts import render , get_object_or_404
from django.views import generic
from django.views.generic.edit import CreateView , UpdateView , DeleteView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import authenticate, login

# Create your views here.
# from .models import user

def index(request):
	return render(request , "login.html" , {})

def drive_or_ride(request):
	print(request.user)
	return render(request  , "drive_or_ride.html" , {'user': request.user.username})

def register(request):
	print("-----------REGISTER---------------")
	context = {'userExist' : False}
	return render(request , "register.html" , context)

def forget(request):
	return render(request , "forgot-password.html" , {})

def validateForm(input):
	if User.objects.filter(username=input['userId']).exists():
		return True
	else:
		user = User.objects.create_user(username=input['userId'],email='fake@gmail.com',password= input['passWd'])
		# Update fields and then save again
		user.first_name = firstName = input['firstName']
		user.last_name = lastName = input['lastName']
		user.save()
		return False
	# try:
	# 	newUser = user.objects.get(pk = input["userId"])
	# 	return True
	# except:
	# 	newUser = user(userId = input['userId'] , passWd = input['passWd'] ,
	# 				   firstName = input['firstName'] , lastName = input['lastName'])
	# 	newUser.save()
	# 	return False
 

def addUser(request):
	context = {'userExist' : False}
	if request.method == "POST":
		if validateForm(request.POST) == True:
			context['userExist'] = True
			return render(request , "register.html" , context)	
	return render(request  , "login.html" , {})

def verifyUser(request):
	context = {'loginFail' : False , 'userExist' : True}
	if request.method == "POST":
		try:
			userni= User.objects.get(username=request.POST["userId"])
			user = authenticate(request,username=request.POST["userId"], password=request.POST["passWd"])
			print(user)
			if user is None:
				context['loginFail'] = True
				return render(request , "login.html" , context)
			else:
				login(request,user)
				return drive_or_ride(request)
		except:
			context['userExist'] = False
			return render(request , "login.html" ,context)
		# try:
		# 	newUser = user.objects.get(pk = request.POST["userId"])
		# 	if newUser.passWd != request.POST["passWd"]:
		# 		context['loginFail'] = True
		# 		return render(request , "login.html" , context)
		# 	else:
		# 		return render(request  , "drive_or_ride.html" , {})
		# except:
		# 	context['userExist'] = False
		# 	return render(request , "login.html" ,context)


# if {{userExist}}
