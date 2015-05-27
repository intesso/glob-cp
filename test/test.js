var test = require('tape');
var fs = require('fs');
var equal = require('object-equal');
var cp = require('../index');
var rm = require('rimraf');

test('do async file', function(t) {

  cleanup();

  var src = __dirname + '/fixtures/:module/public/js/*.*';
  var dest = __dirname + '/public/:module/js/*.*';

  cp(src, dest, function(err) {

    t.ok(!err);
    t.ok(exists(__dirname + '/public/test_pub/js/bundle.js'));
    t.ok(exists(__dirname + '/public/Irish-Pub/js/bundle.js'));

    t.end(err);
  });

});

test('do sync file', function(t) {

  cleanup();

  var src = __dirname + '/fixtures/:module/public/js/*.*';
  var dest = __dirname + '/public/:module/js/*.*';

  var result = cp.sync(src, dest);

  t.ok(!result);
  t.ok(exists(__dirname + '/public/test_pub/js/bundle.js'));
  t.ok(exists(__dirname + '/public/Irish-Pub/js/bundle.js'));

  t.end(result);

});

test('do async dir recursive', function(t) {

  cleanup();

  var src = __dirname + '/fixtures/:module/public';
  var dest = __dirname + '/public/:module';

  cp(src, dest, {recursive: true}, function(err) {

    t.ok(!err);
    t.ok(exists(__dirname + '/public/test_pub/js'));
    t.ok(exists(__dirname + '/public/Irish-Pub/css'));
    t.ok(exists(__dirname + '/public/test_pub/js/bundle.js'));
    t.ok(exists(__dirname + '/public/Irish-Pub/js/bundle.js'));

    t.end(err);
  });

});

test('do async dir non recursive', function(t) {

  cleanup();

  var src = __dirname + '/fixtures/:module/public';
  var dest = __dirname + '/public/:module';

  // non recursive without dirs
  cp(src, dest, function(err) {

    t.ok(!err);
    t.ok(exists(__dirname + '/public/test_pub/readme.md'));
    t.ok(exists(__dirname + '/public/Irish-Pub/readme.md'));

    t.end(err);
  });

});

test('do sync dir recursive', function(t) {

  cleanup();

  var src = __dirname + '/fixtures/:module/public';
  var dest = __dirname + '/public/:module';
  var opts = {recursive: true};

  var result = cp.sync(src, dest, opts);

  t.ok(!result);
  t.ok(exists(__dirname + '/public/test_pub/readme.md'));
  t.ok(exists(__dirname + '/public/Irish-Pub/readme.md'));
  t.ok(exists(__dirname + '/public/test_pub/js/bundle.js'));
  t.ok(exists(__dirname + '/public/Irish-Pub/js/bundle.js'));

  t.end(result);

});


function cleanup() {
  rm.sync(__dirname + '/public');
}

function exists(p) {
  try {
    var fd = fs.openSync(p, 'r');
    return !!fd;
  } catch (err) {
    return false;
  }
}