import path = require('path');
// No typings for current nightmare versions available... 
const Nightmare = require('nightmare');

export class HeadlessBrowser {
  
  processInsideBrowser(url:string, evaluateFn:any):Promise<any> {
    const nightmare = Nightmare({show: false, executionTimeout: 20000});
    return nightmare
      .goto(url)
      .evaluate(evaluateFn)
      .end();
  }
}