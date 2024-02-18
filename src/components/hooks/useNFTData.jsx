import { useState, useEffect } from 'react';
import Papa from 'papaparse';

// NFTデータを読み込むカスタムフック
export function useNFTData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const csvFileUrl = '/woodnft-demo/data/nft_data.csv';

    fetch(csvFileUrl)
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            setData(results.data);
            setIsLoading(false);
          }
        });
      });
  }, []);

  return { data, isLoading };
}