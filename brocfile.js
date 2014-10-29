var bTemplate = require('broccoli-template-builder');
var bUglify   = require('broccoli-uglify-js');
var bLess     = require('broccoli-less-single');
var bStatic   = require('broccoli-static-compiler');
var bMerge    = require('broccoli-merge-trees');
var bConcat   = require('broccoli-concat');
var bPrefix   = require('broccoli-autoprefixer');
var env       = require('broccoli-env').getEnv();


var templateJs = bTemplate('src/templates', {
  extensions: ['html'],
  outputFile: '/templates.js',
  compile: function(string) {
    string = string.replace(/\r|\n/g,' ').replace(/\s+/g, ' ').trim();
    return '"' + string + '"';
  }
});

var scripts = bMerge(['src/scripts', 'bower_components', templateJs]);

var appJs    = bConcat(scripts, {
  inputFiles: [
    'lodash/dist/lodash.js',
    'jquery/dist/jquery.js',
    'backbone/backbone.js',
    'backbone.babysitter/lib/backbone.babysitter.js',
    'backbone.picky/lib/backbone.picky.js',
    'backbone.marionette/lib/backbone.marionette.js',
    'backbone.wreqr/lib/backbone.wreqr.js',
    'bootstrap/dist/js/bootstrap.js',
    'extensions/*.js',
    'config/' + env + '.js',
    'models/*.js',
    'collections/*.js',
    'controllers/*.js',
    'routers/*.js',
    'views/*.js',
    '*.js'
  ],
  outputFile: '/app.js',
  wrapInEval: env !== 'production'
});

var lessTree = bMerge(['src/styles','bower_components/bootstrap/less']);

var appCss = bLess(lessTree, 'app.less', 'app.css');
    appCss = bPrefix(appCss);

module.exports = bMerge([appJs, appCss, 'src/static', 'src/images']);