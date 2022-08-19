FROM mongo:latest
COPY stores.json /stores.json
COPY users.json /users.json
CMD mongoimport --host mongo --db stores-api --collection stores --drop --file /stores.json --jsonArray && mongoimport --host mongo --db stores-api --collection users --drop --file /users.json --jsonArray