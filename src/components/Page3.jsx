import Card from './Card';
import { useUser } from "./userContext";
import React, { useState, useEffect} from 'react';
import users from "./userData";
import TabNFT from './TabNFT';
import Papa from 'papaparse';
import CardSmall from "./CardSmall";


const Page3 = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null); // currentUserの状態を追加
  const { userId } = useUser(); // 現在のユーザーIDを取得


  useEffect(() => {
    // userをuserIdから検索
    const foundUser = users.find(user => user.userId === userId);
    setUser(foundUser); // userの状態を更新


    // userが見つかった場合のみfetchを実行
    if (foundUser) {
      const csvFileUrl = '/woodnft-demo/data/nft_data.csv';

      fetch(csvFileUrl)
        .then(response => response.text())
        .then(csvText => {
          Papa.parse(csvText, {
            header: true, // CSVのヘッダー行をフィールド名として使用
            complete: (results) => {
              // user.userHashを使用してフィルタリング
              const filtered = results.data.filter(item => item.owner === foundUser.userHash);
              setData(filtered);
            }
          });
        });
    }
  }, [userId]); // userIdが変更されたときにのみ実行


  if (!user) {
    return <div>ユーザーが見つかりません User-ID:{userId}</div>;
  }
  

    return (
      <div>
        <TabNFT />

        <div>
          <h1>マイページ ：{user.name}</h1>
          <h3>{user.userHash}　場所: {user.location}　職種: {user.occupation}</h3>
          <h2>NFT Data</h2>
          {data.length === 0 ? (
            <p>保有するNFTデータはありません</p>
          ) : (
            <div style={{display:'flex', justifyContent:'center', border:'1px solid #00aa00'}}>
              <div className='cardlist'>
                {data.map((item) => (
                  <CardSmall tokenId={item.tokenId} ownerName={user.name}/>))}
              </div>
            </div>
          )}
  
          
        </div>    
      </div>
    );
  };
  
  export default Page3;