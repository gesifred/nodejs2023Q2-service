FROM node:18.17-alpine

# app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

#To bundle your app's source code inside the Docker image, use the COPY instruction:
# Bundle app source
COPY . .

ENV POSTGRES_HOST=db.db.com
ENV POSTGRES_PORT=5432
ENV POSTGRES_DB=homelibrarydb
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=123456
ENV PGUSER=postgres
ENV PORT=4000

##RUN npm run migration:run

EXPOSE ${PORT}
CMD [ "npm", "run", "start:migration:dev"]