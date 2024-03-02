import React, { useRef, useEffect, useState } from 'react';
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
            modelRef.current.scale.set(80, 80, 80); // スケールを設定
            modelRef.current.position.y = -12;
        }
    }, []);


    return <primitive object={gltf.scene} ref={modelRef} />;
}

function Wood3D() {
    const modelIds = [ '001', '100' ];
    const modelPath = `/woodnft-demo/3d/${Math.random() < 0.75 ? modelIds[0] : modelIds[1] }.glb`;

    const cameraY = Math.random() * 50;

    return (

        <Canvas camera={{ position: [0, cameraY, 65], fov: 50 }} style={{ height: "100%", width: "100%" }}>
            <ambientLight intensity={1} />
            <directionalLight position={[-5, 5, 5]} intensity={4} />


            <Model modelPath={modelPath} />
        </Canvas>


    );
}

export default Wood3D;


function ModelSpecial({ modelPath }) {
    const gltf = useGLTF(modelPath, true);
    const modelRef = useRef();

    useFrame(() => {
        modelRef.current.rotation.y += 0.01; // Y軸を中心に回転
    });

    // スケールの設定はuseEffect内で行うと良いかもしれません
    useEffect(() => {
        if (modelRef.current) {
            modelRef.current.scale.set(80, 80, 80); // スケールを設定
            modelRef.current.position.y = -12;
        }
    }, [modelPath]);


    return <primitive object={gltf.scene} ref={modelRef} />;
}

export function Wood3DSpecial() {
    const modelIds = [ 'a-005', 'a-006', 'a-007', 'a-008',
                    'b-005', 'b-006', 'b-007', 'b-008',
                    'c-000', 'c-001', 'c-002', 'c-003',
                    'm-001', 'm-002', 'm-003', 'm-004'];
    
    const [ currentIndex, setCurrentIndex ] = useState(8);

    useEffect(() => {
        // 30秒ごとに画像を変更するためのタイマーを設定
        const timer = setInterval(() => {
          setCurrentIndex(() => Math.floor(Math.random()*modelIds.length));
        }, 30000); // 30000ミリ秒 = 30秒
    
        // コンポーネントのアンマウント時にタイマーをクリア
        return () => clearInterval(timer);
      }, []);

    const modelPath = `/woodnft-demo/3d/${modelIds[currentIndex]}.glb`;
    const cameraY = Math.random() * 70;

    return (

        <Canvas camera={{ position: [0, cameraY, 65], fov: 50 }} style={{ height: "100%", width: "100%" }}>
            <ambientLight intensity={1} />
            <directionalLight position={[-5, 5, 5]} intensity={4} />


            <ModelSpecial modelPath={modelPath} />
        </Canvas>


    );
}