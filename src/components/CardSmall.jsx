
import React, { useState } from 'react';
import { useNFTData, useUserData } from './hooks/customHooks';
import Button from './Button';



const CardSmall = ({ tokenId, ownerName }) => {

    const { data, isLoading } = useNFTData();
    const { data: users } = useUserData();


    if (isLoading) return <div>Loading...</div>;
    const token = data.find(d => d.tokenId === tokenId);
    if (!token) return <div>NFT not found, tokenID: {tokenId}</div>;

    //ownerNameが渡されていない場合
    if(!ownerName){
        ownerName = users.find(user => user.userId === token.ownerId).name;
    } 

    const attributeStyle = {
        display: 'flex',
        justifyContent: 'space-between', // 左右に均等に配置
        margin: '2px auto',
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


    return (
        <div style={cardStyle}> 

            <h3>Wood Info-SMALL </h3>
            <div style={{margin:'5px 40px'}}>
                <div style={attributeStyle}>
                    <div textAlign='left'><p style={{fontWeight:'bold'}}>{token.processingStatus}</p></div>
                    <div textAlign='right'><p style={{ fontWeight: 'bold' }}>{token.salesStatus}</p></div>
                </div>
            </div>


            <div style={{backgroundColor:'#eeeeee', height:'0%', paddingBottom:'55%', position:'relative', overflow:'hidden'}}>
                <img src={"/woodnft-demo/wood-images/"+ tokenId +".png"} alt="説明文" style={{ width: 'auto', height: '100%', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }} />
            </div>
                
            <div style={{margin:'5px 60px'}}>
                <div style={attributeStyle}>
                    <div textAlign='left'><p style={{fontWeight:'bold'}}>ID: {token.tokenId}</p></div>
                    <div textAlign='right'><p style={{ fontWeight: 'bold' }}>{token.salesPrice} ETH</p></div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>所有者</div>
                    <div textAlign='right'>{ownerName}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産者</div>
                    <div textAlign='right'>{token.pruducerId}</div>
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
                    <div textAlign='right'>{token.treeSpecies}</div>
                </div>
                
            </div>



            <Button to={"/CardDetailPage/"+tokenId}>詳細</Button>

        
        </div>
      
    );
  };
  
  export default CardSmall;

