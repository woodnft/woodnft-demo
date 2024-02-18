import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import Papa from 'papaparse';

/*
const CsvDataComponentProxy = () => {
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
*/



function CsvImport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse('/woodnft-demo/data/nft_data.csv', {
      download: true,
      header: true, // CSVの最初の行をフィールド名として扱う
      complete: (result) => {
        console.log(result.data);
        setData(result.data);
      }
    });
  }, []);

  return (
    <div>
      <h2>CSVデータ</h2>
      <table>
        <thead>
          <tr>
            <th>Token ID</th>
            <th>所有者</th>
            <th>生産者</th>
            <th>生産方法</th>
            <th>生産地</th>
            <th>生産日</th>
            <th>樹種</th>
            <th>状態</th>
            <th>販売状態</th>
            <th>販売価格(ETH)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item["Token ID"]}</td>
              <td>{item["所有者"]}</td>
              <td>{item["生産者"]}</td>
              <td>{item["生産方法"]}</td>
              <td>{item["生産地"]}</td>
              <td>{item["生産日"]}</td>
              <td>{item["樹種"]}</td>
              <td>{item["状態"]}</td>
              <td>{item["販売状態"]}</td>
              <td>{item["販売価格(ETH)"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CsvImport;
