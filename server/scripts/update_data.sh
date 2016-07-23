#!/bin/bash
node import_spreadsheet.js &&
mongoimport --db clearview --collection doctors --drop --type json --file ../data/doctors.json --jsonArray &&
mongoimport --db clearview --collection hospitals --drop --type json --file ../data/hospitals.json --jsonArray &&
mongoimport --db clearview --collection pharmacies --drop --type json --file ../data/pharmacies.json --jsonArray
