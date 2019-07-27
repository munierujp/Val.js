[![npm version](https://badge.fury.io/js/%40js-commons%2Fval.svg)](https://badge.fury.io/js/%40js-commons%2Fval)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Val
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

or

```js
import Val from '@js-commons/val'
```

## API
You can use below methods.

### Creation
#### Val.empty()
```js
const val = Val.empty()
console.log(val) // { $value: null }
```

#### Val.of(value)
```js
const val = Val.of('foo')
console.log(val) // { $value: 'foo' }
```

### Intermediate operation
#### Val.filter(callback)
```js
const val = Val.of('foo')
const filtered = val.filter(v => v.startsWith('f'))
console.log(filtered) // { $value: 'foo' }
```

```js
const val = Val.of('foo')
const filtered = val.filter(v => v.startsWith('b'))
console.log(filtered) // { $value: null }
```

#### Val.map(callback)
```js
const val = Val.of('foo')
const mapped = val.map(v => v + '_')
console.log(mapped) // { $value: 'foo_' }
```

```js
const val = Val.empty()
const mapped = val.map(v => v + '_')
console.log(mapped) // { $value: null }
```

#### Val.ifPresent(callback)
```js
const val = Val.of('foo')
let tmp
const val2 = val.ifPresent(v => {
  tmp = v
})
console.log(val2) // { $value: 'foo' }
console.log(tmp) // foo
```

```js
const val = Val.empty()
let tmp
const val2 = val.ifPresent(v => {
  tmp = v
})
console.log(val2) // { $value: null }
console.log(tmp) // undefined
```

#### Val.ifAbsent(callback)
```js
const val = Val.of('foo')
let tmp
const val2 = val.ifAbsent(() => {
  tmp = 'bar'
})
console.log(val2) // { $value: 'foo' }
console.log(tmp) // undefined
```

```js
const val = Val.empty()
let tmp
const val2 = val.ifAbsent(() => {
  tmp = 'bar'
})
console.log(val2) // { $value: null }
console.log(tmp) // bar
```

### Terminal operation
#### Val.or(value)
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

#### Val.matches(callback)
```js
const val = Val.of('foo')
console.log(val.matches(v => v === 'foo')) // true
```

```js
const val = Val.of('foo')
console.log(val.matches(v => v === 'bar')) // false
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
