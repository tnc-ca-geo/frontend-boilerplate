import React from 'react'
import PropTypes from 'prop-types'
import D3LineHydrograph from '../charts/D3LineHydrograph'
import SVGPatternDef from './SVGPatternDef'


class LineHydrograph extends React.Component {

  componentDidMount() {
    // D3 Code to create the chart
    this._chart = D3LineHydrograph.create(
      this._rootNode,
      this.props.streamData,
      this.props.config
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Had to implement shouldComponentUpdate
    // (rather than just extend react.PureComponent) b/c the dates
    // were not comparaible w/o using someDate.getTime()
    if (this.props.comid !== nextProps.comid) { return true }
    if (!nextProps.hoveredMetric || !nextProps.hoveredMonth) { return true }
    if (nextProps.hoveredMetric !== this.props.hoveredMetric ||
        nextProps.hoveredMonth.getTime() !== this.props.hoveredMonth.getTime()) {
      console.log('redrawing');
      return true
    }
    return false
  }

  componentDidUpdate() {
    // D3 Code to update the chart
    D3LineHydrograph.update(
     this._rootNode,
     this.props,
     this._chart,
    )
  }

  componentWillUnmount() {
    D3LineHydrograph.destroy(this._rootNode);
  }

  _setRef(componentNode) {
    this._rootNode = componentNode;
  }

  render() {
    return (
      <div className='line-hydrograph'>
        <div ref={this._setRef.bind(this)} />
        <SVGPatternDef />
      </div>
    )
  }

};

LineHydrograph.propTypes = {
  comid: PropTypes.number,
  data: PropTypes.array,
  hoveredMetric: PropTypes.string,
  hoveredMonth: PropTypes.instanceOf(Date),
  chartHovered: PropTypes.func,
  config: PropTypes.object
}


export default LineHydrograph
