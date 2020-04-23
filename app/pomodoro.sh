#!/bin/bash
script_name=${BASH_SOURCE[0]}
for pid in $(pidof -x $script_name); do
    if [ $pid != $$ ]; then
        kill -9 $pid
    fi 
done
curl -X POST -d "{\"type\": \"start\"}" -H "Content-Type: application/json" https://pomodoro-tracker-app.herokuapp.com/entries
seconds=1500; date1=$((`date +%s` + $seconds)); 
echo -ne 'Pomodoro:\n'
while [ "$date1" -ge `date +%s` ]; do 
  echo -ne "$(date -u --date @$(($date1 - `date +%s` )) +%H:%M:%S)\r"; 
done
clear
python ./notification/finish.py
curl -X POST -d "{\"type\": \"pomodoro\"}" -H "Content-Type: application/json" https://pomodoro-tracker-app.herokuapp.com/entries
seconds=300; date1=$((`date +%s` + $seconds)); 
echo -ne 'Encore:\n'
while [ "$date1" -ge `date +%s` ]; do 
  echo -ne "$(date -u --date @$(($date1 - `date +%s` )) +%H:%M:%S)\r"; 
done
python ./notification/encore.py
curl -X POST -d "{\"type\": \"encore\"}" -H "Content-Type: application/json" https://pomodoro-tracker-app.herokuapp.com/entries

