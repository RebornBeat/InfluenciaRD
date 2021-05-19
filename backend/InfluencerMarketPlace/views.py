from django.shortcuts import render
from django.contrib.auth.models import User
from .models import UserInfo, Interest, Conversation, Message
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import string
import random
from django.core.serializers.json import DjangoJSONEncoder
import datetime
import math

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

def convertFollowers(cleanedI):
    costStr = str(cleanedI["FollowerCount"])

    if len(costStr) > 3:

        if len(costStr) == 4:

            if costStr[1] != 0:
                cleanedI["FollowerCount"] = costStr[0] + "." + costStr[1] + "k"
            else:
                cleanedI["FollowerCount"] = costStr[0] + "k"

        if len(costStr) == 5:
            if costStr[3] != 0:
                cleanedI["FollowerCount"] = costStr[:2] + "." + costStr[3] + "k"
            else:
                cleanedI["FollowerCount"] = costStr[:2] + "k"

        if len(costStr) == 6:
            if costStr[4] != 0:
                cleanedI["FollowerCount"] = costStr[:3] + "." + costStr[4] + "k"
            else:
                cleanedI["FollowerCount"] = costStr[:3] + "k"

        if len(costStr) == 7:
            if costStr[1] != 0:
                cleanedI["FollowerCount"] = costStr[0] + "." + costStr[1] + "m"
            else:
                cleanedI["FollowerCount"] = costStr[0] + "m"

def convertCost(cleanedI):
    costStr = str(cleanedI["Cost"])

    if len(costStr) > 3:

        if len(costStr) == 4:

            if costStr[1] != 0:
                cleanedI["Cost"] = costStr[0] + "." + costStr[1] + "k"
            else:
                cleanedI["Cost"] = costStr[0] + "k"

        if len(costStr) == 5:
            if costStr[3] != 0:
                cleanedI["Cost"] = costStr[:2] + "." + costStr[3] + "k"
            else:
                cleanedI["Cost"] = costStr[:2] + "k"

        if len(costStr) == 6:
            if costStr[4] != 0:
                cleanedI["Cost"] = costStr[:3] + "." + costStr[4] + "k"
            else:
                cleanedI["Cost"] = costStr[:3] + "k"

        if len(costStr) == 7:
            if costStr[1] != 0:
                cleanedI["Cost"] = costStr[0] + "." + costStr[1] + "m"
            else:
                cleanedI["Cost"] = costStr[0] + "m"

def cleanedDict (cleanedSet):
    cleanedJSON = {}
    for i in cleanedSet:
        convertCost(i)
        convertFollowers(i)
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
        cleanedSet = list(allSet.values('InstaName', 'FollowerCount', 'Cost', 'photo', 'user'))
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
                if "k" in GteNumber:
                    GteNumber = GteNumber.replace("k", "")
                    GteNumber = int(GteNumber + addedK)
                if "k" in LteNumber:
                    LteNumber = LteNumber.replace("k", "")
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
                if "k" in GteNumber:
                    GteNumber = GteNumber.replace("k", "")
                    GteNumber = int(GteNumber + addedK)
                if "k" in LteNumber:
                    LteNumber = LteNumber.replace("k", "")
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
        filteredJSON = list(chainedFilter.values('InstaName', 'FollowerCount', 'Cost', 'photo', 'user'))
        filteredJSON = cleanedDict (filteredJSON)
        if request.user.username != "":
            filteredJSON["Logged"] = "True"
            filteredJSON["seenList"] = idList
        else:
            filteredJSON["Logged"] = "False"
    return JsonResponse(filteredJSON)

def dataConvertion(messageTime):
    timeDiff = math.floor((datetime.datetime.now()-messageTime).total_seconds() / 60)
    difSec = int((datetime.datetime.now()-messageTime).total_seconds())
    timeString = ""
    if timeDiff <= 0:
        print(timeDiff)
        timeString = str(difSec) + " Sec Ago"
    if timeDiff > 0:
        timeString = str(timeDiff) + " Min Ago"
    if timeDiff >= 60:
        timeString = str(math.floor(timeDiff/60)) + " Hr Ago"
    if timeDiff >= 1440:
        timeString = str(math.floor(timeDiff/1440)) + " Day Ago"
    if timeDiff >= 43200:
        timeString = str(math.floor(timeDiff/43200)) + " Mth Ago"
    return timeString

