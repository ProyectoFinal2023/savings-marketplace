import { UserButton } from "@clerk/nextjs";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Autosavings } from "public";
import { env } from "~/env.mjs";
import { routesPaths } from "~/routesPaths";
import DropdownButton from "./shared/DropdownButton";
import { useState } from "react";
import Drawer from "./Drawer";

type NavbarProps = {
  className?: string;
};

export const Navbar = ({ className }: NavbarProps) => {
  const { push } = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <nav className={clsx(className, "h-16 w-full bg-dark shadow-md")}>
      <ul className="flex h-full w-full items-center pl-9 pr-5 py-2">
        <li className="shrink-0 text-light">
          <Link href={routesPaths.landing}>
            <Image alt="Autosavings Logo" src={Autosavings} height={48} />
          </Link>
        </li>
        <li className="hidden md:list-item ml-auto shrink-0">
          <ul className="flex items-center gap-4">
            <li>
              <DropdownButton
                links={[
                  {
                    text: 'Venta',
                    action: () => void push("/plans/selling")
                  },
                  {
                    text: 'Mis Planes',
                    action: () => void push("/plans/subscribed")
                  }
                ]}
              >
                Planes Asociados
              </DropdownButton>
            </li>
            <li>
              <Button onClick={() => void push("/plans")}>
                Comprar un plan
              </Button>
            </li>
            <li>
              <Button severity="info" onClick={() => void push("/sell-plan")}>
                Vender un plan
              </Button>
            </li>
            <li>
              <UserButton afterSignOutUrl={env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />
            </li>
          </ul>
        </li>
        <li className="md:hidden list-item ml-auto shrink-0">
          <ul className="flex items-center gap-4 !justify-self-end">
            <li>
              <UserButton afterSignOutUrl={env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />
            </li>
            <li className="ml-auto shrink-0">
              {/* Your existing component code */}
              {/* Add a button to toggle the drawer */}
              <button className="block md:hidden" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                <i className="pi pi-bars text-white" style={{ fontSize: '24px' }} />
              </button>
            </li>
          </ul>
        </li>

        {/* Render the Drawer component */}
        <Drawer open={isDrawerOpen} setOpen={setIsDrawerOpen} />
      </ul>
    </nav>
  );
};
