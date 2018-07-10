'use strict';

const AWS = require('aws-sdk');

const DEFAULT_CONFIGS = {
  'apiVersion': '2017-05-18' // Default API version to 2017
};

/** Class representing a ZBAthena. */
class ZBAthena {

  /**
   * Constructor of ZBAthena object that create aws-sdk athena handler based on
   * custom configurations given.
   * For region, accessKeyId and secretAccessKey, please make sure they are given
   * in configs param or stored in ~/.aws/ folder locally as stated in aws documentation
   * https://aws.amazon.com/sdk-for-node-js/
   * @param {JSON} configs - Optional configurations as stated from aws-sdk library
   *                         (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Athena.html#constructor-property)
   */
  constructor(configs = {}) {
    this._configs = Object.assign(DEFAULT_CONFIGS, configs);
    this._athena = new AWS.Athena(this._configs);
  }

}

module.exports = ZBAthena;
