# gmail-query-builder

Gmail query builder

See https://support.google.com/mail/answer/7190

## Install

```sh
$ npm install gmail-query-builder --save
```

## Usage

```ts
import QueryBuilder, { Unit } from '../src/index';

const $q = QueryBuilder.q;
const query = $q().subject(
    $q().group('dinner', 'movie')
  ).build();

console.log(query);
// subject:(dinner movie)
```
