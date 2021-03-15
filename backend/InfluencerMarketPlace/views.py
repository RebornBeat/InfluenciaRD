from django.shortcuts import render
from django.contrib.auth.models import User
from .models import UserInfo
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import random

# Create your views here.

def index(request):
    return JsonResponse({'details': "accepted"})

@csrf_exempt
def login_request(request):
    data = json.loads(request.body.decode('utf-8'))["data"]
    if request.method =="POST":
        try:
            u = User.objects.get(username=data["Email"])
        except:
            return JsonResponse({'details': "E-mail is not Registered"})
        user = authenticate(request, username=data["Email"], password=data["Pass"])
        if user is not None:
            login(request, user)
            return JsonResponse({'details': "accepted"})
        else:
            return JsonResponse({'details': "Incorrect Password"})
    return JsonResponse(data)

@csrf_exempt
def register_request(request):
    data = json.loads(request.body.decode('utf-8'))["data"]
    if request.method =="POST":
        if data["Pass"] == data["rePass"]:
            try:
                u = User.objects.get(username=data["Email"])
                return JsonResponse({'details': "Email is in Use"})
            except:
                if "@" in data["Email"]:
                    startslice = data["Email"].find("@")
                    endslice = len(data["Email"])
                    slicedemail = data["Email"][startslice:endslice]
                    if "." in slicedemail:  
                        User.objects.create_user(username=data["Email"], password=data["Pass"])
                        user = authenticate(request, username=data["Email"], password=data["Pass"])
                        if user is not None:
                            login(request, user)
                            return JsonResponse({'details': "accepted"})
                    else:
                        return JsonResponse({'details': "Please Enter A Valid Email"})
                else:
                    return JsonResponse({'details': "Please Enter A Valid Email"})
        else:
            return JsonResponse({'details': "Passwords Must Match"})
    return JsonResponse(data)

@csrf_exempt
def initialSearch(request):
    if request.method =="POST":
        print(request.user)
        print(request.user.username)
        # Get top 5 with highest follower count and return
        allSet = UserInfo.objects.all()
        setLength = len(allSet) - 1
        choosenIndexes = []
        ranList = []
        while True:
            currentIndex = 0
            while True:
                randomIndex = random.randint(0, setLength)
                if randomIndex not in choosenIndexes:
                    currentIndex = randomIndex
                    choosenIndexes.append(currentIndex)
                    break
            ranList.append(allSet[currentIndex])
            if len(ranList) == 5:
                if request.user:
                    pass
                else:
                    break
            if len(ranList) == 20:
                break
            if len(ranList) == len(allSet):
                break
        ranSet = {}
        if request.user:
            ranSet["Logged"] = "True"
            ranSet["seenIndexes"] = choosenIndexes
        else:
            ranSet["Logged"] = "False"
        for i in ranList:
            ranSet[i.InstaName] = {"Followers" : i.FollowerCount, "Cost" : i.Cost}
        return JsonResponse(ranSet)

@csrf_exempt
def course_filter(request):
    data = json.loads(request.body.decode('utf-8'))["data"]
    if request.method =="POST":
        null_keys = []
        for i in data:
            if data[i] == "n/a":
                null_keys.append(i)
        for i in null_keys:
            del data[i]
        filter_list = []
        # Append each value from data into the filter_list
        for i in data:
            filter_list.append(data[i])
        course_dict = {}
        if len(filter_list) != 0:
            all_course = Course.objects.filter(availabeTag__has_keys=filter_list)
            for i in all_course:
                course_dict[i.pk] = { "title": i.title,  "filledSlot": i.filledSlot, "maxSlot": i.maxSlot, "startDate": i.startDate, "tags": i.availabeTag, "description": i.description}
    return JsonResponse(course_dict)