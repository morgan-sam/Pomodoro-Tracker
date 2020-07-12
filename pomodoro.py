import time
import math
import os
import datetime
import pyrebase
import json

config = {
    "apiKey": "AIzaSyB-j40wdFsSbJ7giMJJwQsymWacOFm0Boo",
    "authDomain": "pomodoro-tracker-db95f.firebaseapp.com",
    "databaseURL": "https://pomodoro-tracker-db95f.firebaseio.com",
    "storageBucket": "pomodoro-tracker-db95f.appspot.com"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
user = auth.sign_in_with_email_and_password(
    "gaspedostu@enayu.com", "1234567890")
db = firebase.database()


def timer(type, length):
    for x in range(length, 0, -1):
        minutes = int(math.floor(x/60))
        seconds = (x % 60) if len(str(x % 60)) > 1 else '0{}'.format(x % 60)
        cur = '{}: {}:{}'.format(type, minutes, seconds)
        print(cur)
        time.sleep(1)
        os.system('clear')


def postEvent(type):
    db.child("users").child(user["localId"]).child("events").push({"type": type, "date": str(
        datetime.datetime.now().isoformat())[:-3]+"Z"}, user["idToken"])


os.system('clear')
postEvent('start')
timer('Pomodoro', 1500)
postEvent('pomodoro')
timer('Encore', 300)
postEvent('encore')
