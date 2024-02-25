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

      <button onClick={() => goTo('/')}>ホームへ</button>
      <button onClick={() => goTo('/view')}>NFT 閲覧</button>
      <button onClick={() => goTo('/mint')}>NFT 発行</button>
      <button onClick={() => goTo('/network')}>系譜図</button>
      <button onClick={() => goTo('/royaltyAll')}>ロイヤリティ全員分</button>
      <button onClick={() => goTo('/mypage')}>マイページ（保有NFT一覧）</button>
      <button onClick={() => goTo('/royalty')}>マイページ（ロイヤリティ分配）</button>
      <button onClick={() => goTo('/userinfo')}>マイページ（ユーザー情報）</button>
    
    </div>
  );
}

export default TabNFT;
