import Title from "@/components/title";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const ChampionSkins = ({ champion }) => {
  const skins = champion.skins.map((i) => ({
    name: i.name,
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
      champion.id +
      "_" +
      i.num +
      ".jpg",
  }));

  const [activeImage, setActiveImage] = useState({
    image: skins[0].image,
    name: skins[0].name,
  });

  console.log(skins);
  return (
    <div className="relative flex h-screen w-screen flex-col items-center bg-dark ">
      <div className="relative flex flex-col items-start justify-between w-screen h-screen  p-10 z-50 ">
        <div className="flex flex-col">
          <Title title="Skins" size="text-[70px]" />
          <h2 className="pl-2 italic text-white text-2xl capitalize">
            {activeImage.name}{" "}
          </h2>
        </div>
        <div className="flex items-center">
          {skins.map((i, index) => (
            <div
              key={index}
              className={
                "border p-1 " +
                (activeImage.image === i.name
                  ? "border-yellow opacity-100"
                  : "border-transparent opacity-70")
              }
            >
              <div
                onClick={() => setActiveImage({ image: i.image, name: i.name })}
                className="cursor-pointer bg-green w-[60px] h-[60px] relative overflow-hidden flex justify-center items-center"
              >
                <Image
                  src={i.image}
                  alt={champion.name}
                  className="opacity-100 object-cover"
                  draggable="false"
                  layout="fill"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-screen h-screen overflow-hidden object-cover absolute top-0 bg-dark z-10">
        <div className="aspect-w-1 aspect-h-1">
          <Image
            src={activeImage.image}
            alt={champion.name}
            className="opacity-100 object-cover"
            draggable="false"
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
};
