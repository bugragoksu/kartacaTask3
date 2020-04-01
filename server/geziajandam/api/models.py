from django.db import models
from django.contrib.auth.models import AbstractUser


class TravelUser(AbstractUser):
    username = models.CharField(max_length=10, unique=True)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
    


class TravelPost(models.Model):
    user = models.ForeignKey(TravelUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    desc = models.TextField()
    date = models.DateField()

    def __str__(self):
        return self.title



