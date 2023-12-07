import React from 'react';
import Link from "next/link";
import { CSSTransition } from 'react-transition-group';
import Image from "next/image";
import { Autosavings } from "public";

const Drawer: React.FC<{ open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ open, setOpen }) => {
  const closeDrawer = () => setOpen(false);

  return (
    <CSSTransition
      in={open}
      timeout={300}
      classNames="drawer"
      unmountOnExit
    >
      <div className={`!z-50 fixed inset-0 overflow-hidden  ${open ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 transition-opacity"
            aria-hidden="true"
            onClick={closeDrawer}
          >
            <div className="absolute inset-0 bg-black opacity-75"></div>
          </div>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex ">
            <div className="relative w-screen max-w-xs">
              <div className="h-full flex flex-col py-6 bg-dark shadow-xl overflow-y-scroll">
                <div className="h-min-12 h-min px-8 pb-8" style={{ minHeight: "64px", borderBottom: "1px solid #ddd" }} >
                  <Image alt="Autosavings Logo" src={Autosavings} height={48} />
                </div>
                {/* Your drawer content here */}
                <ul className="flex flex-col gap-4 p-8">
                  <li>
                    {/* Use a label for the subgroup */}
                    <label className="text-gray-300">Planes Asociados</label>
                    <ul className="ml-4">
                      <li className='mt-1'>
                        <Link
                          href={"/plans/selling"}
                          className="text-gray-300 hover:underline cursor-pointer"
                          onClick={() => closeDrawer()}
                        >
                          Venta
                        </Link>
                      </li>
                      <li className='mt-1'>
                        <Link
                          href={"/plans/subscribed"}
                          className="text-gray-300 hover:underline cursor-pointer"
                          onClick={() => closeDrawer()}
                        >
                          Mis Planes
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      href={"/plans"}
                      className="text-gray-300 hover:underline cursor-pointer"
                      onClick={() => closeDrawer()}
                    >
                      Comprar un plan
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/plans"}
                      className="text-gray-300 hover:underline cursor-pointer"
                      onClick={() => closeDrawer()}
                    >
                      Vender un plan
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Drawer;
