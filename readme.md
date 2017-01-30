<h1>Simple webpack plugin to download OneSkyApp jsons.</h1>

<h2>How to use:</h2>

```const OneSkyPlugin = require('../../../../../webpack-onesky');```

```    
new OneSkyPlugin({
           language: 'en-US',
           projectId: 123,
           fileName: 'en.json',
           apiKey: YOUR_API_KEY,
           secret: YOUR_SECRET_KEY
       }),
``` 