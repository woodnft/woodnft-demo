import { useState, useEffect } from 'react';
import Papa from 'papaparse';

// NFTデータを読み込むカスタムフック
export function useRoyaltyDistribution() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const csvFileUrl = '/woodnft-demo/data/royalty_distribution.csv';

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
      })
      .catch(error => {
        console.error("Fetching NFT data failed:", error);
        setIsLoading(false);
        // 必要に応じてエラー状態を設定
      });
  }, []);

  return { data, isLoading };
}