// pages/index.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, []);

  return <div>Yönlendiriliyorsunuz...</div>;
};

export default HomePage;
