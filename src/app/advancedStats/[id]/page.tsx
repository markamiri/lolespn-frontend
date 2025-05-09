"use client";
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";

type FullStats = {
  match_id: string;
  champions: string[];
  players: string[];
  metrics: {
    [metricName: string]: {
      blue: string[];
      red: string[];
    };
  };
};

export default function AdvancedStatsPage() {
  const searchParams = useSearchParams();
  const { id } = useParams();

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

  const [fullStats, setFullStats] = useState<FullStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/match/${id}/fullstats`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch match stats");
        return res.json();
      })
      .then((data) => {
        setFullStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-[rgb(237,238,238)] w-full overflow-visible">
      <div className="sticky top-0 z-50 bg-black">
        <Navbar />
      </div>

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
              width={56}
              height={56}
              className="p-1 border-b-4 rounded bg-gray-200"
              style={{ borderBottomColor: "rgb(83, 131, 232)" }}
            />
          </div>

          {/* Score & Stats Row */}
          <div className="flex items-center gap-x-4 sm:gap-x-12 text-gray-500">
            <div className="hidden md:flex items-center gap-1">
              <Image
                src="/scoreBoardIcons/tower.png"
                alt="Tower"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">{bluetowers}</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-gray-500">
              <Image
                src="/scoreBoardIcons/gold.png"
                alt="Gold"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">{bluegold}</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src="/scoreBoardIcons/kills.png"
                alt="Kill"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">{bluekills}</span>
            </div>
            <div>
              {blueWin?.split(" ").at(-1) === "WIN" && (
                <span className="font-mono text-xl text-black">&#9654;</span>
              )}
            </div>
            <div className="flex flex-col items-center justify-center text-gray-500">
              <span className="text-xs uppercase">Final</span>
              <div>{gameTime}</div>
            </div>
            <div>
              {redWin?.split(" ").at(-1) === "WIN" && (
                <span className="font-mono text-xl text-black">&#9654;</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Image
                src="/scoreBoardIcons/kills.png"
                alt="Kill"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">{redkills}</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-gray-500">
              <Image
                src="/scoreBoardIcons/gold.png"
                alt="Gold"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">{redgold}</span>
            </div>
            <div className="hidden md:flex items-center  gap-1">
              <Image
                src="/scoreBoardIcons/tower.png"
                alt="Tower"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">{redtowers}</span>
            </div>
          </div>

          {/* Right Team */}
          <div className="flex  gap-4 text-right ">
            <Image
              src={`https://dpm.lol/esport/teams/${redTeamSlug}.webp`}
              alt={redTeamName ?? "Red Team"}
              width={56}
              height={56}
              className="p-1 border-b-4 bg-gray-200"
              style={{ borderBottomColor: "rgb(232, 64, 87)" }}
            />
          </div>
        </div>
      </div>

      {/* Advanced stats data */}
      <div className="p-6">
        {loading ? (
          <p className="text-gray-500">Loading full stats...</p>
        ) : fullStats ? (
          <pre className="text-sm text-black bg-white p-4 rounded shadow overflow-x-auto">
            {JSON.stringify(fullStats, null, 2)}
          </pre>
        ) : (
          <p className="text-red-500">Failed to load stats.</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Image
            src={`https://dpm.lol/esport/teams/${blueTeamSlug}.webp`}
            alt={blueTeamName ?? "Blue Team"}
            width={56}
            height={56}
            className="p-1 border-b-4 rounded bg-gray-200"
            style={{ borderBottomColor: "rgb(83, 131, 232)" }}
          />
          <h2 className="text-lg font-bold text-black">
            {blueTeamName ?? "Blue Team"}
          </h2>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-13 font-bold text-xs text-gray-500 border-b pb-1">
          <div className="col-span-2">STARTERS</div>
          <div>CS</div>
          <div>CSD@15</div>
          <div>CSM</div>
          <div>DMG%</div>
          <div>DPM</div>
          <div>Damage dealt to buildings</div>
          <div>Deaths</div>
          <div>GD@15</div>
          <div>GOLD%</div>
          <div>GPM</div>
          <div>Golds</div>
          <div>K+A Per Minute</div>
          <div>KDA</div>
          <div>KP%</div>
          <div>Kills</div>
          <div>LVLD@15</div>
          <div>Level</div>
          <div>Role</div>
          <div>Solo kills</div>
          <div>Time ccing others</div>
          <div>Total damage taken</div>
        </div>

        {/* Starters */}
        {[
          [
            "Draymond Green #23",
            "29",
            "3-10",
            "1-6",
            "2-2",
            "0",
            "4",
            "4",
            "5",
            "1",
            "1",
            "2",
            "1",
            "-3",
            "9",
          ],
          [
            "Jimmy Butler III #10",
            "34",
            "6-13",
            "2-4",
            "3-5",
            "2",
            "5",
            "7",
            "4",
            "1",
            "0",
            "2",
            "2",
            "-4",
            "17",
          ],
          [
            "Quinten Post #21",
            "3",
            "0-0",
            "0-0",
            "0-0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "-13",
            "0",
          ],
          [
            "Buddy Hield #7",
            "29",
            "5-14",
            "4-9",
            "1-1",
            "1",
            "2",
            "3",
            "1",
            "1",
            "0",
            "2",
            "2",
            "-9",
            "15",
          ],
          [
            "Brandin Podziemski #2",
            "33",
            "4-9",
            "1-4",
            "2-2",
            "2",
            "4",
            "6",
            "6",
            "2",
            "0",
            "2",
            "0",
            "+1",
            "11",
          ],
        ].map((player, i) => (
          <div
            key={i}
            className="grid grid-cols-13 text-sm text-gray-800 border-b py-1"
          >
            <div className="col-span-2 text-blue-600">
              {fullStats?.players[i]}
            </div>

            {player.slice(1).map((stat, j) => (
              <div key={j}>{stat}</div>
            ))}
          </div>
        ))}

        {/* Bench Header */}
        <div className="grid grid-cols-13 font-bold text-xs text-gray-500 border-b pt-2 pb-1">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src={`https://dpm.lol/esport/teams/${redTeamSlug}.webp`}
              alt={redTeamName ?? "Blue Team"}
              width={56}
              height={56}
              className="p-1 border-b-4 rounded bg-gray-200"
              style={{ borderBottomColor: "rgb(83, 131, 232)" }}
            />
            <h2 className="text-lg font-bold text-black">
              {redTeamName ?? "Red Team"}
            </h2>
          </div>
          <div className="col-span-2">BENCH</div>
          <div>MIN</div>
          <div>FG</div>
          <div>3PT</div>
          <div>FT</div>
          <div>OREB</div>
          <div>DREB</div>
          <div>REB</div>
          <div>AST</div>
          <div>STL</div>
          <div>BLK</div>
          <div>TO</div>
          <div>PF</div>
          <div>+/-</div>
          <div>PTS</div>
        </div>

        {/* Bench */}
        {[
          [
            "Jonathan Kuminga #00",
            "26",
            "8-11",
            "1-3",
            "1-4",
            "1",
            "4",
            "5",
            "1",
            "0",
            "0",
            "2",
            "1",
            "-8",
            "18",
          ],
          [
            "Kevon Looney #5",
            "3",
            "0-0",
            "0-0",
            "0-0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "-10",
            "0",
          ],
          [
            "Braxton Key #12",
            "4",
            "1-1",
            "0-0",
            "0-0",
            "0",
            "2",
            "2",
            "1",
            "0",
            "0",
            "1",
            "0",
            "-3",
            "2",
          ],
          [
            "Kevin Knox II #31",
            "9",
            "1-3",
            "0-1",
            "1-2",
            "1",
            "1",
            "2",
            "0",
            "1",
            "0",
            "1",
            "1",
            "-6",
            "3",
          ],
          [
            "Trayce Jackson-Davis #32",
            "19",
            "6-6",
            "0-0",
            "3-5",
            "2",
            "4",
            "6",
            "1",
            "1",
            "1",
            "4",
            "1",
            "-15",
            "15",
          ],
          [
            "Gui Santos #15",
            "8",
            "0-0",
            "0-0",
            "0-0",
            "0",
            "2",
            "2",
            "1",
            "0",
            "0",
            "1",
            "1",
            "-4",
            "0",
          ],
        ].map((player, i) => (
          <div
            key={i}
            className="grid grid-cols-13 text-sm text-gray-800 border-b py-1"
          >
            <div className="col-span-2 text-blue-600">
              {fullStats?.players[i + 4]}
            </div>

            {player.slice(1).map((stat, j) => (
              <div key={j}>{stat}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
