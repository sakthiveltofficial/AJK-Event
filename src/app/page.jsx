"use client";
import CanvesWrapper from "@/Components/Common/CanvesWrapper";
import Wall from "@/Three/Room/Wall";
import { Loader } from "@react-three/drei";
import { RoboRoom  } from "@/Three/Robo/RoboRoom";
import { Robo } from "@/Three/Robo";
import Idel from "@/Three/RoomWithRobo/Scene/Idel";
import { Scientists } from "@/Three/Scientist/Scientist";
// import { CloudEffect } from "@/Three/Room/Scene/CloudEffect";
// import { Model } from "@/Three/model";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Loader />
      <CanvesWrapper>
        <Idel />
        <Wall />
        {/* <Model/> */}
        <Scientists />
        {/* <CloudEffect />
         <spotLight position={[0, 40, 0]} decay={0} distance={45} penumbra={1} intensity={100} /> */}
        {/* <spotLight position={[-20, 0, 10]} color="white" angle={0.15} decay={0} penumbra={-1} intensity={30} /> 
        <spotLight position={[20, -10, 10]} color="white" angle={0.2} decay={0} penumbra={-1} intensity={20} /> */}

     
      </CanvesWrapper>
    </div>
  );
}
