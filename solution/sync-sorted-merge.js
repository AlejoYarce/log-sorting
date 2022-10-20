'use strict'

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  logSources.sort((a, b) => a.last.date - b.last.date)

  while (logSources.length > 0) {
    const firstLogSource = logSources[0]
    printer.print(firstLogSource.last)

    if (!firstLogSource.drained) {
      firstLogSource.pop()
      logSources.sort((a, b) => a.last.date - b.last.date)
    } else {
      logSources.shift()
    }
  }

  printer.done()
  return console.log('Sync sort complete.')
}
