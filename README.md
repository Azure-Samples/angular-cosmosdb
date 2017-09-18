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

    Rename the `example-environment.js` file to `environment.js` in the `server/env/` folder and update it with your Cosmos DB settings. Replace the database name key, and port with your specific configuration.

    ```javascript
    // Replace with your default values
    const serverPort = process.env.SERVER_PORT || 3001;

    const cosmos = {
      comsosDbName: process.env.COSMOSDB_NAME || 'your-cosmosdb-name-goes-here', //
      cosmosDbKey: process.env.COSMOSDB_KEY || 'your-cosmosdb-key-goes-here',
      cosmosDbPort: process.env.COSMOSDB_PORT || 10255 // replace with your port
    };

    const twitter = {
      consumerKey: process.env.TWITTER_CLIENT_KEY || 'your-twitter-client-key-goes-here',
      consumerSecret: process.env.TWITTER_CLIENT_SECRET || 'your-twitter-client-secret-goes-here',
      callbackURL: process.env.TWITTER_CALLBACK_URL || 'your-twitter-callback-url'
    };

    module.exports = {
      serverPort,
      cosmos,
      twitter
    };
    ```

## Running the app

1. Build the Angular app

    ```bash
    ng build
    ```

1. Launch the server

    ```bash
    SERVER_PORT=3002 PUBLICWEB='./dist/publicweb' node src/server/index.js
    ```

1. Open the browser to http://localhost:3001

## Docker

- Install and run [Docker](https://www.docker.com/community-edition)
- Create the Docker image and run it locally

```bash
# build the image
dockerImage=angular-cosmosdb
port=3001
docker build -t $dockerImage .

# create and run the container
docker run -d -p $port:3001 -p 9229:9229 -e "TWITTER_CALLBACK_URL=http://localhost:$port/api/auth/twitter/callback" $dockerImage

open http://localhost:$port
```

## Problems or Suggestions

[Open an issue here](https://github.com/johnpapa/angular-cosmos/issues)
