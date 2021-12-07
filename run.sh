# start in ubuntu machine with command like bash run.sh "1m" 10 "VolumeAnalyzer"
# start in ubuntu machine with command like bash run.sh "1m" 10 "SMAAnalyzer"

INTERVAL=$1
LENGTH=$2
ANALYZER=$3

while [ true ]
do
    npm run getcoins
    npm run start $INTERVAL $LENGTH $ANALYZER
done