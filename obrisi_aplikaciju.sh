#!/bin/bash

echo "Brisanje aplikacije..."

docker-compose down -v --rmi all

docker volume rm postgres_data 2>/dev/null || true

docker network rm daily-wins-network 2>/dev/null || true

echo "Aplikacija i svi resursi obrisani."