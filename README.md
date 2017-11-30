---
services: cosmos-db
platforms: nodejs
author: jopapa
---

# Angular Cosmos DB

by [John Papa](http://twitter.com/john_papa)

You can [watch me build the app as part of my series here](https://johnpapa.net/angular-cosmosdb-1/)

You can [view all videos together here](/VIDEOS.md)

[Learn more about developing Node.js apps with Azure's cloud services here](https://docs.microsoft.com/en-us/nodejs/azure)

## Requirements

1. Install the Angular CLI

    ```bash
    npm install -g @angular/cli
    ```

1. Install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

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

1. Configure Cosmos DB server settings

    Rename the `example-environment.js` file to `environment.js` in the `server/env/` folder and update it with your Cosmos DB settings. Replace the account, database name, key, and port with your specific configuration.

    ```javascript
    // server/env/environment.js

    module.exports = {
      accountName: 'your-cosmosdb-account-name-goes-here',
      databaseName: 'your-cosmosdb-database-name-goes-here',
      key: 'your-key-goes-here',
      port: 10255
    };
    ```

## Running the app

1. Build the Angular app

    ```bash
    ng build
    ```

1. Launch the server

    ```bash
    node src/server/index.js
    ```

1. Open the browser to http://localhost:3000

## Problems or Suggestions

[Open an issue here](https://github.com/johnpapa/angular-cosmos/issues)
