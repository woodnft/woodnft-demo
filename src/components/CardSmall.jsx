import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import woodData from './WoodData';




const Card = ({ id }) => {

    //const { id, price, data1_name, data1_value, data2_name, data2_value } = props;
    const navigate = useNavigate();

    //const location = useLocation();
    //const cardData = location.state; // ナビゲート時に渡されたstateを取得
    //const id = parseInt(props.id, 10);
    //id = 2;
    id = parseInt(id, 10)
    const cardData = woodData.find(item => item.id === id)
    if (!cardData) {
        return <div> IDが{id}のデータは見つかりませんでした。</div>
    }

    const attributeStyle = {
        display: 'flex',
        justifyContent: 'space-between', // 左右に均等に配置
        margin: '2px auto',
    };

    const cardStyle = {
        textAlign: 'center',
        //display: 'flex',
        backgroundColor: '#fafafa',
        width: '300px',
        height: '480px',
        boxSizing: 'border-box',
        borderRadius: '25px', // 角を丸くする設定
        border: '1px solid #666666', // 線の色を指定
        margin:  '0px',
        fontSize: '12px',
    };


    return (
        <div style={cardStyle}> 

            <h3>Wood Info-SMALL </h3>
            <p style={{textAlign:'right', fontWeight:'bold', marginRight:'10%'}}>{cardData.status}</p>


            <div style={{backgroundColor:'#eeeeee', height:'0%', paddingBottom:'55%', position:'relative', overflow:'hidden'}}>
                <img src={"/wood-samples/"+ ('00'+id).slice(-2)+".png"} alt="説明文" style={{ width: 'auto', height: '100%', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }} />
            </div>
                
            <div style={{margin:'5px 60px'}}>
                <div style={attributeStyle}>
                    <div textAlign='left'><p style={{fontWeight:'bold'}}>ID {cardData.id}</p></div>
                    <div textAlign='right'><p style={{ fontWeight: 'bold' }}>Price {cardData.price} ETH</p></div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>所有者</div>
                    <div textAlign='right'>{cardData.owner}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産者</div>
                    <div textAlign='right'>{cardData.productor}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産方法</div>
                    <div textAlign='right'>{cardData.method}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産地</div>
                    <div textAlign='right'>{cardData.location}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>生産日</div>
                    <div textAlign='right'>{cardData.date}</div>
                </div>
                <div style={attributeStyle}>
                    <div textAlign='left'>樹種</div>
                    <div textAlign='right'>{cardData.kind}</div>
                </div>
                
            </div>



            <Button to={"/CardDetailPage/"+id}>詳細</Button>

        
        </div>
      
    );
  };
  
  export default Card;

