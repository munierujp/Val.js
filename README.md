[![npm version](https://badge.fury.io/js/%40js-commons%2Fval.svg)](https://badge.fury.io/js/%40js-commons%2Fval)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Val.js
Val class wraps value.

## Installation
```sh
$ npm i @js-commons/val
```

or

```sh
$ yarn add @js-commons/val
```

## Use in your script
```js
const Val = require('@js-commons/val')
```

## Usage
You can use below methods.

### Creation
#### Val.empty()
```js
const val = Val.empty()
console.log(val) // { _: null }
```

#### Val.of(value)
```js
const val = Val.of('foo')
console.log(val) // { _: 'foo' }
```

### Intermediate operation
#### Val.filter(matcher)
```js
const val = Val.of('foo')
const filtered = val.filter(v => v.startsWith('f'))
console.log(filtered) // { _: 'foo' }
```

```js
const val = Val.of('foo')
const filtered = val.filter(v => v.startsWith('b'))
console.log(filtered) // { _: null }
```

#### Val.map(mapper)
```js
const val = Val.of('foo')
const mapped = val.map(v => v + '_')
console.log(mapped) // { _: 'foo_' }
```

```js
const val = Val.empty()
const mapped = val.map(v => v + '_')
console.log(mapped) // { _: null }
```

#### Val.ifPresent(callback)
```js
const val = Val.of('foo')
let tmp
const val2 = val.ifPresent(v => {
  tmp = v
})
console.log(val2) // { _: 'foo' }
console.log(tmp) // foo
```

```js
const val = Val.empty()
let tmp
const val2 = val.ifPresent(v => {
  tmp = v
})
console.log(val2) // { _: null }
console.log(tmp) // undefined
```

#### Val.ifAbsent(callback)
```js
const val = Val.of('foo')
let tmp
const val2 = val.ifAbsent(() => {
  tmp = 'bar'
})
console.log(val2) // { _: 'foo' }
console.log(tmp) // undefined
```

```js
const val = Val.empty()
let tmp
const val2 = val.ifAbsent(() => {
  tmp = 'bar'
})
console.log(val2) // { _: null }
console.log(tmp) // bar
```

#### Val.or(other)
```js
const val = Val.of('foo')
const value = val.or('bar')
console.log(value) // foo
```

```js
const val = Val.empty()
const value = val.or('bar')
console.log(value) // bar
```

#### Val.orGet(callback)
```js
const val = Val.of('foo')
const value = val.orGet(() => 'bar')
console.log(value) // foo
```

```js
const val = Val.empty()
const value = val.orGet(() => 'bar')
console.log(value) // bar
```

#### Val.is(value)
```js
const val = Val.of('foo')
console.log(val.is('foo')) // true
```

```js
const val = Val.of('foo')
console.log(val.is('bar')) // false
```

#### Val.isPresent()
```js
const val = Val.of('foo')
console.log(val.isPresent()) // true
```

```js
const val = Val.empty()
console.log(val.isPresent()) // false
```

#### Val.isAbsent()
```js
const val = Val.of('foo')
console.log(val.isAbsent()) // false
```

```js
const val = Val.empty()
console.log(val.isAbsent()) // true
```
