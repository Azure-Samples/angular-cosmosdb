---
services: cosmos-db
platforms: nodejs
author: jopapa
---

# Angular Cosmos DB

by [John Papa](http://twitter.com/john_papa) and [Brian Clark](http://twitter.com/_clarkio)

You can [watch me build the app as part of my series here](https://johnpapa.net/angular-cosmosdb-1/)

You can [view all videos together here](/VIDEOS.md)

[Learn more about developing Node.js apps with Azure's cloud services here](https://docs.microsoft.com/en-us/nodejs/azure)

## Requirements

1. Install the Angular CLI

    ```bash
    npm install -g @angular/cli
    ```

1. Install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

1. Create a [CosmosDB instance](https://docs.microsoft.com/en-us/azure/cosmos-db/tutorial-develop-mongodb-nodejs-part4)

## Getting Started

1. Clone this repository

    ```bash
    git clone https://github.com/johnpapa/angular-cosmosdb.git
    cd angular-cosmosdb
    ```

1. Install the npm packages

    ```bash
    npm i
    ```

1. Register your app with Twitter for login
    - Go to [Twitter Apps](https://apps.twitter.com/)
    - Click "Create New App" and fill in your application's information
    - Once created, click on the "Keys and Access Tokens" tab
    - Take note of your Twitter API Key and Secret to use in the app configuration

1. Configure Cosmos DB server and Twitter settings

    Create a file with the following name and location `server/env/development.js` and copy the contents from `server/env/example.js` into it. Replace the values with your specific configuration.

    ```javascript
    const serverPort = 3001;
    const sessionSecret = 'your-unique-randomly-generated-secret';

    const cosmos = {
      name: 'your-cosmosdb-name',
      key: 'your-cosmosdb-key',
      port: 10255
    };

    const twitter = {
      consumerKey: 'your-twitter-app-key',
      consumerSecret: 'your-twitter-app-secret',
      callbackURL: `http://localhost:3001/api/auth/twitter/callback`
    };

    module.exports = {
      serverPort,
      sessionSecret,
      cosmos,
      twitter
    };
    ```

## Running the app

1. Build the Angular app and launch the node server

    ```bash
    npm run start-fresh
    ```

1. Open the browser to http://localhost:3001


## Docker

- Install and run [Docker](https://www.docker.com/community-edition)

### Docker Compose

- Create the Docker image and run it locally

```bash
npm run docker
open http://localhost:3001
```

### Docker Compose with Debugging

- Create the Docker image and run it locally

```bash
npm run docker-debug
open http://localhost:3001
```

Open VS Code, launch the `Docker: Attach to Node` debugging profile

### Docker Run

- Install and run [Docker](https://www.docker.com/community-edition)
- Create the Docker image and run it locally

```bash
# build the image
dockerImage=angular-cosmosdb
port=3001
docker build -t $dockerImage .

# create and run the container
docker run -d -p $port:3001 -p 9229:9229 -e "NODE_ENV=development" $dockerImage

open http://localhost:$port
```

## Problems or Suggestions

[Open an issue here](https://github.com/johnpapa/angular-cosmos/issues)
