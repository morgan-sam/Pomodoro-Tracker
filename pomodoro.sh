#!/bin/bash
script_name=${BASH_SOURCE[0]}
for pid in $(pidof -x $script_name); do
    if [ $pid != $$ ]; then
        kill -9 $pid
    fi 
done
TIME="$(date -Iseconds)";
ENTRY='{"type":"start","date":"'${TIME::-6}.000Z'"}';
curl -X POST -d $ENTRY 'https://pomodoro-tracker-db95f.firebaseio.com/users/23456789/events.json'
seconds=1500; date1=$((`date +%s` + $seconds)); 
echo -ne 'Pomodoro:\n'
while [ "$date1" -ge `date +%s` ]; do 
  echo -ne "$(date -u --date @$(($date1 - `date +%s` )) +%H:%M:%S)\r"; 
done
clear
notify-send "Pomodoro Complete" "$(echo -e "25 minutes have passed")"
TIME="$(date -Iseconds)Z";
ENTRY='{"type":"pomodoro","date":"'${TIME::-6}.000Z'"}';
curl -X POST -d $ENTRY 'https://pomodoro-tracker-db95f.firebaseio.com/users/23456789/events.json'
seconds=300; date1=$((`date +%s` + $seconds)); 
echo -ne 'Encore:\n'
while [ "$date1" -ge `date +%s` ]; do 
  echo -ne "$(date -u --date @$(($date1 - `date +%s` )) +%H:%M:%S)\r"; 
done
notify-send "Encore Complete" "$(echo -e "5 minutes have passed")"
TIME="$(date -Iseconds)Z";
ENTRY='{"type":"encore","date":"'${TIME::-6}.000Z'"}';
curl -X POST -d $ENTRY 'https://pomodoro-tracker-db95f.firebaseio.com/users/23456789/events.json'
