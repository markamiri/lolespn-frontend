import React from "react";
import Image from "next/image";
import Link from "next/link"; // <-- import Link from next/link
import SearchBar from "./search"; // adjust the path if needed

export default function Navbar() {
  return (
    <nav className="w-full bg-[#2d2d2d] flex items-center justify-between h-12">
      {/* Left side - ESPN Logo inside red clipped box */}
      <div className="flex items-center h-full">
        <div className="bg-red-600 h-full clip-diagonal flex items-center justify-center px-8 ">
          <Link href="/">
            {" "}
            <Image
              className="translate-y-[4px] -ml-3"
              src="/lolespn.png"
              alt="ESPN"
              width={170}
              height={50}
            />{" "}
          </Link>
        </div>

        <div className="flex gap-6 text-white text-sm  ml-6">
          <a href="#" className="hover:text-blue-400">
            LCK
          </a>
          <a href="#" className="hover:text-blue-400">
            LPL
          </a>
          <a href="#" className="hover:text-blue-400">
            LEC
          </a>
          <a href="#" className="hover:text-blue-400">
            LTA
          </a>
        </div>
      </div>

      {/* Right side - (future) links/icons */}
    </nav>
  );
}
