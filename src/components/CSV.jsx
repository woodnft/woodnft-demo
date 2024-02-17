import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const CsvDataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // プロキシサーバーのエンドポイントにリクエストを送る
        const response = await axios.get('http://localhost:3001/fetch-csv');
        Papa.parse(response.data, {
          header: true, // CSVの最初の行をヘッダとして扱う
          complete: (result) => {
            setData(result.data);
          }
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.id}, {item.price}, {item.date}, {item.kind}, {item.location}</li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default CsvDataComponent;
