import { UserButton } from "@clerk/nextjs";
import { clsx } from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { routesPaths } from "~/routesPaths";

type NavbarProps = {
  className?: string;
};

export const Navbar = ({ className }: NavbarProps) => {
  const { push } = useRouter();

  return (
    <nav className={clsx(className, "h-16 w-full bg-dark shadow-md")}>
      <ul className="flex h-full w-full items-center px-9 py-2">
        <li className="shrink-0 text-light">
          <Link href={routesPaths.landing}>AutoSavings</Link>
        </li>
        <li className="ml-auto shrink-0">
          <UserButton />
        </li>
      </ul>
    </nav>
  );
};
