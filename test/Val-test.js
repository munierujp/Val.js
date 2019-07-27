/* eslint-env mocha */
const assert = require('power-assert')
const Val = require('../src/Val')

describe('Val', () => {
  describe('Val.empty()', () => {
    it('should return new empty instance', () => {
      const val = Val.empty()
      assert.deepStrictEqual(val._, null)
    })
  })

  describe('Val.of(value)', () => {
    it('should return new instance which have value', () => {
      const value = 'foo'
      const val = Val.of(value)
      assert.deepStrictEqual(val._, value)
    })
  })

  describe('Val.filter(matcher)', () => {
    describe('when value matches to condition', () => {
      it('should return new instance which have same value', () => {
        const val = Val.of('foo')
        const filtered = val.filter(v => v.startsWith('f'))
        assert.notStrictEqual(filtered, val)
        assert.deepStrictEqual(filtered._, val._)
      })
    })

    describe('when value does not matche to condition', () => {
      it('should return new empty instance', () => {
        const val = Val.of('foo')
        const filtered = val.filter(v => v.startsWith('b'))
        assert.notStrictEqual(filtered, val)
        assert.deepStrictEqual(filtered._, null)
      })
    })
  })

  describe('Val.map(mapper)', () => {
    describe('when value is present', () => {
      it('should return new instance which have value applied mapping function', () => {
        const val = Val.of('foo')
        const mapped = val.map(v => v + '_')
        assert.notStrictEqual(mapped, val)
        assert.deepStrictEqual(mapped._, val._ + '_')
      })
    })

    describe('when value is absent', () => {
      it('should return new empty instance', () => {
        const val = Val.empty()
        const mapped = val.map(v => v + '_')
        assert.notStrictEqual(mapped, val)
        assert.deepStrictEqual(mapped._, null)
      })
    })
  })

  describe('Val.ifPresent(callback)', () => {
    describe('when value is present', () => {
      it('should apply callback function', () => {
        const val = Val.of('foo')
        let tmp
        val.ifPresent(v => {
          tmp = v
        })
        assert.deepStrictEqual(tmp, val._)
      })

      it('should return new instance which have same value', () => {
        const val = Val.of('foo')
        const val2 = val.ifPresent(v => {})
        assert.notStrictEqual(val2, val)
        assert.deepStrictEqual(val2._, val._)
      })
    })

    describe('when value is absent', () => {
      it('should not apply callback function', () => {
        const val = Val.empty()
        let tmp
        val.ifPresent(v => {
          tmp = v
        })
        assert.deepStrictEqual(tmp, undefined)
      })

      it('should return new instance which have same value', () => {
        const val = Val.empty()
        const val2 = val.ifPresent(v => {})
        assert.notStrictEqual(val2, val)
        assert.deepStrictEqual(val2._, null)
      })
    })
  })

  describe('Val.ifAbsent(callback)', () => {
    describe('when value is present', () => {
      it('should not apply callback function', () => {
        const val = Val.of('foo')
        let tmp
        val.ifAbsent(() => {
          tmp = 'bar'
        })
        assert.deepStrictEqual(tmp, undefined)
      })

      it('should return new instance which have same value', () => {
        const val = Val.of('foo')
        const val2 = val.ifAbsent(() => {})
        assert.notStrictEqual(val2, val)
        assert.deepStrictEqual(val2._, val._)
      })
    })

    describe('when value is absent', () => {
      it('should apply callback function', () => {
        const val = Val.empty()
        const value = 'bar'
        let tmp
        val.ifAbsent(() => {
          tmp = value
        })
        assert.deepStrictEqual(tmp, value)
      })

      it('should return new instance which have same value', () => {
        const val = Val.empty()
        const val2 = val.ifAbsent(() => {})
        assert.notStrictEqual(val2, val)
        assert.deepStrictEqual(val2._, null)
      })
    })
  })

  describe('Val.or()', () => {
    describe('when value is present', () => {
      it('should return value', () => {
        const val = Val.of('foo')
        const value = val.or('bar')
        assert.deepStrictEqual(value, val._)
      })
    })

    describe('when value is absent', () => {
      it('should return other value', () => {
        const val = Val.empty()
        const other = 'bar'
        const value = val.or(other)
        assert.deepStrictEqual(value, other)
      })
    })
  })

  describe('Val.orGet()', () => {
    describe('when value is present', () => {
      it('should return value', () => {
        const val = Val.of('foo')
        const value = val.orGet(() => 'bar')
        assert.deepStrictEqual(value, val._)
      })
    })

    describe('when value is absent', () => {
      it('should apply callback function and return its value', () => {
        const val = Val.empty()
        const other = 'bar'
        const value = val.orGet(() => other)
        assert.deepStrictEqual(value, other)
      })
    })
  })

  describe('Val.matches(callback)', () => {
    describe('when value matches to callback function', () => {
      it('should return `true`', () => {
        const val = Val.of('foo')
        assert.deepStrictEqual(val.matches(v => v === 'foo'), true)
      })
    })

    describe('when value does not match to callback function', () => {
      it('should return `false`', () => {
        const val = Val.of('foo')
        assert.deepStrictEqual(val.matches(v => v === 'bar'), false)
      })
    })
  })

  describe('Val.is()', () => {
    describe('when value is equal to argument', () => {
      it('should return `true`', () => {
        const val = Val.of('foo')
        assert.deepStrictEqual(val.is('foo'), true)
      })
    })

    describe('when value is not equal to argument', () => {
      it('should return `false`', () => {
        const val = Val.of('foo')
        assert.deepStrictEqual(val.is('bar'), false)
      })
    })
  })

  describe('Val.isPresent()', () => {
    describe('when value is present', () => {
      it('should return `true`', () => {
        const val = Val.of('foo')
        assert.deepStrictEqual(val.isPresent(), true)
      })
    })

    describe('when value is absent', () => {
      it('should return `false`', () => {
        const val = Val.empty()
        assert.deepStrictEqual(val.isPresent(), false)
      })
    })
  })

  describe('Val.isAbsent()', () => {
    describe('when value is present', () => {
      it('should return `false`', () => {
        const val = Val.of('foo')
        assert.deepStrictEqual(val.isAbsent(), false)
      })
    })

    describe('when value is absent', () => {
      it('should return `true`', () => {
        const val = Val.empty()
        assert.deepStrictEqual(val.isAbsent(), true)
      })
    })
  })
})
