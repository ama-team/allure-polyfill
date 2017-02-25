# Allure polyfill

This project is created to make it possible to stub 
[Allure Framework][] JS API whenever original API is not available (for
example, IDEA runs Mocha without any reporters, and because of that 
any test will fail on first Allure call).

Currently this package is targeted to replicate mocha reporter, 
however, other Allure integrations should have the very same API.

## Installation

```
npm i @ama-team/allure-polyfill -D
```

## Usage

With dumping every action to `console.log`:

```js
require('@ama-team/allure-polyfill').ensure();
```
With silent data discard:

```js
var polyfill = require('@ama-team/allure-polyfill');
polyfill.ensure(new polyfill.sink.BlackHole());
```

## Versioning

I'm not as familiar with Allure as i wish, so, probably, the API would
need several releases before it'll finally settle. Because of that,
**pre-1.0.0 minor releases act as major: they will break backward 
compatibility**.
 
Things like that should not happen once 1.0.0 is released.

## Badge cellar

[![npm version](https://img.shields.io/npm/v/@ama-team/allure-polyfill.svg?style=flat-square)](https://www.npmjs.com/package/@ama-team/allure-polyfill)

### Master branch

[![CircleCI master branch](https://img.shields.io/circleci/project/github/ama-team/allure-polyfill/master.svg?style=flat-square)](https://circleci.com/gh/ama-team/allure-polyfill/tree/master)
[![Coveralls master branch](https://img.shields.io/coveralls/ama-team/allure-polyfill/master.svg?style=flat-square)](https://coveralls.io/github/ama-team/allure-polyfill?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/ama-team/allure-polyfill.svg?style=flat-square)](https://codeclimate.com/github/ama-team/allure-polyfill)
[![Code Climate](https://img.shields.io/codeclimate/issues/github/ama-team/allure-polyfill.svg?style=flat-square)](https://codeclimate.com/github/ama-team/allure-polyfill)

### Dev branch

[![CircleCI dev branch](https://img.shields.io/circleci/project/github/ama-team/allure-polyfill/dev.svg?style=flat-square)](https://circleci.com/gh/ama-team/allure-polyfill/tree/dev)
[![Coveralls dev branch](https://img.shields.io/coveralls/ama-team/allure-polyfill/dev.svg?style=flat-square)](https://coveralls.io/github/ama-team/allure-polyfill?branch=dev)

  [Allure Framework]: http://allure.qatools.ru/