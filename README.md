# Home Library Service

Home library Service Part 1
Service to generate Music favorites in some InMemory database:
- Such as Artists, Albums, Tracks, and add those to Favorites 
- You are able to create a User with password and edit such password
- You can look for OpenApi Specs at **doc** url

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- **! important** use the LTS version of node at least **v18.16.0**

## Downloading
**! Important**  
 Clone repository and change to **dev** branch
```
git clone { THIS repository URL }

cd nodejs2023Q2-service

git checkout dev
```

## Installing NPM modules

```
npm install
```
## Running application with docker containers and docker-compose
docker hub image: https://hub.docker.com/r/gesifred/nestjs-home-library

To run the app and the postgres database use:
```
docker-compose up
```
to run tests without explicitly login inside container
```
npm run docker-app:test
```

If you want to login inside the container:

```
docker exec -it nestjs-app /bin/sh
```
When you are inside the container the prompt `/usr/src/app # ` will appear, 
then inside container you can run **tests** with:

```
## inside container

/usr/src/app # npm run test
```

To run a vulnerability scan you need to use `scan:vuln` it will take a couple of minutes depending on your connection
```
## inside container

/usr/src/app # npm run scan:vuln
```
it will download the tool and scan vulnerabilities for you

!!! It is possible to run test in local environment (outside container) by just running `npm run test`
```
npm run test
```

That means that **you can run test in the local code or inside the container** whatever you require/want because the parameters of the postgres containers are in the .env code in both places

- To stop docker-compose use:

    ```
    docker-compose down --volumes
    ```
- If you decide to delete the images to start over you need to delete the postgres folder to hold volume
use the command: `clean-postgres:folder` preferable with sudo permissions
```
sudo npm run clean-postgres:folder
```
- to run docker in dettach mode 
```
docker-compose up -d
```

!! Remember you can still run the application in localhost, and it will connect to the postgres database
also it is capable to run all tests `npm run test`

- Some docker specs:
  - image for postgres: `postgres:15.3-alpine`
  - Dockerfile for postgres in folder: `./t_db_dockerfile/Dockerfile`
  - exposed port for postgres : 5432 in ENV parameters, could change on request config
  - image for app: `node:18.17-alpine`
  - Dockerfile for app: `./Dockerfile`
  - exposed port for app: 4000 in ENV parameters, could change on request config
  - Custom network named: `postgres` with `bridge` driver
  - Both use hostnames for communication inside the internal network
  - The `.env` file is copied only for testing purposes, to define an own environment one could create proper .env file
  - The app image is located in docker-hub : https://hub.docker.com/r/gesifred/nestjs-home-library

## Running application

```
npm start
```
- You can set an .env with *PORT* variable in it
- After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

- also for dev mode running 
```
npm run start:dev
```

- also for production mode running 
```
npm run start:prod
```
- Building to dist
```
npm run build
```
## Testing
**!important:** BEFORE TEST you NEED TO RUN THE APPLICATION FIRST!

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
