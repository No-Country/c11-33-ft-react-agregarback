import CardHistory from "@/components/exercises/history/cardHistory";

export default function History() {
  return (
    <div className="z-10 flex w-full bg-primary-400 md:flex-wrap md:gap-5">
      <CardHistory />
      <CardHistory />
      <CardHistory />
      <CardHistory />
    </div>
  );
}
