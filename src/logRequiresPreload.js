'use strict';

var js = require.extensions['.js'];

require.extensions['.js'] = (...args) => {
  console.log('loadingModule', args[0].filename);
  return js(...args);
};
