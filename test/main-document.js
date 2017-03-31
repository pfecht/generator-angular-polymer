'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const generatorsDir = "../generators";

describe('angular-polymer:init', () => {
  beforeEach(function (done) {
    helpers.run(require.resolve(path.join(generatorsDir, '/main-document'))).on('end', done);
  });

  it('generates the default configuration', function () {
    //assert.file('.yo-rc.json');
  });
});