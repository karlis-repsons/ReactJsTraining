const path = require('path');

let paths = {};
paths.projectRoot = path.resolve(__dirname, '../../');
paths = Object.assign({}, paths,
   {
      source: path.resolve(paths.projectRoot, 'source'),
      devToolsSetup: path.resolve(
         paths.projectRoot, 'devToolsSetup')
   }
);

module.exports = { paths };