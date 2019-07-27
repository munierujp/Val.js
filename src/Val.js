class Val {
  constructor (value) {
    this._ = value
  }

  static empty () {
    return new this(null)
  }

  static of (value) {
    return new this(value)
  }

  filter (matcher) {
    return (this.isPresent() && matcher(this._)) ? Val.of(this._) : Val.empty()
  }

  map (mapper) {
    return this.isPresent() ? Val.of(mapper(this._)) : Val.empty()
  }

  ifPresent (callback) {
    if (this.isPresent()) {
      callback(this._)
    }
    return Val.of(this._)
  }

  ifAbsent (callback) {
    if (this.isAbsent()) {
      callback()
    }
    return Val.of(this._)
  }

  or (other) {
    return this.isPresent() ? this._ : other
  }

  orGet (callback) {
    return this.isPresent() ? this._ : callback()
  }

  is (value) {
    return this._ === value
  }

  isPresent () {
    return !this.isAbsent()
  }

  isAbsent () {
    return this._ === null || this._ === undefined
  }
}

module.exports = Val
