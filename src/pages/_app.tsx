import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import Head from "next/head";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/viva-light/theme.css";
import "primeicons/primeicons.css";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ClerkProvider {...pageProps}>
        <Head>
          <title>Savings Marketplace</title>
          <meta
            name="description"
            content="Conseguí el mejor plan de ahorro al mejor precio"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
