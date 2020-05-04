from django.db import models

# Create your models here.
class ride(models.Model):
	userId = models.CharField(max_length = 200 , primary_key=True)
	pickUp = models.CharField(max_length = 200)
	destination = models.CharField(max_length = 200)
	complete = models.BooleanField(default=False)
	status = models.BooleanField(default=False)
	cost = models.PositiveIntegerField(default = 0)

	def __str__(self):
		return (self.userId + " ---- " + self.destination)