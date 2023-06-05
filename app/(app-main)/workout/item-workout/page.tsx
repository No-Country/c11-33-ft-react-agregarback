import RoutineComponent from "./RoutineComponent";

export default async function StartWorkout() {
  return (
    <div className="z-10 flex min-h-screen w-full flex-col items-center justify-center py-32">
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <RoutineComponent />
      </div>
    </div>
  );
}
