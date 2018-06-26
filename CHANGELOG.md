## angular-cosmosdb Changelog

<a name="1.0.1"></a>
# 1.0.1 (2018-06-26)

*Bug Fixes*
* Fix [8436](https://github.com/MicrosoftDocs/azure-docs/issues/8436)
    - Error on insert due to duplicate key. Mongoose reserves the key `id` and we're attempting to use that within our Hero model. Changed our model to have a key of `uid` instead.
