from django.contrib import admin

# Register your models here.
from .models import UserInfo, Interest, Conversation, Message

admin.site.register(UserInfo)
admin.site.register(Interest)
admin.site.register(Conversation)
admin.site.register(Message)
