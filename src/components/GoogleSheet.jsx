import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpreadsheetComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/fetch-spreadsheet');
        setData(response.data.values); // Google Sheets APIのレスポンス形式に合わせています
      } catch (error) {
        console.error('Error fetching spreadsheet data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <ul>
          {data.map((row, index) => (
            <li key={index}>{row.join(', ')}</li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default SpreadsheetComponent;
