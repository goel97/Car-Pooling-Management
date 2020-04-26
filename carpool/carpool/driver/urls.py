from django.urls import path 
from django.conf.urls import url
from . import views

app_name = 'driver'


urlpatterns = [
	path('' , views.driverHome , name = "driverHome"),
]

