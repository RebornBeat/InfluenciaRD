from django.db import models
from django.contrib.auth.models import User

class Interest(models.Model):
    name = models.CharField(max_length=60)
    
    def __str__(self):
        return self.name
    
class Conversation(models.Model):
    name = models.CharField(max_length=60)
    
    def __str__(self):
        return self.name
    
class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    sender = models.CharField(max_length=120)
    reciever = models.CharField(max_length=120)
    msg_content = models.CharField(max_length=500)
    created_at = models.DateTimeField()
    
    def __str__(self):
        return self.headline
    
class UserInfo(models.Model):
    InstaName = models.CharField(max_length=120)
    FacebookName = models.CharField(max_length=120)
    TikTokName = models.CharField(max_length=120)
    FollowerCount = models.IntegerField()
    Cost = models.IntegerField()
    interests = models.ManyToManyField(Interest)
    conversation = models.ManyToManyField(Conversation)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    photo = models.ImageField(upload_to='cars')
    
    def __str__(self):
        return self.InstaName