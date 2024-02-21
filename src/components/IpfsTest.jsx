import React, { useState } from 'react';
import ipfs from './ipfsClient';

function IpfsTest() {
    const [file, setFile] = useState(null);
    // アップロード後にIPFSパスを保存するための状態
    const [ipfsPath, setIpfsPath] = useState('');
    // 画像URLを管理するための状態
    const [imageUrl, setImageUrl] = useState('');

    const captureFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        setFile(file);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await ipfs.add(file);
            console.log('IPFS Path:', result.path);
            // アップロード後のIPFSパスを状態に保存
            setIpfsPath(result.path);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // ipfs.ioから画像を取得
    const fetchImageFromIpfsIo = () => {
        //setImageUrl(`https://ipfs.io/ipfs/${ipfsPath}`);
        // プロキシサーバー経由で画像を取得
        //setImageUrl(`/ipfs/${ipfsPath}`);
        // 開発環境の場合
        const fullUrl = `http://localhost:5000/ipfs/${ipfsPath}`;
        // プロダクション環境の場合は、'http://localhost:3000'を適切なドメインに置き換える
        setImageUrl(fullUrl);
        console.log("imageurl:", imageUrl);

    };

    // ipfs.infura.ioから画像を取得
    const fetchImageFromInfura = () => {
        setImageUrl(`https://ipfs.infura.io/ipfs/${ipfsPath}`);
    };

    // Cloudflare IPFS Gatewayから画像を取得
    const fetchImageFromCloudflare = () => {
        setImageUrl(`https://cloudflare-ipfs.com/ipfs/${ipfsPath}`);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='file' onChange={captureFile} />
                <button type='submit'>Upload</button>
            </form>

            {/* IPFSパスを手動で入力するためのフィールド */}
            <input
                type="text"
                value={ipfsPath}
                onChange={(e) => setIpfsPath(e.target.value)}
                placeholder="Enter IPFS Path Here"
            />

            <button onClick={fetchImageFromIpfsIo}>ipfs.ioから表示</button>
            <button onClick={fetchImageFromInfura}>ipfs.infura.ioから表示</button>
            <button onClick={fetchImageFromCloudflare}>Cloudflare IPFS Gatewayから表示</button>

            <div>
                {imageUrl && <img src={imageUrl} alt="IPFS上の画像" onError={() => alert('画像のロードに失敗しました。')} style={{ maxWidth: '500px', maxHeight: '500px' }} />}
            </div>
        </div>
    );
}

export default IpfsTest;
