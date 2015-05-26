# glob-cp
find files with [glob](https://github.com/isaacs/node-glob) patterns, [transform](https://github.com/intesso/glob-resolve) the target path, and copy the files.

# when to use it
use it when you want to copy several files/directories and transform the file/directory path.

# how to use it
 - it uses glob with variables. see: [glob-var](https://github.com/intesso/glob-var), [glob-resolve](https://github.com/intesso/glob-resolve)
 - you can use the whole [glob](https://github.com/isaacs/node-glob) syntax in the `src` and `dest` pattern,
   as well as the `glob-var` variables starting with a colon `:`
 - instead of the glob filename Array, `glob-resolve` returns a search object with:
   - src: `glob-var` object for the source pattern
   - dest: `glob-var` object for the destination pattern
 - you are most likely interrested in the `result.dest.path` Array, which is the transformed `glob` filenames Array.

# install

```bash
npm install glob-cp
```

# use
```js

var cp = require('glob-cp');

// async
var src = __dirname + '/fixtures/:module/public/**';
var dest = __dirname + '/public/:module/**';
cp(src, dest, function(err) {
    if (err) console.error(err);
});

```


```js
//or sync version
cp.sync('fixtures/:module/public', 'public/:module');

```

# functions

## cp(srcPattern, destPattern [,options] ,callback)
async glob cp version.

## cp.sync(srcPattern, destPattern [,options])
sync glob cp version.


# test
```bash
npm test
```

# license
MIT


