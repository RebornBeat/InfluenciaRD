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
            #Make one get call with the list of Indexes instead of appending one by one.
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
        else:
            ranSet["Logged"] = "False"
        for i in ranList:
            ranSet[i.InstaName] = {"Followers" : i.FollowerCount, "Cost" : i.Cost}
            print(i.interests.all())
        return JsonResponse(ranSet)

@csrf_exempt
def filteredSearch(request):
    data = json.loads(request.body.decode('utf-8'))["data"]
    if request.method =="POST":
        chainedFilter = UserInfo.objects
        if len(data["selectedFiltersFollowers"]) != 0:
            for i in data["selectedFiltersFollowers"]:
                Gteendslice = i.find("-")
                GteNumber = i[0:Gteendslice]
                Ltestartslice = i.find("-") + 1
                Lteendslice = len(i)
                LteNumber = i[Ltestartslice:Lteendslice]
                addedK = "000"
                if "m" in GteNumber:
                    GteNumber = GteNumber.replace("m", "")
                    GteNumber = int(GteNumber + addedK)
                if "m" in LteNumber:
                    LteNumber = LteNumber.replace("m", "")
                    LteNumber = int(LteNumber + addedK)
                chainedFilter = chainedFilter.filter(FollowerCount__range=(GteNumber, LteNumber))
                print("Final Followers Filter", chainedFilter)
        if len(data["selectedFiltersInterest"]) != 0:
            for i in data["selectedFiltersInterest"]:
                chainedFilter = chainedFilter.filter(interests__name=i)
                if len(chainedFilter) == 0:
                    break
            print("Final Interest Filter", chainedFilter)
        if len(data["selectedFiltersCost"]) != 0:
            for i in data["selectedFiltersCost"]:
                Gteendslice = i.find("-")
                GteNumber = i[0:Gteendslice]
                Ltestartslice = i.find("-") + 1
                Lteendslice = len(i)
                LteNumber = i[Ltestartslice:Lteendslice]
                addedK = "000"
                if "m" in GteNumber:
                    GteNumber = GteNumber.replace("m", "")
                    GteNumber = int(GteNumber + addedK)
                if "m" in LteNumber:
                    LteNumber = LteNumber.replace("m", "")
                    LteNumber = int(LteNumber + addedK)
                chainedFilter = chainedFilter.filter(Cost__range=(GteNumber, LteNumber))
                print("Final Cost Filter", chainedFilter)
        #Excluse Seen Users on Scroll Down
        filteredJSON = {}
        seenList = []
        try:
            for i in chainedFilter:
                filteredJSON[i.InstaName] = {"Followers" : i.FollowerCount, "Cost" : i.Cost}
                seenList.append(i.InstaName)
            filteredJSON["seenList"] = seenList
        except:
            return JsonResponse({})
    return JsonResponse(filteredJSON)
