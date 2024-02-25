import React, { useState, useEffect } from 'react';
import TabNFT from './TabNFT';
import { useRoyaltyDistribution } from "./hooks/customHooks";
import { useUser } from "./hooks/userContext";


const UserInfo = () => {

    //user,rd を読み込む
    const { user } = useUser();
    const { rdDataFlatten , isLoading } = useRoyaltyDistribution();

    //エラーが発生したら表示しreturn
    if ((user === null || user === undefined)) return <div> 現在のユーザーが設定されていません</div>;
    if (!rdDataFlatten) return <div>ロイヤリティ変遷が正しく読み込まれませんでした</div>;
    if (isLoading) return <div>Loading...</div>;

    const userRd = rdDataFlatten.filter(rd => rd.recipient === user.userHash);

    //ロイヤリティ取得分を計算
    let ownedRoyalty = 0;
    userRd.forEach((rd) => {
        ownedRoyalty += Number(rd.divident);
    })

    return (
        <div>
            <TabNFT />
            <h1>ユーザー情報</h1>
            <h2>{user.name}</h2>
            <h3>取得ロイヤリティ: {ownedRoyalty.toFixed(3)} ETH?（単位?） </h3>
            <h4>役割: {user.role} <br></br>職種: {user.occupation} <br></br>場所: {user.location}<br></br>工数: {user.processingCount}</h4>
            <p>UserID: {user.userId}</p>
            <p>UserHash: {user.userHash}</p>
            <img src={"/woodnft-demo/user/" + user.imageUrl} alt={user.name} />
        </div>
    )
}

export default UserInfo;