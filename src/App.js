import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { generateTableData } from './API';
import { filter, includes, chain } from 'lodash';
import TableView from './components/TableView/TableView';
import Chart from './components/Chart/Chart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      filteredData: [],
      chartData: [],
    };
  }
  async componentDidMount() {
    const tableData = await generateTableData();
    const chartData = chain(tableData)
      .sortBy(['installs'])
      .reverse()
      .slice(0, 5)
      .map(item => ({ text: item.companyName, value: item.installs }))
      .value();
    this.setState({ tableData, chartData });
  }

  handleInputChange = e => {
    const { value, name } = e.target;
    this.filterTableData(name, value);
  };

  filterTableData = (name, value) => {
    const { tableData } = this.state;
    const filteredData = filter(tableData, row => includes(row[name].toString().toLowerCase(), value.toLowerCase()));
    this.setState({ filteredData });
  };

  render() {
    const { tableData, filteredData, chartData } = this.state;
    const data = filteredData.length > 0 ? filteredData : tableData;
    return (
      <div className="container">
        <Navbar color="primary" light>
          <NavbarBrand href="/">data-reports</NavbarBrand>
        </Navbar>
        <Chart chartData={chartData} />
        <TableView data={data} handleInputChange={this.handleInputChange} />
      </div>
    );
  }
}

export default App;
