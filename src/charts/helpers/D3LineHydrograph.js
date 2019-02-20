import { nest, timeParse, bisector } from 'd3'
import { average, split } from './utils'


function _calcAvgsByMonth(intervalByYear, name) {

  let intervalByMonth = intervalByYear.reduce((acc, year) => {
    acc.months = acc.months.concat(year.value.values)
    return acc
  }, { interval: name, months: []})

  intervalByMonth.months = nest()
    .key(d => d.month )
    .rollup(leaves => {
      let intervals = { estimated: [], p10: [], p90: [], observed: [] }
      leaves.forEach(value => {
        intervals[value.variable].push(value.value)
      });
      return {
        estimated: average(intervals.estimated),
        p10: average(intervals.p10),
        p90: average(intervals.p90),
        observed: average(intervals.observed),
      };
    })
    .entries(intervalByMonth.months)

  const parseMonth = timeParse('%m')
  intervalByMonth.months.forEach(month => {
    month.month = parseMonth(month.key)
  });

  return intervalByMonth

}


function _prepIntervals(data) {

  // Structure data by year and order from driest to wettest (estimated)
  let valuesByYear = nest()
    .key(d => d.year )
    .rollup(leaves => {
      let totalFlow = leaves.reduce((total, curr) => {
        return (curr.variable === 'estimated') ? total + curr.value : total
      }, 0)
      return { values: leaves, totalFlow: totalFlow }
    })
    .entries(data)
    .sort((a, b) => a.value.totalFlow - b.value.totalFlow)

  // Calculate estimated intervals
  // (top 25% wettest years, bottom 25% driest years)
  const tempHalves = split(valuesByYear)
  const lowerQuarter = split(tempHalves[0])[0]
  const upperQuarter = split(tempHalves[1])[1]

  let intervals = {}
  intervals.lowerQuarter = _calcAvgsByMonth(lowerQuarter, 'lowerQuarter')
  intervals.allYears = _calcAvgsByMonth(valuesByYear, 'allYears')
  intervals.upperQuarter = _calcAvgsByMonth(upperQuarter, 'upperQuarter')

  return intervals

};

//------------------------------------------------------------------------------
// Prepare metrics for chart
//------------------------------------------------------------------------------

export function prepMetrics(metricsConfig, data) {

  const intervals = _prepIntervals(data)
  const metrics = metricsConfig.map(metric => {
    var months = intervals[metric.interval].months.map(month => {
      return {
        month: month.month,
        value: month.value[metric.variable],
        allValues: month.value,
      }
    })
    return {
      name: metric.name,
      months: months,
    }
  })

  return metrics

}


//------------------------------------------------------------------------------
// Get data from all metrics closest to the mouse
//------------------------------------------------------------------------------

export function getDataAtMouse(xScale, mousePosition, data) {

  const bisectDate = bisector(d => d.month).left
  const dateAtMouse = xScale.invert(mousePosition)

  let bisectedMonth = bisectDate(data[0].months, dateAtMouse)
  if (bisectedMonth === 0) {
    bisectedMonth = 1
  } else if (bisectedMonth === 12) {
    bisectedMonth = 11
  }

  const prevMonthData = data.map(metric => ({
    name: metric.name,
    data: metric.months[bisectedMonth - 1]
  }))
  const nextMonthData = data.map(metric => ({
    name: metric.name,
    data: metric.months[bisectedMonth]
  }))
  const prevMonth = prevMonthData[0].data.month,
        nextMonth = nextMonthData[0].data.month

  return (dateAtMouse - prevMonth > nextMonth - dateAtMouse)
    ? nextMonthData
    : prevMonthData

}

//------------------------------------------------------------------------------
// Find the closest metric line for a given value
//------------------------------------------------------------------------------

export function findClosest(value, dataAtMouse) {
  let curr = dataAtMouse[0]
  dataAtMouse.forEach(metric => {
    if (Math.abs(value - metric.data.value)
        < Math.abs(value - curr.data.value)) {
      curr = metric
    }
  })
  return curr
}
