import time
import math
import os


def timer(type, length):
    for x in range(length, 0, -1):
        minutes = int(math.floor(x/60))
        seconds = (x % 60) if len(str(x % 60)) > 1 else '0{}'.format(x % 60)
        cur = '{}: {}:{}'.format(type, minutes, seconds)
        print(cur)
        time.sleep(1)
        os.system('clear')


timer('Pomodoro', 1500)
timer('Encore', 300)
