const label = ({
  title,
  description,
  sub,
}: {
  title: string;
  description: number;
  sub: string;
}) => {
  return (
    <div className="flex w-full flex-row justify-between">
      <h4 className="text-lg font-normal text-neutral-100">{title}</h4>
      <p className="font-ligth text-accent-600">
        {description}
        {sub}
      </p>
    </div>
  );
};

export default label;
