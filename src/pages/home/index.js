// pages/home/index.js
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import circle from "../../assets/images/circle.png";

import fighter from "../../assets/images/icons/Fighter_icon.webp";
import mage from "../../assets/images/icons/Mage_icon.webp";
import marksman from "../../assets/images/icons/Marksman_icon.webp";
import slayer from "../../assets/images/icons/Slayer_icon.webp";
import tank from "../../assets/images/icons/Tank_icon.webp";

export default function HomePage({ champions }) {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");
  const roles = [
    { id: "fighter", icon: fighter },
    { id: "mage", icon: mage },
    { id: "marksman", icon: marksman },
    { id: "assassin", icon: slayer },
    { id: "tank", icon: tank },
  ];

  const filteredChampions = champions.filter(
    (champion) =>
      champion.name.toLowerCase().includes(query.toLowerCase()) &&
      (role === "" ||
        champion.tags.some((tag) => tag.toLowerCase() === role.toLowerCase()))
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center rift-background">
      <div className="absolute z-40 w-screen bg-gradient-to-b from-black to-transparent flex justify-center h-[120px]">
        <div className="flex flex-col items-center  w-11/12 md:w-10/12  lg:w-9/12 xl:w-7/12 ">
          <div className="w-10/12 flex flex-col items-center border-b  border-yellow pb-3">
            <h2 className="text-yellow font-semibold text-3xl py-4">
              Champions
            </h2>
            <div className="w-full flex items-center justify-between text-white">
              <div className="flex items-center">
                {roles.map((i, index) => (
                  <button
                    key={index}
                    onClick={() => setRole(i.id)}
                    className={
                      " mr-2 p-[2px]  border " +
                      (role === i.id ? " border-yellow " : "border-transparent")
                    }
                  >
                    <Image src={i.icon} alt="i.id" width="30" height="30" />
                  </button>
                ))}
              </div>
              <div
                className={
                  "flex items-center bg-dark border  outline-none px-2 py-1 text-yellow " +
                  (isFocused ? "border-yellow" : "border-dark-yellow")
                }
              >
                <MdSearch />
                <input
                  type="text"
                  className="pl-2 placeholder-dark-yellow bg-transparent outline-none"
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search champions"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-screen w-11/12 md:w-10/12  lg:w-9/12 xl:w-7/12 relative flex flex-col items-center">
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 content-start w-10/12  h-screen  overflow-auto   pt-[130px] pb-[40px] scrollbar-hide z-30 box-border">
          {filteredChampions.map((champion) => (
            <div key={champion.id}>
              <Link
                href={`/champions/${champion.id}`}
                className="relative text-slate-400 hover:text-slate-100 "
              >
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/11.2.1/img/${champion.image.group}/${champion.image.full}`}
                  alt={champion.name}
                  width="100"
                  height="100"
                  layout="responsive"
                  className="border border-dark-yellow hover:border-yellow"
                />

                <div className="text-sm flex justify-center w-full">
                  <p>{champion.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="w-full h-full absolute top-0 z-10 flex items-center ">
          <Image
            className="animate-spin-slow"
            src={circle}
            alt="circle"
            width="100"
            height="100"
            layout="responsive"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      "https://ddragon.leagueoflegends.com/cdn/11.2.1/data/en_US/championFull.json"
    );

    const championsData = response.data.data;

    const champions = Object.values(championsData).map((champion) => ({
      id: champion.id,
      name: champion.name,
      image: champion.image,
      tags: champion.tags,
    }));

    return {
      props: {
        champions,
      },
    };
  } catch (error) {
    console.error("Error fetching champion data:", error);
    return {
      props: {
        champions: [],
      },
    };
  }
}
