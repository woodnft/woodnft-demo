import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import 'chart.js/auto';
import { useRoyaltyDistribution } from './hooks/useRoylaltyDistribution';
import users from './userData';
import { useUser } from './userContext';

const RoyalityGraph = () => {

  //const navigate = useNavigate();

  //userを読み込む
  const { userId } = useUser();
  console.log('userid:', userId);

  //ロイヤリティ分配csvを読み込む
  const { data, isLoading } = useRoyaltyDistribution();
  console.log('transactions:', data);

  //エラーが発生したら表示しreturn
  if((userId === null || userId === undefined)) return <div> 現在のユーザーが設定されていません</div>;
  if (!data) return <div>ロイヤリティ変遷が正しく読み込まれませんでした</div>;


  const user = users.find(user => user.userId === userId);
  if (isLoading) return <div>Loading...</div>;
  const rd = data.filter(rd => rd.recipient === user.userHash);
  if (rd.length === 0) return <div>royalty distribution not found, userID: {userId}</div>;
  console.log('rd', rd);


  // 日付文字列をISO 8601形式に変換する関数
  function convertDateToISO(dateString) {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('/').map(part => part.padStart(2, '0'));
    const [hour, minute, second] = timePart.split(':').map(part => part.padStart(2, '0'));
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  }

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

  //ロイヤリティ上昇を日付でソートし、上昇分を加算していく
  rdPerTokenId.sort((a, b) => new Date(a.date) - new Date(b.date));
  let rdAccumulation = rdPerTokenId.slice();
  let currentAmount = 0;
  for (let i=0; i<rdPerTokenId.length; i++) {
    const currentRd = rdAccumulation[i];
    currentAmount += parseFloat(currentRd.amount);
    currentRd.amount = currentAmount;
  }

  // グラフ用データの準備
  const chartData = {
    labels: rdAccumulation.map(item => item.date), // X軸のラベル（日付）
    datasets: [
      {
        label: 'NFT Amount',
        //data: rdAccumulation.map(item => item.amount), // Y軸のデータ（金額）
        data: rdAccumulation.map(item => ({x: item.date, y: item.amount, tokenId: item.tokenId})), // X, Y値とtokenIdを含むオブジェクト
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
        min: '2024-02-02',
        max: '2024-02-09'
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