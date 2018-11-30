import React from 'react';
import BarChart from 'react-bar-chart';

const margin = {top: 20, right: 20, bottom: 30, left: 40};

const Chart = ({ chartData }) => (
  <div style={{width: '100%'}}>
    <BarChart
      ylabel="installs"
      width={700}
      height={300}
      margin={margin}
      data={chartData}
      onBarClick={(element, id) => console.log('clicked', element, id)}
    />
  </div>
);

export default Chart;
