"use client";
import CanvesWrapper from "@/Components/Common/CanvesWrapper";
import Wall from "@/Three/Room/Wall";
import { Idel } from "@/Three/Room/Scene";
import { Loader } from "@react-three/drei";
import { RoboRoom  } from "@/Three/Robo/RoboRoom";
import { Robo } from "@/Three/Robo";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Loader />
      <CanvesWrapper>
        <Idel />
        <Wall />
      </CanvesWrapper>
    </div>
  );
}
