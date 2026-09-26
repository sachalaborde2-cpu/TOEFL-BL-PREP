#!/bin/bash
# Double-clique sur ce fichier pour lancer ta préparation TOEFL.
cd "$(dirname "$0")"
URL="http://localhost:8765"
if curl -s -o /dev/null "$URL/api/status"; then
  echo "Déjà lancé."
else
  python3 server.py &
  SERVER_PID=$!
  for i in 1 2 3 4 5 6 7 8 9 10; do
    curl -s -o /dev/null "$URL/api/status" && break
    sleep 0.3
  done
fi
# Chrome recommandé (reconnaissance vocale la plus fiable pour le Speaking)
if [ -d "/Applications/Google Chrome.app" ]; then
  open -a "Google Chrome" "$URL"
else
  open "$URL"
fi
[ -n "$SERVER_PID" ] && wait $SERVER_PID
