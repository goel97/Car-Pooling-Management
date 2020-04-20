from django.shortcuts import render
from django.http import HttpResponse ,Http404
from django.template import loader
from django.shortcuts import render , get_object_or_404
from django.views import generic
from django.views.generic.edit import CreateView , UpdateView , DeleteView

# Create your views here.
from .models import *

def index(request):
	return render(request , "login.html" , {})

