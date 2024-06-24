import React, { useEffect, useState } from 'react';
import { getTablesData } from '../services/apiHandlerService';
import './TableAnalyser.css';

const TableAnalyser = () => {
  const [tableData, setTableData] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await getTablesData();
      setTableData(response);
    } catch (error) {
      console.error('Error fetching table data', error);
    }
  };

  const handleToggle = (tableName) => {
    setExpanded(expanded === tableName ? null : tableName);
  };

  const extractTableNames = (data) => {
    const tableNames = new Set();
    data.forEach((entry) => tableNames.add(entry.TABLE_NAME));
    return Array.from(tableNames);
  };

  const tableNames = extractTableNames(tableData);

  return (
    <div className="table-analyser-container">
      <div className="table-list">
        <h1 className="title">Tables</h1>
        {tableNames.map((tableName, index) => (
          <div
            key={index}
            className={`accordion-summary ${expanded === tableName ? 'active' : ''}`}
            onClick={() => handleToggle(tableName)}
          >
            <h2>{tableName}</h2>
          </div>
        ))}
      </div>
      <div className="table-details">
        {expanded && (
          <div className="accordion-details">
            <h2>{expanded}</h2>
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
                  .filter((entry) => entry.TABLE_NAME === expanded)
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
    </div>
  );
};

export default TableAnalyser;
