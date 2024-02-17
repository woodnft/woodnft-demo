import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const RoyalityGraph = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Demo Line Plot',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
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
            <Line data={data} />
        </div>
        
    );

}

export default RoyalityGraph;