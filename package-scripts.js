/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const { series, crossEnv, concurrent, rimraf, runInNewWindow } = require('nps-utils');

module.exports = {
  scripts: {
    default: 'nps serve',
    /**
     * Starts the builded app from the dist directory
     */
    start: {
      script: 'node bin/index.js',
      description: 'Starts the builded app from the dist directory'
    },
    /**
     * Serves the current app and watches for changes to restart it
     */
    serve: {
      script: series(
        // 'nps banner.serve',
        'nodemon -r dotenv/config --watch src --watch config'
      ),
      description: 'Serves the current app and watches for changes to restart it'
    },
  
    /**
     * Builds the app into the dist directory
     */
    build: {
      script: series(
        'nps lint',
        'nps clean.bin',
        'nps transpile',
        'nps transformPath'
      ),
      description: 'Builds the app into the bin directory'
    },
    /**
     * Runs TSLint over your project
     */
    lint: {
      script: tslint(`./src/**/*.ts`),
      hiddenFromHelp: true
    },
    /**
     * Transpile your app into javascript
     */
    transpile: {
      script: `tsc`,
      hiddenFromHelp: true
    },
    /**
     * Transfrom typescript path alias
     */
    transformPath : {
      script: `tscpaths -p tsconfig.json -s ./src -o ./bin`
    },
    /**
     * Clean files and folders
     */
    clean: {
      default: {
        script: series(
          `nps clean.bin`
        ),
        description: 'Deletes the ./bin folder'
      },
      bin: {
        script: rimraf('./bin'),
        hiddenFromHelp: true
      },
      dist: {
        script: rimraf('./dist'),
        hiddenFromHelp: true
      }
    },
  }
};


function run(path) {
  return `ts-node ${path}`;
}

function tslint(path) {
  return `tslint -c ./tslint.json ${path} --format stylish`;
}
