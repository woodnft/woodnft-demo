import React from 'react';
import { useParams } from 'react-router-dom';

import Card from './Card';
import { NetworkGraphHierarchical } from './NetworkGraph';
import TabNFT from './TabNFT';

const CardDetailPage = () => {
    
    const { id } = useParams();


    if(!id) {
        return <div>IDがありません</div>
    };





    return (
        <div className='container-all'>
            <TabNFT />

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin:"50px auto",}}>
                <Card tokenId={id} />
                
            </div>
            <div>
                <NetworkGraphHierarchical tokenId={id} />
            </div>          

        </div>
    );

};

export default CardDetailPage;