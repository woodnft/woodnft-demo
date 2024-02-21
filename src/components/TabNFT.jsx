import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

      <button onClick={() => goTo('/Page2')}>NFT 閲覧</button>
      <button onClick={() => goTo('/Page1')}>NFT 発行</button>
      <button onClick={() => goTo('/Page3')}>NFT 保有</button>
      <button onClick={() => goTo('/Royalty')}>ロイヤリティ分配</button>

    </div>
  );
}

export default TabNFT;
