import CardHistory from "@/components/exercises/history/cardHistory";

interface Params {
  id: number;
}

export default function History({ params }: { params: Params }) {
  return (
    <div className="z-10 flex w-full bg-primary-400 md:flex-wrap md:gap-5">
      <CardHistory id={params.id} />
    </div>
  );
}
