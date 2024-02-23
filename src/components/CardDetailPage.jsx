import React from 'react';
import { useParams } from 'react-router-dom';

import Card from './Card';
import NetworkGraph from './NetworkGraph';
import TabNFT from './TabNFT';

const CardDetailPage = () => {
    
    const { id } = useParams();


    if(!id) {
        return <div>IDがありません</div>
    };

    const alignStyle = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
        },
    };



    return (
        <div>
            <TabNFT />
            <h1>カード詳細 ID: {id}</h1>

            <div style={{height: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px',}}>
                <Card tokenId={id} />
                
            </div>
            <div>
                <NetworkGraph tokenId={id} />
            </div>          

        </div>
    );

};

export default CardDetailPage;