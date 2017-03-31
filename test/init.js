'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const defaultConfig = require('../generators/init/default-config.js');

const generatorsDir = "../generators";

describe('angular-polymer:init', () => {
  beforeEach(function (done) {
    helpers.run(require.resolve(path.join(generatorsDir, '/init'))).on('end', done);
  });

  it('generates the default configuration', function () {
    assert.file('.yo-rc.json');
    assert.fileContent(
      '.yo-rc.json', 
      new RegExp(defaultConfig)
    );
  });
});