import RoyalityGraph from "./RoyalityGraph";
import { useUser } from './userContext';
import TabNFT from "./TabNFT";

const PageRoyalty = () => {

    //userを読み込む
    const { userId } = useUser();
    console.log('userid:', userId);
    if((userId === null || userId === undefined)) return <div> 現在のユーザーが設定されていません</div>;


    return (
        <div>
            <TabNFT />
            <h2>ロイヤリティ分配グラフ userID: {userId}</h2>
            <RoyalityGraph />
        </div>
        
    )
}

export default PageRoyalty;