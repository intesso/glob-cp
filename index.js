/*
 * module dependencies
 */

var fs = require('fs');
var path = require('path');
var cp = require('cp-file');
var resolve = require('glob-resolve');
var recursive = require('recursive-readdir');
var onetime = require('onetime');
var after = require('after');
var debug = require('debug')('glob-cp:debug');

/*
 * api functions
 */

exports.async = function(srcPattern, destPattern, options, cb) {
  // get arguments right
  if (typeof options === 'function') cb = options, options = {};
  if (!options) options = {};
  // make sure cb is only called once
  cb = onetime(cb || noop);


  resolve(srcPattern, destPattern, options, function(err, result) {
    if (err) return cb(err);
    var srcPaths = result.src.paths;
    var destPaths = result.dest.paths;
    debug('src', srcPaths, ' / dest', destPaths);

    var next = after(srcPaths.length, cb);

    srcPaths.forEach(function(src, i) {
      var dest = destPaths[i];

      fs.stat(src, function(err, stat) {

        var isDir = stat.isDirectory();

        if (isDir) {
          var readdir = (options.recursive) ? recursive : _readFiles;
          readdir(src, function(err, srcFiles) {
            // make sure callback is only called once
            var _next = after(srcFiles.length, next);

            srcFiles.forEach(function(_src) {
              var _dest = _destFile(src, _src, dest);
              cp(_src, _dest, options, _next);
            })

          });
        } else {
          cp(src, dest, options, next);
        }

      });

    });

  });

};

exports = module.exports = exports.async;

exports.sync = function(srcPattern, destPattern, options) {
  // extract src vars
  var result = resolve.sync(srcPattern, destPattern, options);

  var srcPaths = result.src.paths;
  var destPaths = result.dest.paths;

  srcPaths.forEach(function(src, i) {
    var dest = destPaths[i];

    var stat = fs.statSync(src);
    var isDir = stat.isDirectory();

    if (isDir) {
      var readdir = (options.recursive) ? _recursiveReaddirSync : _readFilesSync;
      var srcFiles = readdir(src);

      srcFiles.forEach(function(_src) {
        var _dest = _destFile(src, _src, dest);
        cp.sync(_src, _dest, options);
      })

    } else {
      cp.sync(src, dest, options);
    }

  });

};

/*
 * helper functions
 */

function noop() {
}

function _destFile(base, src, dest) {
  var p = src.split(base);
  if (p.length > 1) {
    p = p[1];
    return path.join(dest, p);
  } else {
    return dest;
  }
}

function _readFiles(p, cb) {
  fs.readdir(p, function(err, files) {
    if (err) return cb(err);
    files = _getFiles(p, files);
    cb(null, files);
  });
}

function _readFilesSync(p) {
  var files = fs.readdirSync(p);
  return _getFiles(p, files);
}

function _getFiles(p, files) {
  var _files = files.map(function(file) {
    return path.join(p, file);
  });
  return _files.filter(function(file) {
    return !fs.statSync(file).isDirectory();
  });
}

function _recursiveReaddirSync(path) {
  var list = [], stats;
  var files = fs.readdirSync(path);

  files.forEach(function(file) {
    stats = fs.statSync(p.join(path, file));
    if (stats.isDirectory()) {
      list = list.concat(_recursiveReaddirSync(p.join(path, file)));
    } else {
      list.push(p.join(path, file));
    }
  });

  return list;
}
