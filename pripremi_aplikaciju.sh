#!/bin/bash

echo "Priprema aplikacije..."

docker network create daily-wins-network

docker volume create postgres_data

docker build -t daily-wins-backend ./backend
docker build -t daily-wins-frontend ./frontend

echo "Priprema završena!"