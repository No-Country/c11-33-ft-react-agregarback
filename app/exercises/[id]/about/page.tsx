interface Params {
  id: number;
}

export default function About({ params }: { params: Params }) {
  const { id } = params;

  const instructions: string[] = [
    "instruccion 1",
    "instruccion 2",
    "instruccion 3",
    "instruccion 4",
    "instruccion 5",
  ];

  return (
    <div className="z-10">
      <div className="w-full p-4">
        <img src="/logo.png" alt="About exercise" />
      </div>
      <h4 className="px-4 text-xl font-semibold text-accent-600">Instructions</h4>
      <ol className="px-4 text-sm">
        {instructions.map((ins, index) => (
          <li key={index} className="text-neutral-100">
            {index + 1}. {ins}
          </li>
        ))}
      </ol>
    </div>
  );
}
