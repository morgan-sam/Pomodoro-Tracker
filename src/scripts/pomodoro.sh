#!/bin/bash
script_name=${BASH_SOURCE[0]}
for pid in $(pidof -x $script_name); do
    if [ $pid != $$ ]; then
        kill -9 $pid
    fi 
done
read localId idToken < <(echo $(curl 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-j40wdFsSbJ7giMJJwQsymWacOFm0Boo' \
-H 'Content-Type: application/json' \
--data-binary '{"email":"[EMAIL]","password":"[PASSWORD]","returnSecureToken":true}' | jq --raw-output '.localId, .idToken'))
TIME="$(date -u -Iseconds)";
ENTRY='{"type":"start","date":"'${TIME::-6}.000Z'"}';
curl -X POST -d $ENTRY "https://pomodoro-tracker-db95f.firebaseio.com/users/${localId}/events.json?auth=${idToken}"
seconds=1500; date1=$((`date +%s` + $seconds)); 
echo -ne '\nPomodoro:\n'
while [ "$date1" -ge `date +%s` ]; do 
  echo -ne "$(date -u --date @$(($date1 - `date +%s` )) +%H:%M:%S)\r"; 
done
clear
notify-send "Pomodoro Complete" "$(echo -e "25 minutes have passed")"
TIME="$(date -u -Iseconds)";
ENTRY='{"type":"pomodoro","date":"'${TIME::-6}.000Z'"}';
curl -X POST -d $ENTRY "https://pomodoro-tracker-db95f.firebaseio.com/users/${localId}/events.json?auth=${idToken}"
seconds=300; date1=$((`date +%s` + $seconds)); 
echo -ne '\nEncore:\n'
while [ "$date1" -ge `date +%s` ]; do 
  echo -ne "$(date -u --date @$(($date1 - `date +%s` )) +%H:%M:%S)\r"; 
done
notify-send "Encore Complete" "$(echo -e "5 minutes have passed")"
TIME="$(date -u -Iseconds)";
ENTRY='{"type":"encore","date":"'${TIME::-6}.000Z'"}';
curl -X POST -d $ENTRY "https://pomodoro-tracker-db95f.firebaseio.com/users/${localId}/events.json?auth=${idToken}"
