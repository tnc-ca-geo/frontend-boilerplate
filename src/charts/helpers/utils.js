// Split an array in half
export function split(array) {
  let halves = [[], []]
  const length = array.length
  if (length % 2 === 0) {   // if even no. values, split in half
    const half = length / 2
    halves[0] = array.slice(0, half)
    halves[1] = array.slice(half, length + 1)
  } else {  // if odd no. values, do not include median
    const half = Math.floor(length / 2)
    halves[0] = array.slice(0, half)
    halves[1] = array.slice(half + 1, length + 1)
  }
  return halves
}

// Find average of all valies in array
export function average(array) {
  const sum = array.reduce((acc, val) => acc + val, 0);
  return sum / array.length
}

// Round CFS and adjust units for presentation
export function roundCFS(cfs) {
  let units = 'CFS'
  if (cfs > 99999) {
    cfs = Math.round(cfs/1000)
    units = 'KCFS'
  } else if (cfs > 9999) {
    cfs = (cfs/1000).toFixed(1)
    units = 'KCFS'
  } else if (cfs > 999) {
    cfs = Math.round(cfs)
  } else if (cfs > 99) {
    cfs = cfs.toFixed(1)
  } else {
    cfs = cfs.toFixed(2)
  }
  return { value: cfs, units: units }
}
