# AADemo
A Demo using AlchemyApi Services along with the stackexchange and twitter services.

This will do a search of Stackoverflow and twitter for the last 100 questions and tweets that mention the user's keyword. Then the results will be parsed into a format that the AlchemyApi service can use to find the sentiment of the keyword and the associated keywords and concepts among the Stackoverflow and twitter results.

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

Browse to: [http://localhost:3001](http://localhost:3001)


