const Generator = require('yeoman-generator');
const defaultConfig = require('./default-config.js');

class InitAngular2PolymerGenerator extends Generator {
  default() {
    const isInitalRun = (typeof this.config.get('out-dir') === "undefined");
    if(!isInitalRun) {
      this.env.error('Generator has already been initalized!');
    }
    this.config.defaults(defaultConfig);
    this.config.save();
    this.log('Generator has been successfully initialized. Please customize the configuration file '
      + '(yr-rc.json) for your project before running the generator the first time.'
    );
  }
};
module.exports = InitAngular2PolymerGenerator;