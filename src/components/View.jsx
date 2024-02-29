import CardSmall from './CardSmall';
import { useState } from 'react';
import TabNFT from './TabNFT';
import { Pagination } from '@mui/material';
import '@fontsource/roboto/400.css';


export const View = () => {
  const [page, setPage] = useState(1);
  const cardsPerPage = 50;
  const allCardsNumber = 498;
  const pageNumber = Math.ceil(allCardsNumber/cardsPerPage);

  //ページネーションに対応
  const currentCardIds = [];
  for (let i=(page-1)*cardsPerPage+1; i<= page*cardsPerPage; i++) {
    if ( i <= allCardsNumber){
      currentCardIds.push(i.toString());
    }
  }
  const handleChange = (event, value) => {
    setPage(value);
  };

  
  return (
    <div className='container-all'>

      <div>
        <TabNFT></TabNFT>

        <h1>NFT閲覧</h1>
        <Pagination count={pageNumber} page={page} onChange={handleChange} color='primary' variant='outlined'/>

        <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
          <div className='cardlist'>
            {currentCardIds.map((id) => (
              <CardSmall tokenId={id}/>
            ))}
          </div>

        </div>

        
      </div> 

    </div>
  );
};
  
  export default View;