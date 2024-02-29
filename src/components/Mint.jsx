import React, { useState } from 'react';
import './styles.css'; 
import TabNFT from './TabNFT';

import '@fontsource/roboto/400.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // スタイルをインポート
import { Button, TextField } from '@mui/material';


/*
const IssueList = ({method}) => {

  method = parseInt(method, 10);
  const methods = ["採取", "切り出し", "ラミナ加工", "集成材加工"];



  const [selectedDate, setSelectedDate] = useState(null);
  // 日付が選択されたときに実行される関数
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [selectedOption, setSelectedOption] = useState(''); // 選択されたオプションを管理
  // オプションが選択されたときに実行される関数
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const listStyle = {
    textAlign: 'center',
    //display: 'flex',
    backgroundColor: '#fafafa',
    width: '300px',
    height: '450px',
    boxSizing: 'border-box',
    borderRadius: '25px', // 角を丸くする設定
    border: '1px solid #666666', // 線の色を指定
    margin: '0px',
    fontSize: '12px',
    position: 'relative' ,
  };



  return (
    <div style={listStyle}>
      <div style={{height:'350px'}}>
        <h2>{methods[method]}</h2>

        {[0,1,2,3].includes(method) ? <p>生産者<br></br>
        <input type="text"></input></p> : null}

        {[0,1,2,3].includes(method) ? <p>生産地<br></br>
        <input type="text"></input></p> : null}

        
        {[0, 1, 2, 3].includes(method) ?
        <p>生産日<br></br>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy.MM.dd" // 日付の表示形式を指定
          isClearable // クリアボタンを表示
          placeholderText="日付を選択" // プレースホルダーテキスト
        />
        {selectedDate && (
          <p>選択した日付: {selectedDate.toLocaleDateString()}</p>
          )}</p> : null}

        {[0].includes(method) ?
        <p>樹種<br></br>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">選択してください</option>
          {woodKind.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {selectedOption && (
          <p>選択されたオプション: {selectedOption}</p>
          )}</p> : null}

        {[1].includes(method) ?
          <p>切り出し数<br></br>
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="">選択してください</option>
              {[1,2,3,4,5,6,7,8].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {selectedOption && (
              <p>選択されたオプション: {selectedOption}</p>
            )}</p> : null}

        {[1, 2, 3].includes(method) ? <p>素材NFT<br></br>
          <input type="text"></input></p> : null}
        
        {[1, 2, 3].includes(method) ? <p>木材選択<br></br>
          <input type="text"></input></p> : null}
        
      </div>
        

      <Button to="/" >NFT発行 </Button>
    </div>
  );
};
*/

const MintListTemp = ( {method}) => {
  method = parseInt(method, 10);
  const methods = ["採取", "切り出し", "ラミナ加工", "集成材加工"];


  const listStyle = {
    textAlign: 'center',
    //display: 'flex',
    backgroundColor: '#fafafa',
    width: '300px',
    height: '450px',
    boxSizing: 'border-box',
    borderRadius: '25px', // 角を丸くする設定
    border: '1px solid #666666', // 線の色を指定
    margin: '0px',
    fontSize: '12px',
    position: 'relative',
  };



  return (
    <div style={listStyle}>
      <div style={{ height: '350px' }}>
        <h2>{methods[method]}</h2>

        {[0, 1, 2, 3].includes(method) ? <p>生産者<br></br>
          <input type="text"></input></p> : null}

        {[0, 1, 2, 3].includes(method) ? <p>生産地<br></br>
          <input type="text"></input></p> : null}


        {[0, 1, 2, 3].includes(method) ? <p>生産日<br></br>
          <input type="text"></input></p> : null}

        {[0].includes(method) ? <p>樹種<br></br>
          <input type="text"></input></p> : null}

        {[1].includes(method) ? <p>切り出し数<br></br>
          <input type="text"></input></p> : null}

        {[1, 2, 3].includes(method) ? <p>素材NFT<br></br>
          <input type="text"></input></p> : null}

        {[1, 2, 3].includes(method) ? <p>木材選択<br></br>
          <input type="text"></input></p> : null}

      </div>


      <Button style={{marginTop:'20px'}} variant='outlined' color='secondary' onClick={()=>alert("NFTが発行されました NFT-ID : ???")}> NFT発行 </Button>
    </div>
  );
}

const Mint = () => {


  return (
    <div className='container-all'>
      <TabNFT></TabNFT>

      <div>
        <h1>NFT発行</h1>
        <div style={{ display: 'flex', justifyContent: 'center', border: '1px solid #00aa00', gap: '30px', flexWrap: 'wrap'}}>
          <MintListTemp method='0' />
          <MintListTemp method='1' />
          <MintListTemp method='2' />
          <MintListTemp method='3' />
    
        </div> 
      </div>
    </div>
  );


};

export default Mint;