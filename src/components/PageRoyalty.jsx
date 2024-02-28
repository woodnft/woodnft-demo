import RoyalityGraph from "./RoyalityGraph";
import { useUser } from './hooks/userContext';
import TabNFT from "./TabNFT";

const PageRoyalty = () => {

    //userを読み込む
    const { user , isLoading } = useUser();
    if(isLoading) return <div></div>;

    console.log('user:', user);
    if((user === null || user === undefined)) return <div> 現在のユーザーが設定されていません</div>;


    return (
        <div>
            <TabNFT />
            <h2>ロイヤリティ分配グラフ user: {user.name}</h2>
            <RoyalityGraph />
        </div>
        
    )
}

export default PageRoyalty;