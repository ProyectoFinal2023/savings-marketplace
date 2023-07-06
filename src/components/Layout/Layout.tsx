import { type PropsWithChildren } from "react";
import { Navbar } from "../Navbar";

export const Layout = (props: PropsWithChildren) => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {props.children}
    </main>
  );
};
