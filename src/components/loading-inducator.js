import Image from "next/image";
import circle from "../assets/images/circle-load.png";

export const LoadingIndicator = () => (
  <div className="w-screen h-screen absolute z-50 bg-dark opacity-70 flex items-center justify-center">
    <Image
      className="animate-spin-slow z-90"
      src={circle}
      alt="circle"
      width="200"
      height="200"
      draggable="false"
    />
  </div>
);
