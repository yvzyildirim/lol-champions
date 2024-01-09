import { PiSword } from "react-icons/pi";
import { GiMagicPalm, GiStrong } from "react-icons/gi";
import { FaShieldAlt } from "react-icons/fa";
import { useRef } from "react";
import Title from "@/components/title";

export const ChampionInfo = ({ champion }) => {
  const infoRef = useRef();

  const info = Object.entries(champion.info).map(([name, count]) => ({
    name,
    count,
    icon:
      name === "attack" ? (
        <PiSword />
      ) : name === "defense" ? (
        <FaShieldAlt />
      ) : name === "magic" ? (
        <GiMagicPalm />
      ) : (
        <GiStrong />
      ),
  }));
  return (
    <div className="relative flex flex-col justify-center  bg-dark p-10">
      <div className="flex flex-col items-center  justify-start w-full  border border-dark-yellow px-10 py-20">
        <Title title="info" size="text-[70px]" />
        <div className="flex justify-center items-center w-full mt-4">
          {info.map((i, index) => (
            <div
              key={index}
              className="hexagon flex flex-col justify-center items-center w-[120px] h-[140px] mx-4  bg-dark-gray text-green"
            >
              <span className="capitalize text-sm font-semibold">{i.name}</span>
              <span className="text-4xl text-extralight  my-1">{i.count}</span>
              <span> {i.icon} </span>
            </div>
          ))}
        </div>
        <div className="flex w-8/12 mt-8">
          <div className="w-6/12 px-4 flex flex-col items-center">
            <h2 className="text-white text-xl ">Allytips</h2>
            <div className="flex flex-col mt-2">
              {champion.allytips.map((i, index) => (
                <div
                  key={index}
                  className="font-extralight text-ice text-xs  py-4  border-t border-green text-center"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
          <div className="w-6/12 px-4 flex flex-col items-center">
            <h2 className="text-white text-xl ">Enemytips</h2>
            <div className="flex flex-col mt-2">
              {champion.enemytips.map((i, index) => (
                <div
                  key={index}
                  className="font-extralight text-ice text-xs py-4  border-t border-green text-center"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
