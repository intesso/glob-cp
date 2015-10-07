# glob-cp
copy files and directories with [glob](https://github.com/isaacs/node-glob) patterns and [variables](https://github.com/intesso/glob-resolve).

# install

```bash
npm install glob-cp
```

# use

```js

var cp = require('glob-cp');

// async
var src = __dirname + '/fixtures/:module/public';
var dest = __dirname + '/public/:module';
var options = {recursive: true, force: true};
cp(src, dest, options, function(err) {
    if (err) console.error(err);
});

```

```js
//or sync version
cp.sync('fixtures/:module/public', 'public/:module');

```

 > you can use the whole [glob](https://github.com/isaacs/node-glob) syntax in the `src` and `dest` pattern, as well as the `glob-var` variables starting with a colon `:`

# functions

## cp(srcPattern, destPattern [,options] ,callback)
async glob cp version.

## cp.sync(srcPattern, destPattern [,options])
sync glob cp version.


# options

```js
// options with the following default values:
var options = {

  // recusively copy files
  recursive: false,

  // remove destination before operation
  force: false

};
```

# test
```bash
npm test
```

# license
MIT


