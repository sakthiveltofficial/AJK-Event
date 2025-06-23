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
    
    // Define the six corner points of the hexagonal hole
    // Format: [x, y] coordinates
    const holePoints = [
      [-1.9, -2.5],    // Bottom left
      [2.1, -2.4],     // Bottom right
      [2.9, -0.3],      // Middle right
      [2, 1.9],      // Top right
      [-2, 1.9],     // Top left
      [-3, -0.25]      // Middle left
    ];
    
    // Create outer shape (wall)
    const shape = new THREE.Shape();
    shape.moveTo(-wallWidth/2, -wallHeight/2);
    shape.lineTo(wallWidth/2, -wallHeight/2);
    shape.lineTo(wallWidth/2, wallHeight/2);
    shape.lineTo(-wallWidth/2, wallHeight/2);
    shape.lineTo(-wallWidth/2, -wallHeight/2);
    
    // Create hole shape using the hexagon points
    const hole = new THREE.Path();
    hole.moveTo(holePoints[0][0], holePoints[0][1]); // Start at first point
    
    // Connect all points in sequence
    for (let i = 1; i < holePoints.length; i++) {
      hole.lineTo(holePoints[i][0], holePoints[i][1]);
    }
    
    // Close the path
    hole.lineTo(holePoints[0][0], holePoints[0][1]);
    
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
