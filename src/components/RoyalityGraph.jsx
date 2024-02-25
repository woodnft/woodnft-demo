import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import 'chart.js/auto';
import { useNFTData, useRoyaltyDistribution } from './hooks/customHooks';
import { useUser } from './hooks/userContext';

const RoyalityGraph = () => {

  //userを読み込む
  const { user, isLoading: isLoadingUser } = useUser();
  console.log('user:', user);

  //ロイヤリティ分配csvを読み込む
  const { rdData, rdDataFlatten, isLoading } = useRoyaltyDistribution();
  console.log('transactionFlatten:', rdDataFlatten);

  //nftを読み込む
  const { data: tokenData, isLoading: isLoadingTokens } = useNFTData();

  //エラーが発生したら表示しreturn
  if (isLoading || isLoadingUser || isLoadingTokens) return <div>Loading...</div>;
  if((user === null || user === undefined)) return <div> 現在のユーザーが設定されていません</div>;
  if (!rdData || !rdDataFlatten) return <div>ロイヤリティ変遷が正しく読み込まれませんでした</div>;
  if (!tokenData) return <div>NFTデータが読み込まれませんでした</div>
  

  //現在ユーザーのRDのみにする
  const userHash = user.userHash;
  const userRd = rdDataFlatten.filter(rd => rd.recipient === userHash);
  if (userRd.length === 0) return <div>royalty distribution not found, userId: {user.userId}</div>;
  console.log('userRD', userRd);


  //2024/02/25のような日付形式を変換する場合
  function convertDateToISO(dateString) {
    // Dateオブジェクトを生成
    const date = new Date(dateString);
    // ISO 8601形式の文字列に変換
    return date.toISOString();
  }

  // userRDにdateプロパティを追加
  
  userRd.forEach((rd) =>{
    rd.date = convertDateToISO(tokenData[rd.tokenId-1]?.productionDate);
  });

  /*
  //ロイヤリティ上昇を取引ごとにまとめる
  let rdPerTokenId = []
  for (let i=0; i<rd.length; i++) {
    const currentRd = rd[i];
    let objIndex = rdPerTokenId.findIndex(obj => obj.tokenId === currentRd.tokenId);

    //すでにrdPerTokenIdにtokenID取引があればamountに追加、なければ新しく作成
    if (objIndex === -1) {
      let obj = {
        recipient: currentRd.recipient,
        tokenId: currentRd.tokenId,
        date: convertDateToISO(currentRd.date),
        amount: Number(currentRd.amount)
      }
      rdPerTokenId.push(obj);
    } else {
      rdPerTokenId[objIndex].amount += currentRd.amount;
    }
  }
  console.log('rdPerTokenId before processing:', rdPerTokenId);
  */

  //ロイヤリティ上昇を日付でソートし、上昇分を加算していく
  userRd.sort((a, b) => new Date(a.date) - new Date(b.date));
  let rdAccumulation = userRd.slice();
  let currentAmount = 0;
  for (let i=0; i<userRd.length; i++) {
    const currentRd = rdAccumulation[i];
    currentAmount += parseFloat(currentRd.divident);
    currentRd.amount = currentAmount;
  }

  // グラフ用データの準備
  const chartData = {
    labels: rdAccumulation.map(item => item.date), // X軸のラベル（日付）
    datasets: [
      {
        label: 'NFT Amount',
        //data: rdAccumulation.map(item => item.amount), // Y軸のデータ（金額）
        data: rdAccumulation.map(item => ({x: item.date, y: item.amount.toFixed(3), tokenId: item.tokenId})), // X, Y値とtokenIdを含むオブジェクト
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      }
    ]
  };

  console.log('rdAccumulation:', rdAccumulation);
  console.log('chartData:', chartData);

  //グラフのオプション
  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          //parser: 'YYYY-MM-DDTHH:mm:ss', // LuxonやMoment.jsを使用する場合
          //tooltipFormat: 'lll',
          unit: 'day'
        },
        title: {
          display: true,
          text: 'Date'
        },
        // 1ヵ月の表示範囲を設定
        min: rdAccumulation[0]?.date,
        max: rdAccumulation[-1]?.date,
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          // ツールチップに表示するテキストをカスタマイズ
          beforeTitle: function(context) {
            // 現在のポイントのカスタムデータにアクセスするために、dataIndexを使用
            const dataIndex = context[0].dataIndex;
            const datasetIndex = context[0].datasetIndex;
            // chartDataからtokenIdを取得
            const tokenId = chartData.datasets[datasetIndex].data[dataIndex].tokenId;
            return `Token ID: ${tokenId}`;
          },
          label: function(context) {
            // 標準のラベルテキスト（例: "Amount: 0.06"）をカスタマイズ
            const label = context.dataset.label || '';
            const value = context.parsed.y; // Chart.js 3.xではcontext.parsed.yを使用
            return `${label}: ${value}`;
          }
        }
      }
    },
    // その他のオプション設定...
  };




  const graphStyle = {
      textAlign: 'center',
      //display: 'flex',
      backgroundColor: '#fafafa',
      width: '600px',
      height: '500px',
      //transform: `scale(1)`, 
      //transformOrigin: 'center',
      boxSizing: 'border-box',
      //border: '1px solid #FF0000',
      //padding: '50px',
      //margin: '-20% -10%',
      borderRadius: '50px', // 角を丸くする設定
      border: '1px solid #666666', // 線の色を指定

  };


  return (
      <div style={graphStyle}>
          <Line data={chartData} options={chartOptions} />
      </div>
      
  );

}

export default RoyalityGraph;