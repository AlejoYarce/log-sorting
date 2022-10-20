'use strict'

const lodash = require('lodash')

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve) => {
    logSources.sort((a, b) => a.last.date - b.last.date)

    while (logSources.length > 0) {
      const firstLogSource = logSources.shift()
      printer.print(firstLogSource.last)

      if (!firstLogSource.drained) {
        await firstLogSource.popAsync()
        logSources.splice(lodash.sortedIndexBy(logSources, firstLogSource, 'last.date'), 0, firstLogSource)
      }
    }

    printer.done()
    resolve(console.log('Async sort complete.'))
  })
}
