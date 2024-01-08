export default function Title({ title, size }) {
  return (
    <div className={"relative flex items-center " + size}>
      <h1 className="z-50 text-ice font-black champ-headline-text">{title}</h1>
      <h1 className="absolute z-40  mt-2 ml-2  text-green font-black champ-headline-text">
        {title}
      </h1>
      <h1 className="absolute z-30  mt-4 ml-4 text-pink font-black champ-headline-text">
        {title}
      </h1>
      <h1 className="absolute z-20  mt-6 ml-6  text-yellow font-black champ-headline-text">
        {title}
      </h1>
    </div>
  );
}
