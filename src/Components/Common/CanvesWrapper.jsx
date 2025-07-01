"use client";
import { Canvas } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
} from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import BaseEnvironment from "./BaseEnvironment";
import { getProject } from "@theatre/core";
import { PerspectiveCamera, SheetProvider } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";
import { editable as e } from "@theatre/r3f";
import sequences from "@/../public/sequences/MainProject.theatre-project-state_2.json";

// studio.initialize();
// studio.extend(extension);

function CanvesWrapper({ children }) {
  const project = getProject("MainProject", { state: sequences });
  const sheet = project.sheet("HeroScene");
  const cameraLookAtRef = useRef(null);

  // useEffect(() => {
  //   project.ready.then(() => {
  //     setTimeout(() => {
  //       const sheet = project.sheet("HeroScene");
  //       sheet.sequence.play();
  //     }, 4000);
  //   });
  // }, []);

  return (
    <div className="w-full h-full relative p-5">
      <div className="w-full h-full relative bg-black rounded-[3rem] overflow-hidden">
        <Canvas
          camera={{ fov: 70, position: [0, 2, 50] }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
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
            <PerspectiveCamera
              makeDefault
              position={[0, 2, 50]}
              fov={70}
              theatreKey="camera"
              lookAt={cameraLookAtRef}
            />
            <e.mesh
              theatreKey="camera_lookAt"
              visible="editor"
              position={[0, 2, 50]}
              fov={70}
              ref={cameraLookAtRef}
            >
              <octahedronGeometry args={[0.1, 0]} />
              <meshStandardMaterial color="red" />
            </e.mesh>
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
