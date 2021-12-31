#!/bin/bash
# List the ips of the droplets here
# If using mongoDB Atlas. Select : Allow access from anywhere. This will prevent to having to add all IPs from droplets
# 8 IPs here

for i in 68.183.59.86 159.203.102.60 68.183.151.124 165.227.127.200 159.89.35.106 134.209.167.23 138.197.6.183 174.138.63.54
do
	ssh -oStrictHostKeyChecking=no root@$i -i .ssh/digital-ocean-ssh 'sudo apt update'
    ssh root@$i -i .ssh/digital-ocean-ssh 'sudo apt install nodejs -y'
    ssh root@$i -i .ssh/digital-ocean-ssh 'sudo apt install npm -y'
    ssh root@$i -i .ssh/digital-ocean-ssh 'sudo npm cache clean -f'
    ssh root@$i -i .ssh/digital-ocean-ssh 'sudo npm install -g n'
    ssh root@$i -i .ssh/digital-ocean-ssh 'sudo n stable'
    ssh root@$i -i .ssh/digital-ocean-ssh 'curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -'
    ssh root@$i -i .ssh/digital-ocean-ssh 'sudo apt-get install --reinstall nodejs-legacy -y'
    ssh root@$i -i .ssh/digital-ocean-ssh 'sudo apt-get install -y nodejs'
    ssh root@$i -i .ssh/digital-ocean-ssh 'node -v'
    scp -i .ssh/digital-ocean-ssh -r cryptoVisualizer/  root@$i:/root
    ssh root@$i -i .ssh/digital-ocean-ssh 'cd cryptoVisualizer && npm install'
    ssh root@$i -i .ssh/digital-ocean-ssh 'cd cryptoVisualizer && bash run.sh "1m" 10 VolumeAnalyzer > output.log &' & 
done