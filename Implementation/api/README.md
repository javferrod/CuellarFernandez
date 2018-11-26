# API
This folder containers the Docker config files and the code needed to deploy the API server of TrackMe products.

## Dependencies
Docker and docker-compose are needed.

## Deployment
First, the docker image of the api needs to be build:
`docker build . -t 'trackme-api'`

This instruction will download a node image, copy the source code, install the javascript dependencies using npm and then it will transpile the code for node. 


Then, docker compose will fire the needed container for us:
`docker-compose up`

This will create three containers. One mongoDB instance that will store the data in data/mongo folder, one InfluxDB that will store the data in data/influx and finally the container with the API.

Port 8080 will be exposed.
