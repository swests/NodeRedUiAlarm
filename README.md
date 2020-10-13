# Node Red UI Alarm Panel - By Manzn with additions from Benmprojects and further modified by kmycek

## Disclaimer
The repo is built on the code from Manzn, with additions from Benmprojects. It was not operational for me, so I tweaked the log, added two missing image placeholders (alarm triggered and armed night), and the node red code, accordingly.
Feel free to create a new issue or pull request here **if you downloaded code from my repo**.
The corresponding HA thread https://community.home-assistant.io/t/node-red-ui-alarm-panel-for-yet-another-take-on-an-alarm-system

## Installation
TO allow Node Red UI alarm to talk to Yet another Alarm Panel you will need to turn on MQTT in YAAP and turn on Override Code.

1.  Install Node Red then under the addon add port 1880 to the Network section. Press save.
2.  Open Node Red then from the hamburger menu goto manage palette then click install tab then type node-red-dashboard.
    Click install on node-red-dashboard.
3.  Then from the hamburger menu click import then clipboard copy then paste the code from alarmpanel.json into the box.
4.  From there you will need to make a couple of changes which I have added notes to in the flow.
5.  Copy alarm_logging.json to /config/resources/bwalarm
6.  Copy the images to /config/resources/bwalarm/images/

## Note
You will have to have an operational installation of bwalarm, including a valid bwalarm.yaml located in /config/resources/bwalarm. I recommend the "Ak74 edition" - https://github.com/akasma74/Hass-Custom-Alarm
