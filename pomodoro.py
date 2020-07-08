import requests
import time
import math
import os
import datetime


def timer(type, length):
    for x in range(length, 0, -1):
        minutes = int(math.floor(x/60))
        seconds = (x % 60) if len(str(x % 60)) > 1 else '0{}'.format(x % 60)
        cur = '{}: {}:{}'.format(type, minutes, seconds)
        print(cur)
        time.sleep(1)
        os.system('clear')


def postEvent(type):
    url = 'https://pomodoro-tracker-db95f.firebaseio.com/users/23456789/events.json'
    entry = {"type": type, "date": str(
        datetime.datetime.now().isoformat())[:-3]+'Z'}
    x = requests.post(url, json=entry)
    print(x.text)


postEvent('start')
timer('Pomodoro', 1500)
postEvent('pomodoro')
timer('Encore', 300)
postEvent('encore')
