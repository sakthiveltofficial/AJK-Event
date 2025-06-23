"use client";
import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Wall() {
  const [colorMap, normalMap, roughnessMap, metalnessMap] = useLoader(THREE.TextureLoader, [
    "/textures/Wall/Poliigon_PlasticMoldDryBlast_7495_BaseColor.jpg",
    "/textures/Wall/Poliigon_PlasticMoldDryBlast_7495_Normal.png",
    "/textures/Wall/Poliigon_PlasticMoldDryBlast_7495_Roughness.jpg",
    "/textures/Wall/Poliigon_PlasticMoldDryBlast_7495_Metallic.jpg"
  ]);
  
  // Set texture parameters
  useEffect(() => {
    [colorMap, normalMap, roughnessMap, metalnessMap].forEach(texture => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4); // Adjust the repeat value as needed
    });
  }, [colorMap, normalMap, roughnessMap, metalnessMap]);
    
  return (
    <mesh position={[0, 2, 29.6]}>
      <planeGeometry args={[70, 40]} />
      <meshStandardMaterial 
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        metalnessMap={metalnessMap}
        envMapIntensity={1}
      />
    </mesh>
  );
}

export default Wall;
