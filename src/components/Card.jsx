import React, { useState } from 'react';
import { useNFTData, useUserData } from './hooks/customHooks';

import Bid from './Bid';


const Card = ({ tokenId }) => {

    //MODAL
    const [showModal, setShowModal] = useState(false); // モーダルの表示状態を管理
    const ShowModal = () => {
        setShowModal(true);
    };


    const { data, isLoading } = useNFTData();
    const { data: users, isLoading: isLoadingUsers } = useUserData();


    if (isLoading || isLoadingUsers) return <div>Loading...</div>;
    //const token = data.find(d => d.tokenId === tokenId);
    const token = data[tokenId-1];
    if (!token) return <div>NFT not found, tokenID: {tokenId}</div>;

    const attributeStyle = {
        display: 'flex',
        justifyContent: 'space-between', // 左右に均等に配置
        margin: '8px auto',
    };

    const cardStyle = {
        textAlign: 'center',
        //display: 'flex',
        backgroundColor: '#fafafa',
        width: '600px',
        height: '950px',
        //transform: `scale(1)`, 
        //transformOrigin: 'center',
        boxSizing: 'border-box',
        //border: '1px solid #FF0000',
        //padding: '50px',
        //margin: '-20% -10%',
        borderRadius: '50px', // 角を丸くする設定
        border: '1px solid #666666', // 線の色を指定
        //margin: '50px auto',
        fontSize: '18px',
    };


    return (
        <div style={cardStyle}> 

            <h2>Wood Info-LARGE</h2>
            <div style={{margin:'20px 110px'}}>
                <div style={attributeStyle}>
                    <div textAlign='left'><p style={{fontWeight:'bold'}}>{token.processingStatus}</p></div>
                    <div textAlign='right'><p style={{ fontWeight: 'bold' }}>{token.salesStatus}</p></div>
                </div>
            </div>


            <div style={{backgroundColor:'#eeeeee', height:'0%', paddingBottom:'70%', position:'relative', overflow:'hidden'}}>
                <img src={"/woodnft-demo/wood-images/"+tokenId+".png"} alt="説明文" style={{ width: 'auto', height: '100%', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }} />
            </div>
                
            <div style={{margin:'20px 110px'}}>
                <div style={attributeStyle}>
                    <div textAlign='left'><p style={{fontWeight:'bold'}}>ID: {token.tokenId}</p></div>
                    <div textAlign='right'><p style={{ fontWeight: 'bold' }}>{token.salesPrice} ETH</p></div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>所有者</div>
                    <div textAlign='right'>{users[token.ownerId -1]?.name}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産者</div>
                    <div textAlign='right'>{users[token.producerId -1]?.name}</div>
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

            <div>
                <button onClick={ShowModal}>入札</button>

                {/* モーダルウィンドウ */}
                <Bid showFlag={showModal} setShowModal={setShowModal}></Bid>
            </div>
        
        </div>
      
    );
  };
  
  export default Card;

