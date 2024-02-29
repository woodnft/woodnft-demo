import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
import '@fontsource/roboto/400.css';

const TabNFT = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const goTo = (to) => {
        // 現在のページと遷移先のページが同じでないかを確認
        if (location.pathname !== to) {
            // 指定されたパスにナビゲート
            navigate(to);
        }
    };


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>


      <Button variant='contained' onClick={() => goTo('/')}>Home</Button>
      <Button variant='outlined' onClick={() => goTo('/view')}>View</Button>
      <Button variant='outlined' onClick={() => goTo('/mint')}>Mint</Button>
      <Button variant='outlined' onClick={() => goTo('/network')} >Graph</Button>
      <Button variant='contained' onClick={() => goTo('/mypage')}>My Page</Button>

    </div>
  );
}

export default TabNFT;
