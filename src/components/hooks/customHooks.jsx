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
      })
      .catch(error => {
        console.error("Fetching NFT data failed:", error);
        setIsLoading(false);
        // 必要に応じてエラー状態を設定
      });
  }, []);

  return { data, isLoading };
}


// ユーザーデータを読み込むカスタムフック
export function useUserData() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const csvFileUrl = '/woodnft-demo/data/user_data.csv';
  
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
          console.error("Fetching user data failed:", error);
          setIsLoading(false);
          // 必要に応じてエラー状態を設定
        });
    }, []);
  
    return { data, isLoading };
  }

// ロイヤリティ分配データを読み込むカスタムフック
export function useRoyaltyDistribution() {
    const [rdData, setRdData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const csvFileUrl = '/woodnft-demo/data/royaltydistribution_data.csv';
  
      fetch(csvFileUrl)
        .then(response => response.text())
        .then(csvText => {
          Papa.parse(csvText, {
            header: true,
            complete: (results) => {
              setRdData(results.data);
              setIsLoading(false);
            }
          });
        })
        .catch(error => {
          console.error("Fetching rd data failed:", error);
          setIsLoading(false);
          // 必要に応じてエラー状態を設定
        });
    }, []);

    // 分配データをrecipientごとに分ける
    const rdDataFlatten = [];
    rdData.forEach(rd => {
      const rdSame = {
        distributionId: rd.distributionId,
        mintNum: rd.mintNum,
        tokenId: rd.tokenId,
        profit: Number(rd.profit)*1000,
        totalValueIncrease: rd.totalValueIncrease
      };

      if ( rd.recipient1 ) {
        const rdCopy1 = {
          ...rdSame,
          recipient: rd.recipient1,
          valueIncrease: rd.valueIncrease1,
          divident: Number(rd.divident1)*1000,
        }
        rdDataFlatten.push(rdCopy1);
      }
      if ( rd.recipient2 ) {
        const rdCopy2 = {
          ...rdSame,
          recipient: rd.recipient2,
          valueIncrease: rd.valueIncrease2,
          divident: Number(rd.divident2)*1000,
        }
        rdDataFlatten.push(rdCopy2);
      }
      if ( rd.recipient3 ) {
        const rdCopy3 = {
          ...rdSame,
          recipient: rd.recipient3,
          valueIncrease: rd.valueIncrease3,
          divident: Number(rd.divident3)*1000,
        }
        rdDataFlatten.push(rdCopy3);
      }

    });

  
    return { rdData, rdDataFlatten, isLoading };
  }