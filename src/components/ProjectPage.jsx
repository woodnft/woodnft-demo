import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Model({ modelPath }) {
    const gltf = useGLTF(modelPath, true);
    const modelRef = useRef();

    useFrame(() => {
        modelRef.current.rotation.y += 0.01; // Y軸を中心に回転
    });

    // スケールの設定はuseEffect内で行うと良いかもしれません
    useEffect(() => {
        if (modelRef.current) {
            modelRef.current.scale.set(80,80,80); // スケールを設定
            modelRef.current.position.y = -12;
        }
    }, []);


    return <primitive object={gltf.scene} ref={modelRef} />;
}

function ProjectPage() {
    const modelPath = '3d/3d01.glb'; // ここにGLTFモデルのパスを指定

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <div style={{height: "100%"}}>
                <Canvas camera={{ position: [0, 10, 50], fov: 50 }} style={{ height: "100%", width: "100%" }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <Model modelPath={modelPath} />
                </Canvas>
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', zIndex: 1, backgroundColor:'gray' }}>
                <h1>WOOD NFT についてのページ</h1>
            </div>
        </div>     
    );
}

export default ProjectPage;
