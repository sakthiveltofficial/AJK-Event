import CanvesWrapper from "@/Components/Common/CanvesWrapper";
import Wall from "@/Three/Room/Wall";
import { Idel } from "@/Three/Room/Scene";

export default function Home() {
  return (
    <div className="w-full h-screen">

      <CanvesWrapper>
        <Idel />
        <Wall />
      </CanvesWrapper>
    </div>
  );
}
