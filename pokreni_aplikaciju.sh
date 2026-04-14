#!/bin/bash

echo "Pokretanje aplikacije..."

docker-compose up -d

sleep 10

echo "Aplikacija je dostupna na: http://localhost:5173"