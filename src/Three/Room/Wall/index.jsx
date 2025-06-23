"use client";
import React, { useEffect, useMemo } from "react";
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
  
  // Create a shape with a hole
  const wallGeometry = useMemo(() => {
    // Wall dimensions
    const wallWidth = 70;
    const wallHeight = 40;
    
    // Hole dimensions
    const holeWidth = 5.4;
    const holeHeight = 4.3;
    const holePositionX = -0.1;
    const holePositionY = -0.3;

    // Calculate hole position based on provided coordinates
    const holeLeft = -holeWidth/2 + holePositionX;
    const holeRight = holeWidth/2 + holePositionX;
    const holeBottom = -holeHeight/2 + holePositionY;
    const holeTop = holeHeight/2 + holePositionY;

    // Create outer shape (wall)
    const shape = new THREE.Shape();
    shape.moveTo(-wallWidth/2, -wallHeight/2);
    shape.lineTo(wallWidth/2, -wallHeight/2);
    shape.lineTo(wallWidth/2, wallHeight/2);
    shape.lineTo(-wallWidth/2, wallHeight/2);
    shape.lineTo(-wallWidth/2, -wallHeight/2);
    
    // Create hole shape
    const hole = new THREE.Path();
    hole.moveTo(holeLeft, holeBottom);
    hole.lineTo(holeRight, holeBottom);
    hole.lineTo(holeRight, holeTop);
    hole.lineTo(holeLeft, holeTop);
    hole.lineTo(holeLeft, holeBottom);
    
    // Add hole to shape
    shape.holes.push(hole);
    
    // Create geometry from shape
    const geometry = new THREE.ShapeGeometry(shape);
    
    return geometry;
  }, []);
    
  return (
    <mesh position={[0, 2, 29.8]} rotation={[0, 0, 0]}>
      <primitive object={wallGeometry} />
      <meshStandardMaterial 
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        metalnessMap={metalnessMap}
        envMapIntensity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default Wall;
