from django.db import models
from django.db import transaction
# Create your models here.
class ride(models.Model):
	userId = models.CharField(max_length = 200 , primary_key=True)
	pickUp = models.CharField(max_length = 200)
	destination = models.CharField(max_length = 200)
	complete = models.BooleanField(default=False)
	status = models.BooleanField(default=False)
	cost = models.PositiveIntegerField(default = 0)
	driverId = models.CharField(max_length = 200 , default = None, null = True)
	expectedTime = models.CharField(max_length=200, default="inf")

	def __str__(self):
		return (self.userId + " ---- " + self.destination)

	@classmethod
	def acceptRide(self , riderId , driverId):
		print("acceptRide of ride model ########################")
		success = True
		with transaction.atomic():
			r = ride.objects.select_for_update().get(pk = riderId)
			if r.status == True or r.complete == True:
				success = False
			else:
				r.driverId = driverId
				r.status = True
				r.save()

		return success