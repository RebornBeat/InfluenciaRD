from django.db import models
from django.contrib.auth.models import User

class Interest(models.Model):
    name = models.CharField(max_length=60)
    
    def __str__(self):
        return self.name
    
class UserInfo(models.Model):
    InstaName = models.CharField(max_length=120)
    FollowerCount = models.IntegerField()
    Cost = models.IntegerField()
    interests = models.ManyToManyField(Interest)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    
    def __str__(self):
        return self.InstaName