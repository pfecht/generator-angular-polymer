import http = require('http');
import express = require('express');
import path = require('path');

export class HttpServer {
  private server:any;

  constructor(private port:number, private rootDir:string, private importRootDir) {
    
  }
  
  start() {
    let app = express();
    app.use(express.static(this.rootDir));
    app.use('/imports', express.static(this.importRootDir));
    this.server = http.createServer(app).listen(this.port);
  }

  close() {
    this.server.close();
  }
}