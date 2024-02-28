import React from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';


const CardCapture = () => {

    const { id } = useParams();


    if (!id) {
        return <div>IDがありません</div>
    };


    return (
        <div style={{backgroundColor:'transparent'}}>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Card tokenId={id} />

            </div>
        </div>
    );

};

export default CardCapture;