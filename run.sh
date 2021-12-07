# start in ubuntu machine with command like bash run.sh "1m" 10 "VolumeAnalyzer"
INTERVAL=$1
LENGTH=$2
ANALYZER=$3

while [ true ]
do
    timeout 120 npm run getcoins
    timeout 900 npm run start $INTERVAL $LENGTH $ANALYZER
done