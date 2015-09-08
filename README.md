# AADemo
A Demo using AlchemyApi Services along with the stackexchange and twitter services.

To use this demo, you will need credentials for the stackexchange, twitter, and AlchemyApi services. The config keys for stackexchange and twitter need to go in server/config.js. The AlchemyApi key needs to be set using the the alchemyapi node script like this:
``` sh
node alchemyapi.js YOUR_API_KEY

```

Load dependencies:

``` sh
npm install

```

Bundle client:

``` sh
npm run bundle

```
Bundle watch mode:

``` sh
npm run watch

```


Start local server:

``` sh
npm run start

```

Browse to:

``` sh
[http://localhost:3001](http://localhost:3001)

```
