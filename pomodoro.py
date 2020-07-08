import time
import math


def timer(type, length):
    for x in range(length, 0, -1):
        minutes = int(math.floor(x/60))
        seconds = (x % 60) if len(str(x % 60)) > 1 else '0{}'.format(x % 60)
        cur = '{}: {}:{}'.format(type, minutes, seconds)
        print(cur)
        time.sleep(1)


timer('Pomodoro', 1500)
timer('Encore', 300)
