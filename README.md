## How it works

It loads the onesky translation files and saves them locally.


## Usage:

```js
const OneSkyPlugin = require('onesky-webpack-plugin');

module.exports = {
  plugins: [
    new OneSkyPlugin({
       language: 'en-US',
       projectId: 123,
       fileName: 'en.json',
       apiKey: YOUR_API_KEY,
       secret: YOUR_SECRET_KEY,
       onCompleted: function(loadedFile) {
           return processFile(loadedFile);
       },
       onError: function(error) {
           return handleError(error);
       }
    })
    // ...
  ]
}
```

## Callbacks

##### onCompleted
Default: returns the downloaded json file.
##### onError: logs the error
Default: Logs the error message.
