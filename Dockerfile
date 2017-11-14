# Client App
FROM johnpapa/angular-cli as client-app
LABEL authors="Brian Clark, John Papa"
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
RUN ng build --prod --build-optimizer
# RUN ls

# Node server
FROM node:6.11-alpine as node-server
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY /src/server /usr/src/app
# RUN ls

# Final image
FROM node:6.11-alpine
WORKDIR /usr/src/app
COPY --from=node-server /usr/src /usr/src
COPY --from=client-app /usr/src/app/dist ./
# RUN ls

EXPOSE 3001
CMD [ "node", "index.js" ]
