#!/bin/bash

sudo apt install jq -y
sudo npm install -g npm
sudo npm install -g standard prettier
curl https://sdk.cloud.google.com > installGcloud.sh
bash installGcloud.sh --disable-prompts
echo "source /home/codespace/google-cloud-sdk/path.bash.inc" >> ~/.bashrc
echo "Please close and reopen any open terminals"