import { type PropsWithChildren } from "react";
import { Navbar } from "../Navbar";

export const Layout = (props: PropsWithChildren) => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="my-3 h-full">{props.children}</section>
    </main>
  );
};