@csrf_exempt
def convoCreate(request):
    data = json.loads(request.body.decode('utf-8'))
    if request.method =="POST":
        recipient = data["data"]["convoUser"]
        u = User.objects.get(username=request.user.username)
        recipient = User.objects.get(pk=recipient)
        convoFilter = Conversation.objects.filter(users=u).filter(users=recipient)
        convoID = None
        if convoFilter.count() != 0:
            convoID = convoFilter[0].id
        else:
            createdConvo = Conversation.objects.create()
            createdConvo.users.add(recipient, u)
            convoID = createdConvo.id

    return JsonResponse({'convoID': convoID})

@csrf_exempt
def conversationFetch(request):
    data = json.loads(request.body.decode('utf-8'))
    if request.method =="POST":
        u = User.objects.get(username=request.user.username)
        convo = Conversation.objects.filter(users=u)
        convoDict = {}
        status = data["status"]
        for i in convo:
            lastMessage = Message.objects.filter(conversation=i).last()
            try:
                messageContent = lastMessage.msg_content
                messageTime = lastMessage.created_at
                messageTime = dataConvertion(messageTime)
            except:
                if status != i.id:
                    i.delete()
                    continue
                messageContent = "No Message History"
                messageTime = "N/A"
            profilePic = False
            for ii in list(i.users.all().values("username")):
                if ii["username"] != request.user.username:
                    sendingUser = User.objects.get(username=ii["username"])
                    sendingUser = UserInfo.objects.get(user=sendingUser)
                    profilePic = str(sendingUser.photo)
                    username = sendingUser.InstaName
            convoDict[i.id] = {"username": username, "profilePic": profilePic, "messageTime": messageTime, "messageContent": messageContent}
        #ConvoDict = { u.id : { profilePic: "", LastMessage: "", MessageTime: ""}}
        convoDict["user"] = u.id
        return JsonResponse({'convo': convoDict})

@csrf_exempt
def messageFetch(request):
    data = json.loads(request.body.decode('utf-8'))
    if request.method =="POST":
        convoID = data["id"]
        convo = Conversation.objects.get(pk=convoID)
        messageList = list(Message.objects.filter(conversation=convo).values('owner', 'msg_content', 'created_at'))
        for i in messageList:
            messageTime = dataConvertion(i['created_at'])
            i["created_at"] = messageTime
        messageJSON = { "data": messageList}
    return JsonResponse(messageJSON)

@csrf_exempt
def messageSend(request):
    data = json.loads(request.body.decode('utf-8'))
    if request.method =="POST":
        convoID = data["convoID"]
        userID = data["UserID"]
        messageCont = data["Chat"]
        messageTime = datetime.datetime.now()
        convo = Conversation.objects.get(pk=convoID)
        u = User.objects.get(pk=userID)
        Message.objects.create(conversation=convo,owner=u,msg_content=messageCont,created_at=messageTime)
    return JsonResponse({"status": "accepted"})
@csrf_exempt
def socialActivation(request):
    #check if a user has the code in use and if so check if it has expired or not
    while True:
        code = ''.join(random.choices(string.digits, k=8))
        try:
            u = UserInfo.objects.get(activationCode=code)
            timeDiff = math.floor((datetime.datetime.now()-u.activationTime).total_seconds() / 60)
            if timeDiff > 60:
                u = User.objects.get(username=request.user.username)
                u = UserInfo.objects.get(user=u)
                u.activationCode = code
                u.activationTime = datetime.datetime.now()
                u.save()
                break
        except:
            u = User.objects.get(username=request.user.username)
            u = UserInfo.objects.get(user=u)
            if u.activationCode != "":
                #check if the hour expire
                timeDiff = math.floor((datetime.datetime.now()-u.activationTime).total_seconds() / 60)
                if timeDiff > 60:
                    u.activationCode = code
                    u.activationTime = datetime.datetime.now()
                    u.save()
                    print("changed")
                else:
                    code = u.activationCode
                    break
            else:
                u.activationCode = code
                u.activationTime = datetime.datetime.now()
                u.save()
                print("changed")
                break
    return JsonResponse({'activationCode': code})


@csrf_exempt
def startActivation(request):
    pass