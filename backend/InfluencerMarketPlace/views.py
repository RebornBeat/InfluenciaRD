from django.shortcuts import render
from django.contrib.auth.models import User
from .models import UserInfo, Interest
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import string
import random
from django.core.serializers.json import DjangoJSONEncoder

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
            return JsonResponse({'details': "accepted", "socialActivated": UserInfo.objects.get(user=u).socialActivated })
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
                            return JsonResponse({'details': "accepted", "socialActivated": UserInfo.objects.get(user=u).socialActivated })
                    else:
                        return JsonResponse({'details': "Please Enter A Valid Email"})
                else:
                    return JsonResponse({'details': "Please Enter A Valid Email"})
        else:
            return JsonResponse({'details': "Passwords Must Match"})
    return JsonResponse(data)

def cleanedList (idList, seenUsers, Logged):
    if seenUsers:
        idList = list(set(idList)-set(seenUsers))
    idLen = len(idList)
    random.shuffle(idList)
    if Logged:
        if idLen >= 20:
            idList = idList[0:20]
        else:
            idList = idList[0:idLen]
    else:
        if idLen >= 5:
            idList = idList[0:5]
        else:
            idList = idList[0:idLen]
    return idList

def cleanedDict (cleanedSet):
    cleanedJSON = {}
    for i in cleanedSet:
        cleanedJSON[i["InstaName"]] = i
    return cleanedJSON

@csrf_exempt
def initialSearch(request):
    data = False
    try:
        data = json.loads(request.body.decode('utf-8'))["data"]
    except:
        pass
    if request.method =="POST":
        allSet = UserInfo.objects.all()
        idList = list(UserInfo.objects.values_list('id', flat=True))
        if data:
            if request.user.username != "":
                idList = cleanedList (idList, data["seenUsers"], True)
            else:
                idList = cleanedList (idList, data["seenUsers"], None)
        else:
            if request.user.username != "":
                idList = cleanedList (idList, None, True)
            else:
                idList = cleanedList (idList, None, None)
        allSet = allSet.filter(pk__in=idList).order_by('?')
        # Return a dictionary value of all queries in allSet
        cleanedSet = list(allSet.values('InstaName', 'FollowerCount', 'Cost'))
        cleanedSet = cleanedDict (cleanedSet)
        if request.user.username != "":
            cleanedSet["Logged"] = "True"
            cleanedSet["seenList"] = idList
        else:
            cleanedSet["Logged"] = "False"
        return JsonResponse(cleanedSet)

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
        if len(data["selectedFiltersInterest"]) != 0:
            for i in data["selectedFiltersInterest"]:
                chainedFilter = chainedFilter.filter(interests__name=i)
                if len(chainedFilter) == 0:
                    break
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
        idList = list(chainedFilter.values_list('id', flat=True))
        try:
            isData = data["seenUsers"]
            if request.user.username != "":
                idList = cleanedList (idList, data["seenUsers"], True)
            else:
                idList = cleanedList (idList, data["seenUsers"], None)
        except:
            if request.user.username != "":
                idList = cleanedList (idList, None, True)
            else:
                idList = cleanedList (idList, None, None)
        chainedFilter = chainedFilter.filter(pk__in=idList).order_by('?')
        filteredJSON = list(chainedFilter.values('InstaName', 'FollowerCount', 'Cost'))
        filteredJSON = cleanedDict (filteredJSON)
        if request.user.username != "":
            filteredJSON["Logged"] = "True"
            filteredJSON["seenList"] = idList
        else:
            filteredJSON["Logged"] = "False"
    return JsonResponse(filteredJSON)

@csrf_exempt
def socialActivation(request):
    #check if a user has the code in use and if so check if it has expired or not
    code = ''.join(random.choices(string.digits, k=8))
    try:
        UserInfo.objects.get(activationCode=code)
    except:
        print(code)
    return JsonResponse({'activationCode': code})