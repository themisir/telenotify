const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.normalize(path.join(__dirname, ".env"))
});

process.env.APPROOT = __dirname;

require('./dist/app');