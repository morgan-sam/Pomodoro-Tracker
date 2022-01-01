#!/usr/bin/env python3

import datetime
import pyrebase
import sys

config = {
    "apiKey": "AIzaSyB-j40wdFsSbJ7giMJJwQsymWacOFm0Boo",
    "authDomain": "pomodoro-tracker-db95f.firebaseapp.com",
    "databaseURL": "https://pomodoro-tracker-db95f.firebaseio.com",
    "storageBucket": "pomodoro-tracker-db95f.appspot.com"
}


def authorise(email, password):
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    user = auth.sign_in_with_email_and_password(
        email, password)
    db = firebase.database()
    return [user, db]


def postEvent(iso, type):
    db.child("users").child(user["localId"]).child("events").push(
        {"type": type, "date": iso}, user["idToken"])


def convertDateToIso(time):
    return str(datetime.datetime(time.year, time.month, time.day, time.hour, time.minute, time.second).isoformat())[:-3]+'Z'


def addPomodoroAndEncore():
    [hour, minute] = [int(num_string) for num_string in sys.argv[3].split(':')]
    [month, day, year] = [int(num_string) for num_string in sys.argv[4].split('-')]
    hour_offset = int(sys.argv[5])
    pomodoroTime = datetime.datetime(year, month, day, hour, minute, 0)
    pomodoroTime = pomodoroTime + datetime.timedelta(hours=-hour_offset, minutes=25)
    encoreTime = pomodoroTime + datetime.timedelta(minutes=5)
    pomodoroIso = convertDateToIso(pomodoroTime)
    print(pomodoroIso)
    encoreIso = convertDateToIso(encoreTime)
    postEvent(pomodoroIso, 'pomodoro')
    print('Added Pomodoro')
    postEvent(encoreIso, 'encore')
    print('Added Encore')


if (len(sys.argv) < 5):
    print('Usage: addTestPomodoro.py [EMAIL] [PASSWORD] [TIME: hh:mm] [DATE: mm-dd-yyyy] [HOUR OFFSET]')
else:
    email = sys.argv[1]
    password = sys.argv[2]
    [user, db] = authorise(email, password)
    addPomodoroAndEncore()
