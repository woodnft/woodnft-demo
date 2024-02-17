import { useNavigate } from "react-router-dom";
import woodData from './WoodData';

const Home = () => {
  const navigate = useNavigate();

  const goTo = (to) => {
    // 指定されたパスにナビゲート
    navigate(to);
  };

  /*
  const id = 3;
  const wood = woodData.find(item => item.id === id)
  if(!wood){
    return <div> IDが{id}のデータは見つかりませんでした。</div>
  }
  */
  /*
  id = 3
  const onClickCard = () => {
    navigate("/Card", { state: id});
  };
  */


  return (
    <div className="Home">
      <header className="App-header">

        <h1>WOOD NFT APP!</h1>
        <p>
        <button onClick={() => goTo('/Page2')}>NFT 閲覧</button>
        </p><p>
        <button onClick={() => goTo('/Page1')}>NFT 発行</button>
        </p><p>
        <button onClick={() => goTo('/Page3')}>NFT 保有</button>
        </p><p>
          <button onClick={() => goTo('/CardTestpage')}>go to Card</button>
        </p>
      </header>
    </div>
  );
};

export default Home;

