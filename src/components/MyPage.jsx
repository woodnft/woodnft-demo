import { useUser } from "./hooks/userContext";
import React, { useState, useEffect} from 'react';
import TabNFT from './TabNFT';
import CardSmall from "./CardSmall";
import { useNFTData, useRoyaltyDistribution } from "./hooks/customHooks";
import '@fontsource/roboto/400.css';
import RoyalityGraph from "./RoyalityGraph";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Typography } from "@mui/material";



const MyPage = () => {
  const [value, setValue] = useState('1');
  const { user, isLoading: isLoadingUser } = useUser();
  const { data, isLoading } = useNFTData();
  const { rdDataFlatten, isLoading: isLoadingRD } = useRoyaltyDistribution();

  console.log("mypage currentUser:", user);

  

  if(isLoading || isLoadingUser || isLoadingRD) return <div></div>;
  if((user === null || user === undefined)) return <div> 現在のユーザーが設定されていません</div>;

  const ownedTokens = data.filter(d => d.ownerId === user.userId || d.producerId === user.userId);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //ロイヤリティ取得分を計算
  const userRd = rdDataFlatten.filter(rd => rd.recipient === user.userHash);
  let ownedRoyalty = 0;
  userRd.forEach((rd) => {
    ownedRoyalty += Number(rd.divident);
  })

  const roles = ["素材生産者", "製材所", "集成材工場", "集成材デザイナー", "ユーザー"];

  const userImageStyle ={
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    marginTop: '50px',
    marginRight: '50px',
  };

  

  return (
    <div className="container-all">
      <TabNFT />

      <div>
        
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div >
            <h1 style={{ marginTop: '50px' }}>{user.name}</h1>
            <p style={{fontWeight:'bold'}}>{user.userHash}</p>
            <h3>{user.role}　場所: {user.location}　職種: {user.occupation}</h3>
            <h3>取得ロイヤリティ: {Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(ownedRoyalty.toFixed(3))} 円 </h3>
          </div>
          <div >
            <img src={`woodnft-demo/user/user${roles.findIndex(r => r === user.role)}.png`} style={userImageStyle} />
          </div>
        </div>
        

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={<Typography sx={{ fontWeight: 'bold' }}>Wood-NFT History</Typography>} value="1" />
              <Tab label={<Typography sx={{ fontWeight: 'bold' }}>Royalty Graph</Typography>} value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {ownedTokens.length === 0 ? (
              <p>保有するNFTデータはありません</p>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', border: '1px solid #00aa00' }}>
                <div className='cardlist'>
                  {ownedTokens.map((item) => (
                    <CardSmall tokenId={item.tokenId} userIdInMyPage={user.userId} />))}
                </div>
              </div>
            )}
          </TabPanel>
          <TabPanel value="2">
            <RoyalityGraph />
          </TabPanel>
        </TabContext>
        

        
      </div>    
    </div>
  );
};
  
  export default MyPage;