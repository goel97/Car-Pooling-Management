from django.db import models

# Create your models here.
class user(models.Model):
	userId = models.CharField(max_length = 200 , primary_key=True)
	passWd = models.CharField(max_length = 200)
	firstName = models.CharField(max_length = 200)
	lastName = models.CharField(max_length = 200)

	def __str__(self):
		return self.userId
		