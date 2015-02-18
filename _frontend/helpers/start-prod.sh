#!/bin/sh

echo "Start watchers in production development mode!"
cd ../../_frontend
pwd=$(pwd)

function new_tab() {
  TAB_NAME=$1
  COMMAND=$2

  osascript \
    -e "tell application \"Terminal\"" \
    -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
    -e "do script \"cd $pwd;clear\" in selected tab of the front window" \
    -e "do script \"printf '\\\e]1;$TAB_NAME\\\a'; $COMMAND\" in front window" \
    -e "end tell" > /dev/null
}

new_tab "Js DEV" "grunt watch:jsProd"
new_tab "Scss DEV" "grunt watch:scssProd"
new_tab "asset DEV" "grunt watch:assetProd"
