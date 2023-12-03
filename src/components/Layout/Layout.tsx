import { type PropsWithChildren } from "react";
import { Navbar } from "../Navbar";
import { ConfirmDialog } from 'primereact/confirmdialog';
import clsx from "clsx";

export const Layout = (props: PropsWithChildren<{ classname?: string }>) => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ConfirmDialog />
      <section className={clsx(props.classname, "my-3 h-full px-16")}>
        {props.children}
      </section>
    </main>
  );
};
