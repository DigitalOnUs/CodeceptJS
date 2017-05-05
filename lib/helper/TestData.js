'user strict';
const Helper = require('../helper');
const requireg = require('requireg');
let tempString, papa, fs;

/**
* TestData helper allows to interact with files, either creating output or reading (and parsing) existing files in various formats
* Usage:
*      let csv = yield I.parseCSV("demo.csv");
*      I.say(`Parsed data: ${JSON.stringify(csv.data)}`);
*      I.say(`Errors in parsing: ${JSON.stringify(csv.errors)}`);
* Configuration:
*      Helper should be configured like:
*      "helpers": {
*          "TestData": {
*              "basePath": <String value>  (The base folder path where input files are going to be)
*               "csvHeader": <boolean value> (Whether the CSV file will be parsed with or without headers)
*               "csvDelimiter": <String value> (The delimiter character, comma is used by default if not specified)
*               "csvSkipEmptyLines": <boolean value> (Whether the parser skips empty lines in the file)
*           }
*      }
*/

class TestData extends Helper {

  constructor(config) {
    super(config);
    fs = requireg('fs');
    papa = requireg('papaparse');
    this.options = {
      basePath: "",
      csvHeader: true,
      csvDelimiter: ",",
      csvSkipEmptyLines: true,
    };
    this.tempString = null;
    Object.assign(this.options, config);
  }

  static _checkRequirements() {
    try {
      requireg("papaparse");
    } catch (e) {
      return ["PapaParse"];
    }
  }

  setInputFilesBasePath(basePath){
    this.options.basePath = basePath;
  }

  getFileExtension(file){
    return file.split('.').pop();
  }

  convertCSVToString(filePath){
    if (this.options.basePath.length > 0) {
      filePath = this.options.basePath + filePath;
    }

    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
          return reject(err);
        }
        if (data === undefined) {
          return reject(data);
        } else {
          tempString = data;
          return resolve(data);
        }
      });
    });
  }

  parseString(data, hasHeader = true, theDelimiter = ",", shouldSkipEmptyLines = true){
    let parsed;
    parsed = papa.parse(data, {
      header: hasHeader,
      delimiter: theDelimiter,
      skipEmptyLines: shouldSkipEmptyLines,
      complete: function (results){
        return results;
      }
    });
    return parsed;
  }

  getParsedCsv(filePath, hasHeader = true, theDelimiter = ",", shouldSkipEmptyLines = true){
    let parsed;
    if (this.options.basePath.length > 0) {
      filePath = this.options.basePath + filePath;
    }
    let data = fs.readFileSync(filePath, 'utf8');
    parsed = papa.parse(data, {
      header: hasHeader,
      delimiter: theDelimiter,
      skipEmptyLines: shouldSkipEmptyLines,
      complete: function (results){
        return results;
      }
    });
    return parsed;
  }

}
module.exports = TestData;
