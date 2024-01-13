import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/app/layout";
import { LoadingIndicator } from "@/components/loading-inducator";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Temizleme işlemini unutma
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <div>
      <Layout>
        {loading && <LoadingIndicator />}
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
