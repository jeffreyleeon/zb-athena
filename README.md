# zb-athena
AWS Athena client library wrapper for sending, checking and reformatting query

# Initialize zbAthena object
```

const ZBAthena = require('zb-athena');

// Initializing ZBAthena object using credentials in ~/.aws/ folder
const zbAthena = new ZBAthena();

// Initializing ZBAthena object with custom inputs
// Please follow constructor params from aws doc (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Athena.html#constructor-property)
const zbAthena = new ZBAthena({
  'region': <YOUR_REGION>,
  'accessKeyId': <YOUR_ACCESS_KEY>,
  'secretAccessKey': <YOUR_SECRET_KEY>
});

```

# Getting AWS instance provided by library 'aws-sdk'
Developers are allowed to get back instance created by 'aws-sdk' module to use functions that are not supported in this library.
```

const ZBAthena = require('zb-athena');

// Initializing ZBAthena object using credentials in ~/.aws/ folder
const zbAthena = new ZBAthena();
const awsClient = zbAthena.getInstance();

```

# Sending Athena query
```

const ZBAthena = require('zb-athena');

// Initializing ZBAthena object using credentials in ~/.aws/ folder
const zbAthena = new ZBAthena();

const query = <YOUR_ATHENA_QUERY>;
const queryParams = {
  QueryString: query, /* required */
  ResultConfiguration: { /* required */
    OutputLocation: <YOUR_ATHENA_OUTPUT_LOCATION> /* required */
  },
  QueryExecutionContext: {
    Database: <YOUR_ATHENA_DB>
  }
};
zbAthena.sendQuery(queryParams)
  .then((queryResponse) => {
    // Query execution id will be given in queryResponse
  })
  .catch((err) => {
    // Error if client is setup wrongly or others
  });

```

# Checking status of query
```

const ZBAthena = require('zb-athena');

// Initializing ZBAthena object using credentials in ~/.aws/ folder
const zbAthena = new ZBAthena();

zbAthena.isQueryFinished(YOUR_QUERY_EXECUTION_ID)
  .then((isFinished) => {
    // isFinished will be a boolean
  })
  .catch((err) => {
    // Error if client is setup wrongly or others
  });

```

# Retrieving query results and convert to JSON
```

const ZBAthena = require('zb-athena');

// Initializing ZBAthena object using credentials in ~/.aws/ folder
const zbAthena = new ZBAthena();

zbAthena.getQueryResults(YOUR_QUERY_EXECUTION_ID)
  .then((results) => {
    // Results in Athena returned format, which is not too intuitive when using
    const resultsInJSON = zbAthena.convertQueryResultToJson(results);
  })
  .catch((err) => {
    // Error if client is setup wrongly or others
  });

```
