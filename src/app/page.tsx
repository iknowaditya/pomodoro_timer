import PomodoroTimer from "@/components/PomodoroTimer";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <div className="flex justify-center items-center bg-gradient-to-b from-neutral-600 to-neutral-800 via-neutral-900 h-screen">
    <div >
    <PomodoroTimer />
    </div>
   </div>
   
   </>
  );
}
