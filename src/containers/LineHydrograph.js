import { connect } from 'react-redux'
import { chartHovered } from '../actions/streams'
import {
  getComid,
  getFlowDataArray,
  getHoveredMetric,
  getHoveredMonth,
} from '../selectors'
import { prepMetrics } from '../charts/helpers/D3LineHydrograph'
import LineHydrograph from '../components/LineHydrograph'

const prepData = (state) => {

  const data = getFlowDataArray(state)

  if (data) {

    const metrics = prepMetrics([
      { name: 'estimatedLow', variable: 'estimated', interval: 'lowerQuarter' },
      { name: 'estimatedAll', variable: 'estimated', interval: 'allYears' },
      { name: 'estimatedHigh', variable: 'estimated', interval: 'upperQuarter' },
      { name: 'observedAll', variable: 'observed', interval: 'allYears' }],
      data)

    // If any values are NaN, remove whole metric from array
    // (e.g. there is no observed data)
    return metrics.filter(metric => (
      metric.months[0].value === metric.months[0].value
    ))

  }
}

const mapStateToProps = (state) => ({
  comid: getComid(state),
  data: prepData(state),
  hoveredMetric: getHoveredMetric(state),
  hoveredMonth: getHoveredMonth(state),
})

export default connect(mapStateToProps, { chartHovered })(LineHydrograph)
