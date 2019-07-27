class Val {
  constructor (value) {
    this.$value = value
  }

  static empty () {
    return new this(null)
  }

  static of (value) {
    return new this(value)
  }

  filter (callback) {
    return (this.isPresent() && callback(this.$value)) ? Val.of(this.$value) : Val.empty()
  }

  map (callback) {
    return this.isPresent() ? Val.of(callback(this.$value)) : Val.empty()
  }

  ifPresent (callback) {
    if (this.isPresent()) {
      callback(this.$value)
    }
    return Val.of(this.$value)
  }

  ifAbsent (callback) {
    if (this.isAbsent()) {
      callback()
    }
    return Val.of(this.$value)
  }

  or (value) {
    return this.isPresent() ? this.$value : value
  }

  orGet (callback) {
    return this.isPresent() ? this.$value : callback()
  }

  matches (callback) {
    return callback(this.$value)
  }

  is (value) {
    return this.$value === value
  }

  isPresent () {
    return !this.isAbsent()
  }

  isAbsent () {
    return this.$value === null || this.$value === undefined
  }
}

module.exports = Val
