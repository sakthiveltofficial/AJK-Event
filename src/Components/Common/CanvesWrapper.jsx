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
import { getProject } from "@theatre/core";
import { SheetProvider } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";

// studio.initialize();
// studio.extend(extension);

function CanvesWrapper({ children }) {
  const project = getProject("MainProject");
  const sheet = project.sheet("HeroScene");

  return (
    <div className="w-full h-full relative p-5">
      <div className="w-full h-full relative bg-black rounded-[3rem] overflow-hidden">
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
          <SheetProvider sheet={sheet}>
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
          </SheetProvider>
        </Canvas>
      </div>
    </div>
  );
}

export default CanvesWrapper;
