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

This will create two containers. One timescale instance that will store the data in ./data folder and one container with the API.

Port 8080 will be exposed.

A copy of the frontend is included and served from NodeJS. Going to http://localhost:8080 will show the frontend.

## Credentials
A client is already created. The user is client and the password is client.

## Troubleshooting

### Errors on start
The first time timescale is launched, it needs to create the database. The API tries to connect to the database 8 seconds after it is started. May happend that timescale has not finish in time.

Relaunching docker-compose will fix the problem.

### Build stuck in npm install
Some WiFi connections as the ones in residences or universities gives problem accessing the NPM repositories. Connecting an unrestricted
network will fix the problem.