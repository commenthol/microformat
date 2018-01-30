const assert = require('assert')
const microFormat = require('../src').default

const tests = [
  ['string', ['just a string'], 'just a string'],
  ['string %', ['just a %%string'], 'just a %string'],
  ['boolean', [true], 'true'],
  ['number', [12], '12'],
  ['float', [12.12], '12.12'],
  ['object %o', ['object %o', {test: 1, a: 2}], 'object {"test":1,"a":2}'],
  ['object %O', ['object %O', {test: 1, a: 3}], 'object {"test":1,"a":3}'],
  ['object %j', ['object %j', {test: 1, a: 4}], 'object {"test":1,"a":4}'],
  ['decimal %d', ['decimal %d', 12.3456], 'decimal 12.3456'],
  ['integer %i', ['integer %i', 12.3456], 'integer 12'],
  ['float %f', ['float %f', 12.3456], 'float 12.3456'],
  ['NaN decimal %d', ['decimal %d', 'aaa'], 'decimal NaN'],
  ['NaN integer %i', ['integer %i', 'aaa'], 'integer NaN'],
  ['NaN float %f', ['float %f', 'aaa'], 'float NaN'],
  ['error %s', ['error %s', new TypeError('bad type')], 'error TypeError: bad type'],
  ['error %s undefined', ['error %s', new TypeError()], 'error TypeError: '],
  ['error', [new TypeError('bad type')], (res) => {
    res = JSON.parse(res)
    assert.equal(res.name, 'TypeError')
    assert.equal(res.message, 'bad type')
    assert.equal(res.stack.split('\n')[0], 'TypeError: bad type')
  }]
]

describe('microFormat', function () {
  tests.forEach((test) => {
    const [name, args, exp] = test
    it(name, function () {
      const res = microFormat(...args)
      if (typeof exp === 'function') {
        exp(res)
      } else {
        assert.equal(res, exp)
      }
    })
  })
})
