import { useUser } from "./hooks/userContext";
import React, { useState, useEffect} from 'react';
import TabNFT from './TabNFT';
import CardSmall from "./CardSmall";
import { useNFTData } from "./hooks/customHooks";


const MyPage = () => {
  
  const { user, isLoading: isLoadingUser } = useUser();
  const { data, isLoading } = useNFTData();

  console.log("mypage currentUser:", user);

  if(isLoading || isLoadingUser) return <div>Loading...</div>;
  if((user === null || user === undefined)) return <div> 現在のユーザーが設定されていません</div>;

  const ownedTokens = data.filter(d => d.ownerId === user.userId || d.producerId === user.userId);
  

  return (
    <div>
      <TabNFT />

      <div>
        <h1>マイページ ：{user.name}</h1>
        <h3>{user.userHash}　場所: {user.location}　職種: {user.occupation}</h3>
        <h2>NFT Data</h2>
        {ownedTokens.length === 0 ? (
          <p>保有するNFTデータはありません</p>
        ) : (
          <div style={{display:'flex', justifyContent:'center', border:'1px solid #00aa00'}}>
            <div className='cardlist'>
              {ownedTokens.map((item) => (
                <CardSmall tokenId={item.tokenId} />))}
            </div>
          </div>
        )}

        
      </div>    
    </div>
  );
};
  
  export default MyPage;