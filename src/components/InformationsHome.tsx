type InformationType = { title: string; item: string; description: string };

export default function InforamtionHome({ title, item, description }: InformationType) {
  return (
    <div className="flex flex-col items-center p-10">
      <img
        className="m-3 size-[152px] rounded-full border-[10px] border-primary p-4"
        src={item}
        alt="icon"
      />
      <h3 className="mb-2 mt-5 text-center text-lg font-bold">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
}
