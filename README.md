# gmail-query-builder

 [![NPM version][npm-image]][npm-url] [![CircleCI][circleci-image]][circleci-url] [![Coverage percentage][coveralls-image]][coveralls-url]

Gmail query builder

See https://support.google.com/mail/answer/7190

## Install

```sh
$ npm install gmail-query-builder --save
```

## Usage

```ts
import QueryBuilder from 'gmail-query-builder';

const $q = QueryBuilder.q;
const query = $q().subject(
    $q().group('dinner', 'movie')
  ).build();

console.log(query);
// subject:(dinner movie)
```

[npm-image]: https://badge.fury.io/js/gmail-query-builder.svg
[npm-url]: https://npmjs.org/package/gmail-query-builder
[circleci-image]: https://circleci.com/gh/fossamagna/gmail-query-builder.svg?style=svg
[circleci-url]: https://circleci.com/gh/fossamagna/gmail-query-builder
[coveralls-image]: https://coveralls.io/repos/github/fossamagna/gmail-query-builder/badge.svg
[coveralls-url]: https://coveralls.io/github/fossamagna/gmail-query-builder
