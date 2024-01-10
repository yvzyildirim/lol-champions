import Title from "@/components/title";
import axios from "axios";
import Image from "next/image";
import { FaAngleLeft, FaChevronDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import { ChampionSpells } from "@/components/pages/champion/spells";
import { ChampionInfo } from "@/components/pages/champion/info";
import Link from "next/link";
import { ChampionSkins } from "@/components/pages/champion/skins";

const ChampionPage = ({ champion }) => {
  if (!champion) {
    return <div>Champion not found</div>;
  }

  return (
    <>
      <div className="relative flex flex-col">
        <div className="relative flex  flex-col items-center justify-between w-screen h-screen  bg-gradient-to-t from-black to-transparent z-50">
          <div className="w-full py-4 flex justify-center ">
            <Link
              href="/home"
              className="px-4 py-1 bg-dark hover:bg-green text-green hover:text-dark rounded-xl flex items-center"
            >
              <FaAngleLeft className="mr-1" />
              Back to champions
            </Link>
          </div>
          <div className=" w-9/12 py-4 flex flex-col items-center ">
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
      <ChampionInfo champion={champion} />
      <ChampionSpells champion={champion} />
      <ChampionSkins champion={champion} />
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
