"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type PlayerStats = {
  cs_per_minute: string;
  gold_per_minute: string;
  gold_percentage: string;
  kda: string;
  kill_participation: string;
  record: string;
  winrate: string | null;
};

const PlayerHeader = () => {
  const [stats, setStats] = useState<PlayerStats | null>(null);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:5000/api/player/player-stats/season-S15/split-ALL/Faker"
        );
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch player stats", err);
      }
    };

    fetchPlayerStats();
  }, []);

  return (
    <div className="flex items-center p-5 gap-[75px] flex-nowrap justify-start overflow-x-auto max-w-full bg-white font-sans">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <Image
          src="/2024_spring_Faker.webp"
          alt="Faker"
          width={120}
          height={120}
          className="rounded-lg"
        />
      </div>

      {/* Profile Details */}
      <div className="flex flex-col min-w-[200px]">
        <h1 className="text-[24px] m-0 text-black">
          Faker <span className="font-black"></span>
        </h1>
        <div className="text-gray-600 mt-1 text-[14px]">T1 • Mid Laner</div>
        <button className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full font-bold w-fit">
          Follow
        </button>
      </div>

      {/* Player Info */}
      <div className="flex flex-col gap-2 min-w-[220px] border-l border-gray-300 pl-5 text-sm">
        <div className="flex justify-between">
          <strong className="text-gray-500 w-[100px]">Name:</strong>
          <span className="font-bold text-black">Lee Sang-hyeok (이상혁)</span>
        </div>
        <div className="flex justify-between">
          <strong className="text-gray-500 w-[100px]">Birthdate:</strong>
          <span className="font-bold text-black">May 7, 1996 (28)</span>
        </div>
        <div className="flex justify-between">
          <strong className="text-gray-500 w-[100px]">Residency:</strong>
          <span className="font-bold text-black">Korea</span>
        </div>
        <div className="flex justify-between">
          <strong className="text-gray-500 w-[100px]">Status:</strong>
          <span className="font-bold text-green-600">● Active</span>
        </div>
      </div>

      {/* Stats Box */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg w-[399px]">
        <h3 className="m-0 text-center text-white text-[14px] bg-blue-800 p-2 rounded-t-lg">
          2024-25 SPRING SEASON STATS
        </h3>
        <div className="flex justify-between p-5 text-black">
          {stats ? (
            [
              { value: stats.record, label: "Record" },
              { value: stats.kda, label: "KDA" },
              { value: stats.cs_per_minute, label: "CS/Min" },
            ].map((stat, index) => (
              <div className="text-center flex-1" key={index}>
                <div className="text-[22px] font-bold">{stat.value}</div>
                <div className="text-[12px] text-gray-600">{stat.label}</div>
              </div>
            ))
          ) : (
            <div className="text-center w-full text-gray-400 text-sm">
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;
