#!/bin/sh
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install curl git nodejs nodejs-legacy npm
git clone https://github.com/CCCAdelaide/WebApp.git
cd WebApp
sudo npm install
sudo npm install -g forever
1forever app.js
