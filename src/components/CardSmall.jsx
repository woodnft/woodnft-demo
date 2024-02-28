
import React from 'react';
import { useNFTData, useUserData } from './hooks/customHooks';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


const CardSmall = ({ tokenId, userIdInMyPage }) => {

    const { data, isLoading } = useNFTData();
    const { data: users, isLoading: isLoadingUsers } = useUserData();
    const navigate = useNavigate();

    if(!tokenId) return <div>tokenid not input</div>;
    if (isLoading || isLoadingUsers) return <div></div>;
    //const token = data.find(d => d.tokenId === tokenId);
    const token = data[tokenId-1];
    if (!token) return <div>NFT not found, tokenID: {tokenId}</div>;

    let treeSpecies;
    if ( token.treeSpecies){
        treeSpecies = token.treeSpecies;
    } else if ( token.originalWoodId) {
        treeSpecies = data[token.originalWoodId-1]?.treeSpecies;
    } else {
        treeSpecies = "混合";
    }

    const attributeStyle = {
        display: 'flex',
        justifyContent: 'space-between', // 左右に均等に配置
        margin: '4px auto',
    };

    const cardStyle = {
        textAlign: 'center',
        //display: 'flex',
        backgroundColor: '#fafafa',
        width: '300px',
        height: '480px',
        boxSizing: 'border-box',
        borderRadius: '25px', // 角を丸くする設定
        border: '1px solid #666666', // 線の色を指定
        margin:  '0px',
        fontSize: '12px',
    };

    let ownerTextStyle = {};
    let producerTextStyle = {};
    if(userIdInMyPage) {
        if(token.ownerId === userIdInMyPage){
            ownerTextStyle = {fontWeight: 'bold'};
        }
        else if (token.producerId === userIdInMyPage){
            producerTextStyle = {fontWeight: 'bold'};
        }
    }


    return (
        <div style={cardStyle}> 

            <h3>Wood-Info ID: <span style={{ color: 'dodgerblue' }}>{token.tokenId}</span> </h3>
            <div style={{margin:'5px 40px'}}>
                <div style={attributeStyle}>
                    <div textAlign='left'><p style={{fontWeight:'bold'}}>{token.salesStatus}</p></div>
                    <div textAlign='right'><p style={{ fontWeight: 'bold' }}>￥ {Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(token.salesPrice)}</p></div>
                </div>
            </div>


            <div style={{backgroundColor:'#eeeeee', height:'0%', paddingBottom:'55%', position:'relative', overflow:'hidden'}}>
                <img src={"/woodnft-demo/wood-images/"+ tokenId +".png"} alt="説明文" style={{ width: 'auto', height: '100%', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }} />
            </div>
                
            <div style={{margin:'18px 60px'}}>              
                <div style={attributeStyle}>
                    <div textAlign='left'>所有者</div>
                    <div textAlign='right' style={ownerTextStyle}>{users[token.ownerId -1]?.name}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産者</div>
                    <div textAlign='right' style={producerTextStyle}>{users[token.producerId -1]?.name}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産方法</div>
                    <div textAlign='right'>{token.productionMethod}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産地</div>
                    <div textAlign='right'>{token.productionLocation}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産日</div>
                    <div textAlign='right'>{token.productionDate}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>樹種</div>
                    <div textAlign='right'>{treeSpecies}</div>
                </div>
                
            </div>

            <Button variant="outlined" style={{marginTop:'4px'}} onClick={()=>{navigate("/CardDetailPage/" + tokenId)}}>詳細</Button>

            

        
        </div>
      
    );
  };
  
  export default CardSmall;

