'use strict';

const AWS = require('aws-sdk');

const DEFAULT_CONFIGS = {
  'apiVersion': '2017-05-18' // Default API version to 2017
};
const QUERY_RUNNING_STATE = 'RUNNING';

/** Class representing a ZBAthena. */
class ZBAthena {

  /**
   * Constructor of ZBAthena object that create aws-sdk athena handler based on
   * custom configurations given.
   * For region, accessKeyId and secretAccessKey, please make sure they are given
   * in configs param or stored in ~/.aws/ folder locally as stated in aws documentation
   * https://aws.amazon.com/sdk-for-node-js/
   *
   * @param {JSON} configs - Optional configurations as stated from aws-sdk library
   *                         (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Athena.html#constructor-property)
   */
  constructor(configs = {}) {
    this._configs = Object.assign(DEFAULT_CONFIGS, configs);
    this._athena = new AWS.Athena(this._configs);
  }

  /**
   * Get AWS.Athena instance created in constructor.
   * Open up unimplemented APIs for users.
   *
   * @method getInstance()
   * @return {AWS.Athena} AWS.Athena instance
   */
  getInstance() {
    return this._athena;
  }

  /**
   * Promisfied aws Athena library function startQueryExecution.
   * Resolving a JSON with QueryExecutionId as stated in aws documentation.
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Athena.html#startQueryExecution-property
   *
   * @method sendQuery(query)
   * @param {JSON} params - params required by aws-sdk library with format stated
   *                        in documentation above.
   *                        Simple example:
   *                          var params = {
   *                            QueryString: YOUR_QUERY, // Required
                                ResultConfiguration: {
                                  OutputLocation: YOUR_S3_OUTPUT_LOCATION // Required
                                },
                                QueryExecutionContext: {
                                  Database: YOUR_ATHENA_DB_NAME
                                }
                              };
   * @return {promise} A promise that resolve query request id or reject error
   */
  sendQuery(params) {
    return new Promise((resolve, reject) => {
      this._athena.startQueryExecution(params, (err, data) => {
        if (err) {
          reject(err); // an error occurred
        } else {
          resolve(data); // successfully queue up
        }
      });
    });
  }

  /**
   * Check if an Athena query is finished.
   *
   * @method isQueryFinished(executionId)
   * @param executionId - ExecutionId of the query, given when calling sendQuery or startQueryExecution natively.
   * @return {Promise} a promise that resolve whther the task is finished (boolean) or reject errors.
   */
  isQueryFinished(executionId) {
    return new Promise((resolve, reject) => {
      this.getQueryExecution(executionId)
        .then((data) => {
          try {
            var status = data.QueryExecution.Status.State;
            resolve(status !== QUERY_RUNNING_STATE);
          } catch(err) {
            resolve(false); // Defensive programming for chained access
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Get a query execution status using a query request id.
   *
   * @method getQueryExecution(executionId)
   * @param {string} executionId - executionId given when calling sendQuery or startQueryExecution natively.
   * @return {promise} A promise that resolve query execution status or reject error
   */
  getQueryExecution(executionId) {
    return new Promise((resolve, reject) => {
      if (!executionId) {
        reject('Invalid executionId ', executionId);
        return;
      }
      var params = {
        QueryExecutionId: executionId, /* required */
      };
      this._athena.getQueryExecution(params, (err, data) => {
        if (err) {
          reject(err); // an error occurred
        } else {
          resolve(data); // successfully queue up
        }
      });
    });
  }

}

module.exports = ZBAthena;
