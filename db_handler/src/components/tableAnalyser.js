import React, { useEffect, useState } from 'react';
import { getTablesData } from '../services/apiHandlerService';
import './TableAnalyser.css'; // Import custom CSS for styling

const TableAnalyser = () => {
  const [tableData, setTableData] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await getTablesData();
      setTableData(response.data.result);
    } catch (error) {
      console.error('Error fetching table data', error);
    }
  };

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const extractTableNames = (data) => {
    const tableNames = new Set();
    data.forEach((entry) => tableNames.add(entry.TABLE_NAME));
    return Array.from(tableNames);
  };

  const tableNames = extractTableNames(tableData);

  return (
    <div className="table-analyser-container">
      <h1 className="title">Tables</h1>
      {tableNames.map((tableName, index) => (
        <div key={index} className="accordion">
          <div className="accordion-summary" onClick={() => handleToggle(index)}>
            <h2>{tableName}</h2>
          </div>
          {expanded === index && (
            <div className="accordion-details">
              <table className="table">
                <thead>
                  <tr>
                    <th>Column Name</th>
                    <th>Data Type</th>
                    <th>Length</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData
                    .filter((entry) => entry.TABLE_NAME === tableName)
                    .map((entry, idx) => (
                      <tr key={idx}>
                        <td>{entry.COLUMN_NAME}</td>
                        <td>{entry.DATA_TYPE}</td>
                        <td>{entry.CHARACTER_MAXIMUM_LENGTH}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TableAnalyser;
