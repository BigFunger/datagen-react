PUT datagen/dataplan/watch_data
{
  "definition": {
    "dataplanId": "",
    "datasources": [
      {
        "method": "now",
        "field": "@created_timestamp",
        "value": "",
        "startDate": "",
        "endDate": "",
        "datasourceId": "new_datasource_1",
        "typeId": "date"
      },
      {
        "method": "range",
        "field": "@timestamp",
        "value": "",
        "startDate": "1-1-2017",
        "endDate": "1-31-2017",
        "datasourceId": "new_datasource_2",
        "typeId": "date"
      },
      {
        "method": "values",
        "field": "user_id",
        "length": 100,
        "values": [
          "Jim",
          "Joe",
          "Shaunak",
          "Kate",
          "Christopher",
          "James",
          "Jean",
          "Kim",
          "Sarah",
          "Adam",
          "Hailey",
          "Ben"
        ],
        "charset": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        "datasourceId": "new_datasource_3",
        "typeId": "keyword"
      },
      {
        "field": "minutes_in_application",
        "type": "double",
        "scalingFactor": 1,
        "rangeMin": 1,
        "rangeMax": 60,
        "datasourceId": "new_datasource_4",
        "typeId": "number"
      }
    ],
    "indexName": "watcher-data",
    "typeName": "documents",
    "numberOfDocuments": "100",
    "mapping": {
      "mappings": {
        "documents": {
          "properties": {
            "@created_timestamp": {
              "type": "date"
            },
            "@timestamp": {
              "type": "date"
            },
            "user_id": {
              "type": "keyword"
            },
            "minutes_in_application": {
              "type": "double"
            }
          }
        }
      }
    }
  }
}