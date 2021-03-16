from django.shortcuts import render
from django.contrib.auth.models import User
from .models import UserInfo, Interest
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
            print(i.interests.all())
        for i in Interest.objects.all():
            print(i.userinfo_set.all())
        return JsonResponse(ranSet)

@csrf_exempt
def filteredSearch(request):
    data = json.loads(request.body.decode('utf-8'))["data"]
    if request.method =="POST":
        if len(data["selectedFiltersInterest"]) != 0:
            chainedFilter = UserInfo.objects
            for i in data["selectedFiltersInterest"]:
                chainedFilter = chainedFilter.filter(interests__name=i)
            print("Final Filter", chainedFilter)
    return JsonResponse({'details': "accepted"})