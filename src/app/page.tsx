import PomodoroTimer from "@/components/PomodoroTimer";


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
