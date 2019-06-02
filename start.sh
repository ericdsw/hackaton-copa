#!/bin/sh
cd ui
yarn build
cd ..
docker-compose up -d --build
cd db
./seed-data.sh
