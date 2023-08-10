import { UserButton } from "@clerk/nextjs";
import { clsx } from "clsx";
import Link from "next/link";
import { routesPaths } from "~/routesPaths";
import { InputText } from "primereact/inputtext";
import { routePaths } from "~/utils/routes";
import { useRouter } from "next/router";
import { useState } from "react";

type NavbarProps = {
  className?: string;
};

export const Navbar = ({ className }: NavbarProps) => {
  const { push } = useRouter();
  const [search, setSearch] = useState("");

  const onSearch = () => {
    void push(routePaths.plans({ search }));
  };

  return (
    <nav className={clsx(className, "h-16 w-full bg-dark shadow-md")}>
      <ul className="flex h-full w-full items-center px-9 py-2">
        <li className="shrink-0 text-light">
          <Link href={routesPaths.landing}>AutoSavings</Link>
        </li>
        <li>
          <span className="p-input-icon-left ml-16">
            <i className="pi pi-search" />
            <InputText
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
            />
          </span>
        </li>
        <li className="ml-auto shrink-0">
          <UserButton afterSignOutUrl="/" />
        </li>
      </ul>
    </nav>
  );
};
