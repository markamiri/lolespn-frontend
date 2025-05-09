"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
export default function AdvancedStatsPage() {
  const searchParams = useSearchParams();

  const blueTeamSlug = searchParams.get("blueTeamSlug");
  const blueTeamName = searchParams.get("blueTeamName");
  const bluegold = searchParams.get("bluegold");
  const bluetowers = searchParams.get("bluetowers");
  const bluekills = searchParams.get("bluekills");
  const redTeamSlug = searchParams.get("redTeamSlug");
  const redTeamName = searchParams.get("redTeamName");
  const redgold = searchParams.get("redgold");
  const redtowers = searchParams.get("redtowers");
  const redkills = searchParams.get("redkills");
  const redWin = searchParams.get("redWin");
  const blueWin = searchParams.get("blueWin");
  const gameTime = searchParams.get("gameTime");

  return (
    <div className="min-h-screen bg-[rgb(237,238,238,255)] w-full overflow-visible">
      <Navbar />

      {/* Sticky Scoreboard */}
      <div
        className="sticky top-[47px] z-40 bg-white border-b px-6 py-5 w-full shadow"
        style={{ borderBottomColor: "rgb(206, 207, 207)" }}
      >
        <div className="flex items-center justify-between ">
          {/* Left Team */}
          <div className="flex items-center gap-4 ">
            <Image
              src={`https://dpm.lol/esport/teams/${blueTeamSlug}.webp`}
              alt={blueTeamName ?? "Blue Team"}
              width={56} // Tailwind's w-14 = 56px
              height={56} // Tailwind's h-14 = 56px
              className="p-1 border-b-4 rounded bg-gray-200"
              style={{ borderBottomColor: "rgb(83, 131, 232)" }}
            />
          </div>

          {/* Score & Stats Row */}
          <div className="flex items-center gap-x-4 sm:gap-x-12 text-gray-500">
            {/* Blue Team Stats */}
            {/* <div className="flex items-center gap-1 hidden">
                        <img
                          src="/scoreBoardIcons/Grubs.png"
                          className="w-8 h-8"
                          alt="Voidgrub"
                        />
                        <span className="text-xl font-bold">
                          {matchData.voidgrubs_blue}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 hidden">
                        <img
                          src="/scoreBoardIcons/Dragon.png"
                          className="w-8 h-8"
                          alt="Dragon"
                        />
                        <span className="text-xl font-bold">
                          {matchData.blue_team?.dragons}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 hidden">
                        <img
                          src="/scoreBoardIcons/baron.png"
                          className="w-8 h-8"
                          alt="Baron"
                        />
                        <span className="text-xl font-bold">
                          {matchData.blue_team?.barons}
                        </span>
                      </div> */}
            <div className="hidden md:flex items-center gap-1">
              <Image
                src="/scoreBoardIcons/tower.png"
                alt="Tower"
                width={32} // w-8 = 32px
                height={32} // h-8 = 32px
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">{bluetowers}</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-gray-500">
              <Image
                src="/scoreBoardIcons/gold.png"
                alt="Gold"
                width={32} // w-8 = 32px
                height={32} // h-8 = 32px
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">{bluegold}</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src="/scoreBoardIcons/kills.png"
                alt="Kill"
                width={32} // Tailwind w-8 = 32px
                height={32} // Tailwind h-8 = 32px
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">{bluekills}</span>
            </div>

            <div>
              {blueWin?.split(" ").at(-1) === "WIN" && (
                <span className="font-mono text-xl text-black">&#9654;</span>
              )}
            </div>

            {/* FINAL in the center */}
            <div className="flex flex-col items-center justify-center text-gray-500">
              <span className="text-xs uppercase">Final</span>
              <div>{gameTime}</div>
            </div>

            <div>
              {redWin?.split(" ").at(-1) === "WIN" && (
                <span className="font-mono text-xl text-black">&#9654;</span>
              )}
            </div>

            {/* Red Team Stats */}
            <div className="flex items-center gap-1">
              <Image
                src="/scoreBoardIcons/kills.png"
                alt="Kill"
                width={32} // Tailwind w-8 = 32px
                height={32} // Tailwind h-8 = 32px
                className="w-8 h-8"
              />

              <span className="text-xl font-bold">{redkills}</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-gray-500">
              <Image
                src="/scoreBoardIcons/gold.png"
                alt="Gold"
                width={32} // w-8 = 32px
                height={32} // h-8 = 32px
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">{redgold}</span>
            </div>
            <div className="hidden md:flex items-center  gap-1">
              <Image
                src="/scoreBoardIcons/tower.png"
                alt="Tower"
                width={32} // w-8 = 32px
                height={32} // h-8 = 32px
                className="w-8 h-8"
              />

              <span className="text-xl font-bold">{redtowers}</span>
            </div>
            {/* <div className="flex items-center gap-1 hidden">
                        <img
                          src="/scoreBoardIcons/baron.png"
                          className="w-8 h-8"
                          alt="Baron"
                        />
                        <span className="text-xl font-bold">
                          {matchData.red_team?.barons}
                        </span>
                      </div>
          
                      <div className="flex items-center gap-1 hidden">
                        <img
                          src="/scoreBoardIcons/Dragon.png"
                          className="w-8 h-8"
                          alt="Dragon"
                        />
                        <span className="text-xl font-bold">
                          {matchData.red_team?.dragons}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 hidden">
                        <Image
                          src="/scoreBoardIcons/Grubs.png"
                          alt="Voidgrub"
                          width={32} // Tailwind w-8 = 32px
                          height={32} // Tailwind h-8 = 32px
                          className="w-8 h-8"
                        />
                        <span className="text-xl font-bold">
                          {matchData.voidgrubs_red}
                        </span>
                      </div> */}
          </div>

          {/* Right Team */}
          <div className="flex  gap-4 text-right ">
            <Image
              src={`https://dpm.lol/esport/teams/${redTeamSlug}.webp`}
              alt={redTeamName ?? "Red Team"}
              width={56} // w-14 = 56px
              height={56} // h-14 = 56px
              className="p-1 border-b-4 bg-gray-200"
              style={{ borderBottomColor: "rgb(232, 64, 87)" }}
            />
          </div>
        </div>
      </div>
      <div>hello</div>
    </div>
  );
}
