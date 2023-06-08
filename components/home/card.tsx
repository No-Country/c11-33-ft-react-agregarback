import Check from "@/components/shared/icons/check"

export default function Card({
  title,
  description,
  classname,

}: {
  title: string;
  description: string;
  classname?: string;


}) {
  return (
    <div
      className={`relative grid grid-cols-[30px_1fr] p-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md max-w-[320px] ${classname}`}
    >
      <Check
      className="translate-y-1"
      />
        <p><span className="font-semibold">{title}</span> {description}</p>
      </div>

  );
}
