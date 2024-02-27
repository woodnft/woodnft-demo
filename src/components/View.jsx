import CardSmall from './CardSmall';
import TabNFT from './TabNFT';
import '@fontsource/roboto/400.css';


export const View = () => {

  const cardIds = ["1","2","3","4","5","6","7"];

  
  return (
    <div className='container-all'>

      <div>
        <TabNFT></TabNFT>

        <h1>NFT閲覧</h1>
        <div style={{display:'flex', justifyContent:'center', border:'1px solid #00aa00'}}>
          <div className='cardlist'>
            {cardIds.map((id) => (
              <CardSmall tokenId={id}/>
            ))}
          </div>

        </div>

        
      </div> 

    </div>
  );
};
  
  export default View;