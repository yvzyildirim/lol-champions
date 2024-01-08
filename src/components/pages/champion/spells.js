import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const ChampionSpells = ({ champion }) => {
  const formattedKey = String(champion.key).padStart(4, "0");
  const videoRef = useRef(null);
  const spells = champion.spells;

  const spellList = spells.map((spell, index) => ({
    id: spell.id,
    type: index === 0 ? "Q" : index === 1 ? "W" : index === 2 ? "E" : "R",
    name: spell.name,
    description: spell.description,
    image:
      "https://ddragon.leagueoflegends.com/cdn/11.22.1/img/spell/" +
      spell.id +
      ".png",
    video:
      "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/" +
      formattedKey +
      "/ability_" +
      formattedKey +
      "_" +
      (index === 0 ? "Q" : index === 1 ? "W" : index === 2 ? "E" : "R") +
      "1.webm",
  }));

  const [spellVideo, setSpellVideo] = useState(spellList[0].video);
  const [selectedSpellData, setSelectedSpellData] = useState({
    name: spellList[0].name,
    description: spellList[0].description,
  });

  const handleSpell = (videoUrl, name, description) => {
    setSpellVideo(videoUrl);
    setSelectedSpellData({
      name,
      description,
    });
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleLoadedData = () => {
      console.log("loadeddata event fired");
      video.play();
    };

    const handleLoadedMetadata = () => {
      console.log("loadedmetadata event fired");
      // İsteğe bağlı olarak diğer işlemleri burada yapabilirsiniz
    };

    if (video) {
      // Event listener'ları kaldır
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);

      // Video elementini kaldır
      video.pause();
      video.src = "";
      video.load();

      // Yeni video elementini oluştur
      const newVideo = document.createElement("video");
      newVideo.src = spellVideo;
      newVideo.muted = true;
      newVideo.loop = true;
      newVideo.className = "w-full";

      // Event listener'ları ekle
      newVideo.addEventListener("loadeddata", handleLoadedData);
      newVideo.addEventListener("loadedmetadata", handleLoadedMetadata);

      // Yeni video elementini yerine ekleyin
      videoRef.current.parentNode.replaceChild(newVideo, videoRef.current);
      videoRef.current = newVideo;

      // URL güncellendiğinde otomatik oynatma
      newVideo.play();
    }
  }, [spellVideo]);
  return (
    <div className="relative flex flex-col items-stetch bg-ice ">
      <div className=" flex items-center content-center justify-center w-screen px-10 h-screen z-50 ">
        <div className="flex items-center justify-center w-6/12  h-full">
          <div className="relative  border border-yellow">
            <div className="absolute w-full h-full p-6 ">
              <div className="border border-yellow w-full h-full" />
            </div>
            <div className="p-3">
              <video ref={videoRef} autoPlay muted loop className="w-full">
                <source src={spellVideo} type="video/webm"></source>
              </video>
            </div>
          </div>
        </div>
        <div className="w-6/12 flex flex-col items-start pl-10">
          <h2 className="text-blue  text-[70px] font-black italic"> Spells</h2>
          <div className="flex items-start my-6">
            {spellList.map((i, index) => (
              <button
                key={index}
                onClick={() => handleSpell(i.video, i.name, i.description)}
                className={
                  "ml-3 w-[60px] h-[60px] border  " +
                  (selectedSpellData.name === i.name
                    ? " border-yellow"
                    : "border-transparent")
                }
              >
                <Image
                  src={i.image}
                  alt={i.name}
                  width="100"
                  height="100"
                  layout="responsive"
                  draggable="false"
                />
              </button>
            ))}
          </div>
          <div className="flex flex-col items-start w-7/12 ">
            <h2 className="text-xl font-bold"> {selectedSpellData.name} </h2>
            <span className="text-md font-light text-dark-gray mt-2">
              {selectedSpellData.description}
            </span>
          </div>
        </div>
      </div>
      <div className="w-screen h-full overflow-hidden object-cover absolute top-0 bg-ice z-10">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_2.jpg`}
          alt={champion.name}
          className="opacity-10"
          width="100"
          height="100"
          draggable="false"
          layout="responsive"
        />
      </div>
    </div>
  );
};
