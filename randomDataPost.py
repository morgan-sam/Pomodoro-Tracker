import requests
import datetime
import random
import math

curYear = datetime.datetime.now().year
curMonth = datetime.datetime.now().month
curDay = datetime.datetime.now().day


class Date:
    def __init__(self, day, month, year):
        self.day = day
        self.month = month
        self.year = year


class Time:
    def __init__(self, hour, minute, second):
        self.hour = hour
        self.minute = minute
        self.second = second


def postEvent(iso, type):
    url = 'https://pomodoro-tracker-db95f.firebaseio.com/users/23456789/events.json'
    entry = {"type": type, "date": iso}
    requests.post(url, json=entry)


def convertDateToIso(date, time):
    return str(datetime.datetime(date.year, date.month, date.day, time.hour, time.minute, time.second).isoformat())[:-3]+'Z'


def getArrayOfMinutesAfter(num):
    li = [0] * num
    for i in range(1, len(li)):
        breakTime = random.randint(15, 60) if random.randint(0, 1) == 0 else 0
        offset = 25+random.randint(5, 15)
        li[i] = li[i-1]+offset+breakTime
    return li


def addEncore(date, time):
    oldDate = datetime.datetime(
        date.year, date.month, date.day, time.hour, time.minute, time.second)
    encoreTime = oldDate + datetime.timedelta(minutes=5)
    encoreIso = convertDateToIso(date, encoreTime)
    postEvent(encoreIso, 'encore')
    print('encore')
    print(encoreIso)


def genRandomDayEvents(date, num):
    minArr = getArrayOfMinutesAfter(num)
    for x in range(num):
        hours = math.floor(minArr[x] / 60)
        if (10+hours < 22):
            pomodoroTime = Time(10+hours, minArr[x] % 60, 0)
            pomodoroIso = convertDateToIso(date, pomodoroTime)
            postEvent(pomodoroIso, 'pomodoro')
            print('pomodoro')
            print(pomodoroIso)
            if(random.randint(0, 2) == 0):
                addEncore(date, pomodoroTime)


def getOffsetDate(date, days):
    tomorrow = date + datetime.timedelta(days)
    return Date(tomorrow.day, tomorrow.month, tomorrow.year)


def addRangeOfDates():
    startingDate = datetime.datetime.now()
    for i in range(14):
        newDate = getOffsetDate(startingDate, i)
        events = random.randint(6, 16)
        genRandomDayEvents(newDate, events)


addRangeOfDates()
