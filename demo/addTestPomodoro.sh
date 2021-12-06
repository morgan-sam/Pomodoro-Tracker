#!/bin/bash
script_name=${BASH_SOURCE[0]}
for pid in $(pidof -x $script_name); do
    if [ $pid != $$ ]; then
        kill -9 $pid
    fi 
done
args=("$@")
echo ${args[0]} ${args[1]}
read localId idToken < <(echo $(curl 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-j40wdFsSbJ7giMJJwQsymWacOFm0Boo' \
-H 'Content-Type: application/json' \
--data-binary '{"email":"'${args[0]}'","password":"'${args[1]}'","returnSecureToken":true}' | jq --raw-output '.localId, .idToken'))
TIME="$(date -u -Iseconds)";
ENTRY='{"type":"pomodoro","date":"'${TIME::-6}.000Z'"}';
curl -X POST -d $ENTRY "https://pomodoro-tracker-db95f.firebaseio.com/users/${localId}/events.json?auth=${idToken}"
