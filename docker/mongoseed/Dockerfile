FROM mongo:latest
COPY stores.json /stores.json
CMD mongoimport --host mongo --db stores-api --collection stores --drop --file /stores.json --jsonArray