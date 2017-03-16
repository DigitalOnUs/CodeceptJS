'user strict';
const Helper = require('../helper');
const unirest = require('unirest');
/**
 * REST helper to execute RESTful API calls, this is currently under development phase.
 * Usage:
 *      let response = yield I.sendGet('https://randomuser.me/api/')
 *      I.say(`I received: ${response.raw_body}`)
 * Configuration:
 *      Helper should be configured like:
 *      "helpers": {
 *          "REST": {}
 *      }
 */
class REST extends Helper {

    constructor(config) {
        super(config);
    }

    sendGet(url, headers = {}, auth={}, timeout = 5000){
        let request = unirest.get(url);
        request.timeout(timeout);
        if (Object.keys(auth).length > 2) {
            // Add AUTH if it contains basic AUTH properties
            request.auth(auth);
        }
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

    sendPost(url, headers = {}, payload = {}, timeout = 5000){
        let request = unirest.post(url);
        request.timeout(timeout);
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

    sendPut(url, headers = {}, payload = {}, timeout = 5000){
        let request = unirest.put(url);
        request.timeout(timeout);
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

    sendDelete(url, headers = {}, timeout = 3000){
        let request = unirest.delete(url);
        request.timeout(timeout);
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
