from django.db import models

# Create your models here.
class UserInfo(models.Model):
    InstaName = models.CharField(max_length=120)
    FollowerCount = models.IntegerField()
    Cost = models.IntegerField()
    LinkedEmail = models.CharField(max_length=120)