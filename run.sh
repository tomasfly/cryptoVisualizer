# start in ubuntu machine with command like bash run.sh "1m" 10
TIMEFRAME=$1
CANDLES=$2

while [ true ]
do
    npm run getcoins
    npm run start $TIMEFRAME $CANDLES
done