"use client";
import CanvesWrapper from "@/Components/Common/CanvesWrapper";
import Wall from "@/Three/Room/Wall";
import { Idel } from "@/Three/Room/Scene";
import { Loader } from "@react-three/drei";

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

