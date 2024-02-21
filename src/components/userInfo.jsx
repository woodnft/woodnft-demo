import { useUser } from "./userContext";
import React, { useState, useEffect } from 'react';
import users from "./userData";
import TabNFT from './TabNFT';
import { useRoyaltyDistribution } from "./hooks/useRoylaltyDistribution";

const UserInfo = () => {

    //user,rd を読み込む
    const { userId } = useUser();
    const { data, isLoading } = useRoyaltyDistribution();

    //エラーが発生したら表示しreturn
    if ((userId === null || userId === undefined)) return <div> 現在のユーザーが設定されていません</div>;
    if (!data) return <div>ロイヤリティ変遷が正しく読み込まれませんでした</div>;

    const user = users.find(user => user.userId === userId);
    if (isLoading) return <div>Loading...</div>;
    const rd = data.filter(rd => rd.recipient === user.userHash);

    //ロイヤリティ取得分を計算
    let ownedRoyalty = 0;
    if (rd.length !== 0) {
        for (let i=0; i<rd.length; i++) {
            ownedRoyalty += Number(rd[i].amount);
        }
    } 

    return (
        <div>
            <TabNFT />
            <h1>ユーザー情報</h1>
            <h2>{user.name}</h2>
            <h3>取得ロイヤリティ: {ownedRoyalty} ETH</h3>
            <h4>職種: {user.occupation} <br></br>場所: {user.location}</h4>
            <p>UserID: {user.userId}</p>
            <p>UserHash: {user.userHash}</p>
            <img src={"/woodnft-demo/user/" + user.imageUrl} alt={user.name} />
        </div>
    )
}

export default UserInfo;