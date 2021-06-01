const splitAddress = (addressStr) => {
  let foundString,
    endPosition,
    addressLine1 = '',
    addressLine2 = '',
    addressArray,
    addressItems

  const pattern = new RegExp('((?:[a-z][a-z]+))'
    + '(\\s+)'
    + '(Street|Road|Avenue|Gardens|Crescent|Lane|Court|Close|Bank|Terrace|View|Chase|Grove|Manor|Drive|Way|Square|Mews|Acres|Row|Boulevard|Rd|Ave|Place)', ['i'])

  if (addressStr) {
    // try to find a particular street phrase and split after phrase,
    foundString = addressStr.match(pattern)

    if (foundString !== null) {
      endPosition = addressStr.search(pattern) + foundString[0].length + 1
      addressLine1 = addressStr.slice(0, endPosition)

      if (endPosition < addressStr.length) {
        addressLine2 = addressStr.slice(endPosition)
      }

    }
    // otherwise try to split address at a roughly midway point
    else {
      addressArray = addressStr.split(' ')
      addressItems = addressArray.length

      if (addressItems < 5) {
        addressLine1 = addressStr
      } else {
        const midPoint = Math.ceil(addressItems / 2)
        endPosition = addressStr.indexOf(addressArray[midPoint])
        addressLine1 = addressStr.slice(0, endPosition)
        addressLine2 = addressStr.slice(endPosition)
      }
    }
  }

  /* clear addressArray of current values then assign first 2 elements to address lines so we can pass them back */
  addressArray = []
  addressArray[0] = addressLine1
  addressArray[1] = addressLine2

  return addressArray
}


export default splitAddress;