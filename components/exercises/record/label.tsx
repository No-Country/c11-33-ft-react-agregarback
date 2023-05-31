const label = ({title,description}:{title:string, description:string}) => {
    return (
    <div className="w-full flex flex-row justify-between">
        <h4 className="font-normal text-lg text-neutral-100">{title}</h4>
        <p className="font-ligth text-accent-600">{description}</p>
    </div>
    )
  };

export default label;
