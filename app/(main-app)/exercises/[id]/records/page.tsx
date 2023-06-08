import PersonalRecords from "@/components/exercises/history/PersonalRecords";

interface Params {
  id: number;
}

export default function Record({ params }: { params: Params }) {
  return (
    <div className="z-10 flex w-full bg-primary-400 md:flex-wrap md:gap-5">
      <PersonalRecords id={params.id} />
    </div>
  );
}
