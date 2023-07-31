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
