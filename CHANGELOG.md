## angular-cosmosdb Changelog

<a name="0.2.0"></a>
# 0.2.0 (2017-12-02)

*Breaking Changes*

* Added `.env` file in the root
* Added `dotenv` to read the `.env` file when running locally (without docker)
* Removed `./src/server/environment` folder and its contents (replaced with `.env`)
* docker-compose "debug" now uses the `.env` file
* docker-compose for prod and cloud hosting will require ENV vars to be set in the cloud
* `.env` is gitignored and not copied in the `Dockerfile` build process
