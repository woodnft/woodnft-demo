import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useNFTData } from "./hooks/useNFTData";
import users from "./userData";


import Button from './Button';
import woodData from './WoodData';
import WoodSample from '../wood-image/wood-sample2.png';
import Bid from './Bid';




const Card = ({ tokenId, ownerName }) => {

    //MODAL
    const [showModal, setShowModal] = useState(false); // モーダルの表示状態を管理

    const ShowModal = () => {
        setShowModal(true);
    };

    //const { id, price, data1_name, data1_value, data2_name, data2_value } = props;
    const navigate = useNavigate();

    //NFTCSVhookを用いてcsvを効率的に読み込む
    const { data, isLoading } = useNFTData();
    if (isLoading) return <div>Loading...</div>;
    const nft = data.find(nft => nft.tokenId === tokenId);
    if (!nft) return <div>NFT not found, tokenID: {tokenId}</div>;

    //ownerNameが渡されていない場合
    if(!ownerName){
        ownerName = users.find(user => user.userHash === nft.owner).name;
    } 


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
                    <div textAlign='left'><p style={{fontWeight:'bold'}}>{nft.condition}</p></div>
                    <div textAlign='right'><p style={{ fontWeight: 'bold' }}>{nft.saleStatus}</p></div>
                </div>
            </div>


            <div style={{backgroundColor:'#eeeeee', height:'0%', paddingBottom:'70%', position:'relative', overflow:'hidden'}}>
                <img src={"/woodnft-demo/wood-samples/"+ ('00'+tokenId).slice(-2)+".png"} alt="説明文" style={{ width: 'auto', height: '100%', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }} />
            </div>
                
            <div style={{margin:'20px 110px'}}>
                <div style={attributeStyle}>
                    <div textAlign='left'><p style={{fontWeight:'bold'}}>ID: {nft.tokenId}</p></div>
                    <div textAlign='right'><p style={{ fontWeight: 'bold' }}>{nft.salePriceETH} ETH</p></div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>所有者</div>
                    <div textAlign='right'>{ownerName}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産者</div>
                    <div textAlign='right'>{nft.producer}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産方法</div>
                    <div textAlign='right'>{nft.productionMethod}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産地</div>
                    <div textAlign='right'>{nft.productionLocation}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産日</div>
                    <div textAlign='right'>{nft.productionDate}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>樹種</div>
                    <div textAlign='right'>{nft.treeSpecies}</div>
                </div>
                
            </div>

            <div>
                <button onClick={ShowModal}>詳細</button>

                {/* モーダルウィンドウ */}
                <Bid showFlag={showModal} setShowModal={setShowModal}></Bid>
            </div>
        
        </div>
      
    );
  };
  
  export default Card;

