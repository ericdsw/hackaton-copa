#!/bin/sh
cd ui
yarn test --watchAll=false
cd ..
cd api
yarn test
