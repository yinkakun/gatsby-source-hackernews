## gatsby-source-hnapi

Source plugin for pulling data into Gatsby from [node-hnapi](https://github.com/cheeaun), an unofficial API for Hacker News.

## Install

```sh
npm install gatsby-source-hnapi

#or

yarn add gatsby-source-hnapi
```

## How to use

```js
// In your gatsby-config.js
plugins: [`gatsby-source-hnapi`];
```

## How To Query

Returns 30 results for `allHnTopstories`, `allHnLateststories`, `allHnBeststories`, `allHnAsks`, `allHnShow`, and `allHnJobs`.

```graphql
query MyQuery {
  allHnLatestStories {
    nodes {
      title
      url
      points
      user
      id
      time_ago
      time
      domain
      comments
    }
  }
}
```

## Credits

This plugin is wrapper around [node-hnapi](https://github.com/cheeaun/node-hnapi)
