#!/bin/bash

sudo apt-get update && sudo apt-get upgrade -y && curl -fsSL https://get.docker.com -o get-docker.sh | sh && sudo apt-get install -y docker-compose

docker-compose up --build -d

echo -e "\e[32mScript completed successfully.\e[0m"