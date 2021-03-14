from django.contrib import admin

# Register your models here.
from .models import UserInfo, Interest

admin.site.register(UserInfo)
admin.site.register(Interest)