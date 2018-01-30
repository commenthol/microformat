export default function microFormat (...args) {
  let i = 0
  if (typeof args[0] !== 'string') {
    args.unshift('%o')
  }
  return args[0].replace(/%([%a-zA-Z])/g, (match, format) => {
    if (format === '%') return format // escaped '%'
    i++
    let isError = false
    let val = args[i]

    if (val instanceof Error) {
      const {name, message, stack} = val
      val = {name, message, stack}
      isError = true
    }

    switch (format) {
      case 'o':
      case 'O':
      case 'j':
        return JSON.stringify(val)
      case 'd':
      case 'f':
        return Number(val)
      case 'i':
        return Number(val).toFixed(0)
      default:
        /* istanbul ignore next */
        if (isError) {
          val = `${val.name || 'Error'}: ${val.message || ''}`
        }
        return String(val)
    }
  })
}
