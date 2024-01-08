// pages/champions/[id].js
import Title from "@/components/title";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PiSword } from "react-icons/pi";
import { FaChevronDown, FaShieldAlt } from "react-icons/fa";
import { GiMagicPalm, GiStrong } from "react-icons/gi";

import { ChampionSpells } from "@/components/pages/champion/spells";

const ChampionPage = ({ champion }) => {
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

  if (!champion) {
    return <div>Champion not found</div>;
  }

  return (
    <>
      <div className="relative flex flex-col">
        <div className="relative flex  flex-col items-center justify-end w-screen h-screen p-10 bg-gradient-to-t from-black to-transparent z-50">
          <div className=" w-9/12 flex flex-col items-center ">
            <Title title={champion.name} size="text-[90px]" />
            <span className="text-center text-white text-sm mt-3 font-extralight ">
              {champion.lore}
            </span>
            <FaChevronDown className="mt-4 animate-bounce text-yellow text-4xl opacity-50" />
          </div>
        </div>
        <div className="w-screen h-screen overflow-hidden object-cover absolute top-0 bg-dark z-10">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
            alt={champion.name}
            className="opacity-100"
            width="100"
            height="100"
            draggable="false"
            layout="responsive"
          />
        </div>
      </div>
      <div className="relative flex flex-col justify-center  bg-dark p-10">
        <div className="flex flex-col items-center  justify-start w-full  border border-dark-yellow px-10 py-20">
          <Title title="info" size="text-[70px]" />
          <div className="flex justify-center items-center w-full mt-4">
            {info.map((i, index) => (
              <div
                key={index}
                className="hexagon flex flex-col justify-center items-center w-[120px] h-[140px] mx-4  bg-dark-gray text-green"
              >
                <span className="capitalize text-sm font-semibold">
                  {i.name}
                </span>
                <span className="text-4xl text-extralight  my-1">
                  {i.count}
                </span>
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
      <ChampionSpells champion={champion} />
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const { id } = params;

    // İstenen şampiyonun verilerini içeren API'den gelen veriyi al
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion/${id}.json`
    );

    const championData = response.data.data[id];

    return {
      props: {
        champion: championData,
      },
    };
  } catch (error) {
    console.error("Error fetching champion data:", error);
    return {
      props: {
        champion: null,
      },
    };
  }
}

export default ChampionPage;
