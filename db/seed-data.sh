#!/bin/sh
docker exec hc-db sh -c "mongoimport --db hc --collection flights --file /app/data/flights.json --jsonArray"
