const Generator = require('yeoman-generator');
const HeadlessBrowser = require('./utils/headless-browser.js').HeadlessBrowser;
const HttpServer = require('./utils/http-server.js').HttpServer;
const retrieveAndClassifyPolymerElements = require('./utils/dom-operations').retrieveAndClassifyPolymerElements;
const tsfmt = require('typescript-formatter');

class AngularPolymerGenerator extends Generator {
  
  initializing() {
    this._handleInitalRun();
    this.composeWith(require.resolve('../main-document'));
    this.option('clean');
    
    this.outDir = this.config.get('out-dir');
    this.excludedElements = this.config.get('exclude');
  }

  writing() {
    if(this.options.clean) {
      this._clearOutDir();
    }
    
    this._fetchDomData().then((elements) => {
      let filteredElements = elements.filter(element => {
        return this.excludedElements.indexOf(element.name) < 0;
      });
      filteredElements.forEach(element => this._writeRepresentationForElement(element));
      this._writeExportFile(filteredElements);
    });
  }

  _fetchDomData() {
    const server = new HttpServer(this.config.get('server-port'), this.destinationPath());
    const url = `http://localhost:${this.config.get('server-port')}/`;

    server.start();
    return new HeadlessBrowser()
      .processInsideBrowser(url, retrieveAndClassifyPolymerElements)
      .then(data => {
        server.close();
        return data;
      });
  }

  _writeRepresentationForElement(element) {
    const name = element.name;
    const targetPath = this.destinationPath(`${this.outDir}/elements/${name}.ts`);
    this.fs.copyTpl(
      this.templatePath('_polymer-element.ts'),
      targetPath,
      Object.assign(element, {nameCamelCase : this._dashToCamelCase(name)})
    );
    this._beautifyTypeScript(targetPath).then(contents => this.fs.write(targetPath, contents));
  }

  _writeExportFile(elements) {
    const exportedElements = elements.map(element => {
      return {
        className: this._dashToCamelCase(element.name),
        filePath: `./elements/${element.name}`
      }
    });
    this.fs.copyTpl(
      this.templatePath('_index.ts'),
      this.destinationPath(`${this.outDir}/index.ts`),
      {exportedElements : exportedElements}
    );
  }

  _clearOutDir() {
    this.fs.delete(this.destinationPath(`${this.outDir}/*`));
  }

  _dashToCamelCase(name) {
    let nameCamelCase = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    return nameCamelCase.charAt(0).toUpperCase()  + nameCamelCase.substring(1);
  }

  _handleInitalRun() {
    const isInitalRun = (typeof this.config.get('out-dir') === "undefined");
    if(isInitalRun) {
       this.env.error('No current project configuration found. ' 
        + 'Please run angular-polymer:init');
    }
  }

  _beautifyTypeScript(filePath) {
     return tsfmt.processString(filePath, this.fs.read(filePath), { 
       tsfmt: true, 
       tslint: true, 
       replace: false, 
       baseDir: this.destinationPath()
      }).then(contents => {return contents.dest});
  }
}
module.exports = AngularPolymerGenerator;