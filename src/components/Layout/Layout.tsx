import { type PropsWithChildren } from "react";
import { Navbar } from "../Navbar";
import clsx from "clsx";

export const Layout = (props: PropsWithChildren<{ classname?: string }>) => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className={clsx(props.classname, "my-3 h-full")}>
        {props.children}
      </section>
    </main>
  );
};
