const Generator = require('yeoman-generator');
const path = require('path');

// Generator to create the server's index.html file based on the configuration.
class MainDocumentGenerator extends Generator {
  initializing() {
    this.htmlImports = this.config.get("html-imports");
    if(!this.htmlImports || this.htmlImports.length == 0) {
      throw new Error(`Please configure HTML Imports for Polymer Elements 
        (see html-imports param in .yo-rc.json).`)
    }
  }

  writing() {
    this._checkHtmlImportFiles();
    let htmlImports = this.htmlImports.map(filePath => path.join('/imports', filePath));
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.templatePath('../../../public/index.html'),
      {htmlImports : htmlImports}
    );
  }
  
  _checkHtmlImportFiles() {
    const self = this;
    this.htmlImports.forEach(function(filePath) {
      if(!self.fs.exists(self.destinationPath(filePath)) && !self.fs.exists(filePath)) {
        self.env.error(`HTML-Import File with path ${filePath} does not exist.`);
      }    
    });
  }
};
module.exports = MainDocumentGenerator;