'user strict';
const Helper = require('../helper');
const requireg = require('requireg');
let unirest;

/**
* REST helper to execute RESTful API calls, this is currently under development phase.
* Please visit our demo repo to know how to use this Helper.
* [https://github.com/DigitalOnUs/codeceptjs-poc/tree/master/tests/REST#using-rest-api-on-codeceptjs]
* Usage:
*      let response = yield I.sendGet('https://randomuser.me/api/')
*      I.say(`I received: ${response.raw_body}`)
* Configuration:
*      Helper should be configured like:
*      "helpers": {
*          "REST": {
*              "timeout": <integer numeric value>  (you can either send a default timeout property or not according to your needs)
*           }
*      }
*/

class REST extends Helper {

  constructor(config) {
    super(config);
    unirest = require('unirest');
    this.options = {
      timeout: 3000
    };
    Object.assign(this.options, config);
  }

  static _checkRequirements() {
    try {
      requireg("unirest");
    } catch (e) {
      return ["unirest"];
    }
  }

  setRestTimeout(newTimeout){
    this.options.timeout = newTimeout;
  }

  sendGet(url, headers = {}, auth = {}){
    let request = unirest.get(url);
    if (Object.keys(auth).length > 2) {
      request.auth(auth);
    }
    request.timeout(this.options.timeout);
    return new Promise(function (resolve, reject){
      request
                .headers(headers)
                .end(function (response){
                  if (response.code >= 400) {
                    return reject(response);
                  }
                  return resolve(response);
                });
    });
  }

  sendPost(url, headers = {}, payload = {}){
    let request = unirest.post(url);
    request.timeout(this.options.timeout);
    return new Promise(function (resolve, reject){
      request
                .headers(headers)
                .send(payload)
                .end(function (response){
                  if(response.code >= 400) {
                    return reject(response);
                  }
                  return resolve(response);
                });
    });
  }

  sendPut(url, headers = {}, payload = {}){
    let request = unirest.put(url);
    request.timeout(this.options.timeout);
    return new Promise(function (resolve, reject){
      request
                .headers(headers)
                .send(payload)
                .end(function (response){
                  if (response.code >= 400) {
                    return reject(response);
                  }
                  return resolve(response);
                });
    });
  }

  sendDelete(url, headers = {}){
    let request = unirest.delete(url);
    request.timeout(this.options.timeout);
    return new Promise(function (resolve, reject){
      request
                .headers(headers)
                .end(function (response){
                  if (response.code >= 400) {
                    return reject(response);
                  }
                  return resolve(response);
                });
    });
  }
}
module.exports = REST;
