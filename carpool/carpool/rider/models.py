from django.db import models

# Create your models here.
class ride(models.Model):
	userId = models.CharField(max_length = 200 , primary_key=True)
	pickUp = models.CharField(max_length = 200)
	destination = models.CharField(max_length = 200)
	complete = models.CharField(max_length = 200)
	status = models.CharField(max_length = 200)
	cost = models.PositiveIntegerField(default = 0)

	def __str__(self):
		print(self.userId + " ---- " + self.destination)