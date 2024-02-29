import React, { useRef, useEffect } from 'react';
import Youtube from 'react-youtube';
import { Typography } from '@mui/material';


function ProjectPage() {

    const opts = {
        width: '100%',
        playerVars: {
            autoplay: 1,
            mute: 1,
        },
    };

    return (
        <div className='container-all'>
            <div style={{marginTop:'5%'}}>
                <Typography variant='h6' gutterBottom style={{ marginTop: '20px' }}>WOOD NFT | キメラ集成材列柱空間</Typography>
                <Youtube videoId="gFyTCwKQIwY" opts={opts} />
                <Typography variant='h6' gutterBottom style={{marginTop:'20px'}}>Credit and Information</Typography>
                <img src="/woodnft-demo/credit.png" style={{ width: '100%'}} />
                <Typography variant='h6' gutterBottom style={{ marginTop: '20px' }}>Board</Typography>
                <img src="/woodnft-demo/board.jpg" style={{ width: '100%'}} />
            </div>
            
        </div>
        
    );
}

export default ProjectPage;
