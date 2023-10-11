import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import Head from "next/head";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/viva-light/theme.css";
import "react-toastify/dist/ReactToastify.css";
import "primeicons/primeicons.css";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import { ToastContainer } from "react-toastify";
import { ProgressBar } from "primereact/progressbar";
import LoadingProvider from "~/components/LoadingProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ClerkProvider>
        <Head>
          <title>Savings Marketplace</title>
          <meta
            name="description"
            content="Conseguí el mejor plan de ahorro al mejor precio"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer />
        <LoadingProvider>
          <Component {...pageProps} />
        </LoadingProvider>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
