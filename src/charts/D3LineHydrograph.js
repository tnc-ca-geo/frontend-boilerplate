import * as d3 from 'd3'
import '../css/D3LineHydrograph.scss'
import { getDataAtMouse, findClosest } from './helpers/D3LineHydrograph'
import { roundCFS } from './helpers/utils'


const D3LineHydrograph = {};


D3LineHydrograph.create = (el, data, config) => {

  const margin = config.margins

  let svg = d3.select(el).append('svg')
    .attr('class', 'd3')
    .attr('width', config.width)
    .attr('height', config.height)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  return svg

}


D3LineHydrograph.update = (el, props, chart) => {

  const { data, config, hoveredMonth, hoveredMetric, chartHovered } = props

  // Scales and functions

  const margin = config.margins
  const width = config.width - margin.left - margin.right
  const height = config.height - margin.top - margin.bottom

  let x = d3.scaleTime().rangeRound([0, width]),
      y = d3.scaleLinear().rangeRound([height, 0])

  x.domain(d3.extent(data[0].months, d => d.month ))
  y.domain([
    d3.min(data, p => d3.min(p.months, d => d.allValues.p10 )),
    d3.max(data, p => d3.max(p.months, d => d.allValues.p90 ))
  ]);

  const line = d3.line()
    .x(d => x(d.month))
    .y(d => y(d.value))

  const area = d3.area()
    .x(d => x(d.month) )
    .y1(d => y(d.allValues.p90) )
    .y0(d => y(d.allValues.p10) )

  // Draw chart

  chart.selectAll('g').remove()

  chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%b')));

  function customYAxis(g) {
    g.call(d3.axisRight(y).tickSize(width))
    g.select('.domain').remove()
    g.attr('class', 'y axis')
    g.selectAll('.tick line')
      .attr('stroke-dasharray', '2,5')
    g.selectAll('.tick text')
      .attr('x', -8)
      .attr('text-anchor', 'end');
    g.append('text')
      .attr('text-anchor', 'end')
      .attr('x', -8)
      .attr('y', -5)
      .text('CFS')
  }
  chart.append('g')
    .call(customYAxis);

  let metric = chart.selectAll('.path')
    .data(data)
    .enter().append('g')
      .attr('class', d => 'path ' + d.name );

  metric.append('path')
    .attr('d', d => {
      if (!d.name.includes('observed')) {
        return area(d.months)
      } else { return }
    })
    .attr('class', 'confidence-interval')
    .style('fill', 'url(#circles-1) #000')
    .style('display', d => (d.name === hoveredMetric) ? null : 'none')

  metric.append('path')
    .attr('class', 'line')
    .attr('d', d => line(d.months) )

  metric.selectAll('.points')
    .data(d => d.months )
    .enter().append('circle')
      .attr('r', 3)
      .attr('class', d => (
        'points ' + d3.timeFormat('%m')(d.month)
      ))
      .classed('focused', d => {
        if (hoveredMonth) {
          return (d.month.getTime() === hoveredMonth.getTime()) ? true : false
        } else {
          return false
        }
      })
      .attr('transform', d => (
        'translate(' + x(d.month) + ',' + y(d.value) + ')'
      ))

  chart.append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', () => {
      // TODO: implment chartMouseOut action
    })
    .on('mouseout', () => {
      // TODO: implment chartMouseOut action
    })
    .on('mousemove', function() {
      const mousePosition = d3.mouse(this)[0],
            closestMonthData = getDataAtMouse(x, mousePosition, data)
      const yValueAtMouse = y.invert(d3.mouse(this)[1]),
            closestMetric = findClosest(yValueAtMouse, closestMonthData)
      chartHovered(closestMonthData, closestMetric.name)
    })

};


D3LineHydrograph.destroy = () => {
  // Cleaning code here
  console.log('Destroying Line Hydrograph')

};

export default D3LineHydrograph;
