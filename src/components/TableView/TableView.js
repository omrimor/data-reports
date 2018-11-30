import React from 'react';
import { map } from "lodash";
import { Table } from "reactstrap";

const TableView = ({ data, handleInputChange }) => (
  <Table bordered>
    <thead>
    <tr>
      <th>Company</th>
      <th>Country</th>
      <th>Installs</th>
      <th>ROI</th>
      <th>Industry ROI</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>
        <input name="companyName" type="text" onChange={handleInputChange} />
      </td>
      <td>
        <input name="countryName" type="text" onChange={handleInputChange} />
      </td>
      <td>
        <input name="installs" type="text" onChange={handleInputChange} />
      </td>
      <td>
        <input name="ROI" type="text" onChange={handleInputChange} />
      </td>
      <td>
        <input name="industryROI" type="text" onChange={handleInputChange} />
      </td>
    </tr>
    </tbody>
    <tbody>
    {map(data, (row, i) => (
      <tr key={i}>
        <td>{row.companyName}</td>
        <td>{row.countryName}</td>
        <td>{row.installs}</td>
        <td>{`${row.ROI}%`}</td>
        <td>{`${row.industryROI}%`}</td>
      </tr>
    ))}
    </tbody>
  </Table>
);

export default TableView;