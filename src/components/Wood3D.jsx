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
            modelRef.current.scale.set(80, 80, 80); // スケールを設定
            modelRef.current.position.y = -12;
        }
    }, []);


    return <primitive object={gltf.scene} ref={modelRef} />;
}

function Wood3D() {
    const modelIds = [ '001', '100' ];
    const modelPath = `3d/${Math.random() < 0.75 ? modelIds[0] : modelIds[1] }.glb`;

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
