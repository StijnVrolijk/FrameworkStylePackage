export class Data {
  constructor () {
    this.isInitialized = false
    this.data = null
    this.initialize()
  }

  initialize () {
    if (typeof jsData === 'undefined' || jsData === null) {
      // jsData is not defined so we fallback to English
      this.data = {"request": {"locale": "en"}}
    } else {
      this.data = jsData
    }

    this.isInitialized = true
  }

  exists (key) {
    return (this.get(key) !== null)
  }

  get (key) {
    if (!this.isInitialized) {
      this.initialize()
    }

    let chunks = key.split('.')

    if (chunks.length === 1) {
      return this.data(key)
    }

    let value = this.data[chunks[0]]
    chunks.shift()

    while (chunks.length !== 0) {
      value = this.getDeeperValue(chunks[0], value)
      chunks.shift()
    }

    return value
  }

  getDeeperValue (key, value) {
    return value[key]
  }
}
