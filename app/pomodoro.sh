#!/bin/bash
script_name=${BASH_SOURCE[0]}
for pid in $(pidof -x $script_name); do
    if [ $pid != $$ ]; then
        kill -9 $pid
    fi 
done
curl -X POST -d "{\"event\": \"start\", \"date\": \""$(date -Iseconds)"\"}" -H "Content-Type: application/json" http://localhost:8000/api
seconds=1500; date1=$((`date +%s` + $seconds)); 
echo -ne 'Pomodoro:\n'
while [ "$date1" -ge `date +%s` ]; do 
  echo -ne "$(date -u --date @$(($date1 - `date +%s` )) +%H:%M:%S)\r"; 
done
clear
python ./notification/finish.py
curl -X POST -d "{\"event\": \"finish\", \"date\": \""$(date -Iseconds)"\"}" -H "Content-Type: application/json" http://localhost:8000/api
seconds=300; date1=$((`date +%s` + $seconds)); 
echo -ne 'Encore:\n'
while [ "$date1" -ge `date +%s` ]; do 
  echo -ne "$(date -u --date @$(($date1 - `date +%s` )) +%H:%M:%S)\r"; 
done
python ./notification/encore.py
curl -X POST -d "{\"event\": \"encore\", \"date\": \""$(date -Iseconds)"\"}" -H "Content-Type: application/json" http://localhost:8000/api

