#Sample app documentation


## Installation

### Install dependencies
  * [nodejs](http://nodejs.org/)
  * [grunt-cli](http://gruntjs.com/getting-started)
  * [bowerjs](http://bower.io/)
  
_Follow the installation steps_
  

#Via git:


```bash
$ git clone https://github.com/petrhasalik/prime-numbers.git
$ cd prime-numbers
```

Create local.env.js in the server/config/local.env.js
example content
```javascript
'use strict';

// Environment variables that grunt will set when the server starts locally. This is used for your API keys, secrets, etc.
// You will need to set these on the server that you deploy to.
//
// This file should not be tracked by Git.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "sampleapp-secret",
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
```

then

```bash
$ npm install 
$ bower install
```

## Start deamon

```bash
$ grunt daemon:start
```
_server is running on port :8080_
You need to set-up a proxy with for e.g. Nginx or access the app directly from your web browser

## Stop deamon

```bash
$ grunt daemon:stop
```

## Api documentation
[apiary](http://docs.sampleapp1.apiary.io/)

## License

MIT