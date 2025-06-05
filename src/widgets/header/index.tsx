import Image from "next/image";
import React from "react";
import Hamburger from "./hamburger";

const Header = () => {
  return (
    <header className="flex items-center m-4 justify-between">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
        <div>
          <h1 className="font-bold text-2xl text-slate-800">BrunoKeiko</h1>
          <p className="font-normal text-teal-800">Front end developer</p>
        </div>
      </div>

      <Hamburger />
    </header>
  );
};

export default Header;
