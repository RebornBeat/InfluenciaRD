from django.db import models
from django.contrib.auth.models import User

class Interest(models.Model):
    name = models.CharField(max_length=60)

    def __str__(self):
        return self.name

class Conversation(models.Model):
    users = models.ManyToManyField(User, blank=True)

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    msg_content = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.msg_content

class UserInfo(models.Model):
    InstaName = models.CharField(max_length=120, blank=True, null=True)
    FacebookName = models.CharField(max_length=120, blank=True, null=True)
    TikTokName = models.CharField(max_length=120, blank=True, null=True)
    FollowerCount = models.IntegerField(blank=True, null=True)
    Cost = models.IntegerField(blank=True, null=True)
    interests = models.ManyToManyField(Interest, blank=True)
    conversation = models.ManyToManyField(Conversation, blank=True)
    account_type = models.CharField(max_length=120, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    photo = models.ImageField(blank=True, null=True)
    socialActivated = models.BooleanField(default=False)
    activationCode = models.IntegerField(blank=True, null=True)
    activationTime = models.DateTimeField(blank=True, null=True)
    activationPlatform = models.CharField(max_length=40, blank=True, null=True)

    def __str__(self):
        return self.InstaName