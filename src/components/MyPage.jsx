import { useUser } from "./hooks/userContext";
import React, { useState, useEffect} from 'react';
import TabNFT from './TabNFT';
import CardSmall from "./CardSmall";
import { useNFTData } from "./hooks/customHooks";


const MyPage = () => {
  
  const { user } = useUser();
  const { data, isLoading } = useNFTData();


  if (!user) {
    return <div>ユーザーが見つかりません User Id: {user.userId}</div>;
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
  
  export default MyPage;