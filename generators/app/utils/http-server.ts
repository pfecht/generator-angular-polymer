import http = require('http');
import express = require('express');
import path = require('path');

export class HttpServer {
  private server:any;

  constructor(private port:number, private rootDir:string) {
    
  }
  
  start() {
    let app = express();
    app.use(express.static(path.join(__dirname, '/../../../public/')));
    app.use('/imports', express.static(this.rootDir));
    this.server = http.createServer(app).listen(this.port);
  }

  close() {
    this.server.close();
  }
}