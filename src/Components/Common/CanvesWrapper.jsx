"use client";
import { Canvas } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
} from "@react-three/drei";
import React from "react";
import BaseEnvironment from "./BaseEnvironment";

function CanvesWrapper({ children }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ fov: 70, position: [0, 2, 15] }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        shadows
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <BaseEnvironment />
        {children}
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["red", "green", "blue"]}
            labelColor="black"
          />
        </GizmoHelper>
        {/* <Grid
          position={[0, -0.65, 0]}
          args={[150, 200]}
          cellColor="black"
          cellSize={1}
          cellThickness={1}
        /> */}
      </Canvas>
    </div>
  );
}

export default CanvesWrapper;
