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
  const baseUrl = "https://lolespn-api.onrender.com/api";
  useEffect(() => {
    if (!id) return;

    fetch(`${baseUrl}/match/${id}/fullstats`)
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
      <div className="p-6 hidden">
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
      {/* Sticky Sub-Navigation Bar */}
      <div className=" top-[135px] z-30 bg-white border-b border-gray-200">
        <div className="flex justify-start gap-6 px-6 py-3 text-sm font-medium text-black">
          <div className="relative">
            <button className="text-black">Box Score</button>
          </div>
          <button className="text-gray-700 hover:text-black">
            Play-by-Play
          </button>
          <div className="relative">
            <button className="text-black">Advanced Stats</button>
            <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-red-600 rounded"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 max-w-[78rem] mx-auto pb-10 mt-3">
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

        {/* Blue Team Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-[13px] text-center table-fixed border-collapse">
            <thead
              style={{ color: "rgb(72, 73, 74)" }}
              className="font-bold uppercase border-b border-gray-300 bg-gray-50"
            >
              <tr>
                <th className="text-left px-2 py-2 w-[90px]"></th>
                <th className="w-[25px]"></th>
                <th>Level</th>
                <th>LVLD@15</th>
                <th>Kills</th>
                <th>Deaths</th>
                <th>Assists</th>
                <th>KDA</th>
                <th>KP%</th>
                <th>CSM</th>
                <th>CSD@15</th>
                <th>Golds</th>
                <th>GD@15</th>
                <th>DMG</th>
                <th>DMG Taken</th>
                <th>CC Time</th>
                <th>Solo Kill</th>
              </tr>
            </thead>
            <tbody>
              {fullStats?.players?.slice(0, 5).map((playerName, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 odd:bg-white even:bg-gray-50"
                  style={{ color: "rgb(72, 73, 74)" }}
                >
                  <td className="text-blue-600 text-left px-2 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{playerName}</span>
                    </div>
                  </td>
                  <td className=" border-r border-gray-300">
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${fullStats?.champions[i]}.png`}
                      alt={playerName}
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                  </td>
                  <td>{fullStats?.metrics?.Level?.blue?.[i]}</td>
                  <td>
                    {fullStats?.metrics?.["LVLD@15"]?.blue?.[i]} (
                    {(
                      Number(fullStats?.metrics?.["XPD@15"]?.blue?.[i]) / 1000
                    ).toFixed(1)}
                    k )
                  </td>
                  <td>{fullStats?.metrics?.Kills?.blue?.[i]}</td>
                  <td>{fullStats?.metrics?.Deaths?.blue?.[i]}</td>
                  <td>{fullStats?.metrics?.Assists?.blue?.[i]}</td>
                  <td>{fullStats?.metrics?.KDA?.blue?.[i]}</td>
                  <td>{fullStats?.metrics?.["KP%"]?.blue?.[i]}</td>
                  <td>
                    {fullStats?.metrics?.CSM?.blue?.[i]} (
                    {fullStats?.metrics?.CS?.blue?.[i]})
                  </td>
                  <td>{fullStats?.metrics?.["CSD@15"]?.blue?.[i]}</td>
                  <td>
                    <span className="block">
                      {fullStats?.metrics?.Golds?.blue?.[i]
                        ? `${(
                            Number(fullStats.metrics.Golds.blue[i]) / 1000
                          ).toFixed(1)}k`
                        : "0"}
                    </span>
                  </td>
                  <td>{fullStats?.metrics?.["GD@15"]?.blue?.[i]}</td>
                  <td>
                    <span className="block">
                      {fullStats?.metrics?.["Total damage to Champion"]?.blue?.[
                        i
                      ]
                        ? `${(
                            Number(
                              fullStats.metrics["Total damage to Champion"]
                                .blue[i]
                            ) / 1000
                          ).toFixed(1)}k`
                        : "0"}
                    </span>
                  </td>
                  <td>
                    {fullStats?.metrics?.["Total damage taken"]?.blue?.[i]
                      ? `${(
                          Number(
                            fullStats.metrics["Total damage taken"].blue[i]
                          ) / 1000
                        ).toFixed(1)}k`
                      : "0"}
                  </td>
                  <td>
                    {fullStats?.metrics?.["Time ccing others"]?.blue?.[i]}
                  </td>
                  <td>
                    {fullStats?.metrics?.["Solo Kills"]?.blue?.[i] || "0"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bench Header */}
        <div className="flex items-center gap-2 mb-4 mt-5">
          <Image
            src={`https://dpm.lol/esport/teams/${redTeamSlug}.webp`}
            alt={redTeamName ?? "red Team"}
            width={56}
            height={56}
            className="p-1 border-b-4 rounded bg-gray-200"
            style={{ borderBottomColor: "rgb(83, 131, 232)" }}
          />
          <h2 className="text-lg font-bold text-black">
            {redTeamName ?? "red Team"}
          </h2>
        </div>

        {/* Red Team Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-[13px] text-center table-fixed border-collapse">
            <thead
              style={{ color: "rgb(72, 73, 74)" }}
              className="font-bold uppercase border-b border-gray-300 bg-gray-50"
            >
              <tr>
                <th className="text-left px-2 py-2 w-[90px]"></th>
                <th className="w-[25px]"></th>
                <th>Level</th>
                <th>LVLD@15</th>
                <th>Kills</th>
                <th>Deaths</th>
                <th>Assists</th>
                <th>KDA</th>
                <th>KP%</th>
                <th>CSM</th>
                <th>CSD@15</th>
                <th>Golds</th>
                <th>GD@15</th>
                <th>DMG</th>
                <th>DMG Taken</th>
                <th>CC Time</th>
                <th>Solo Kill</th>
              </tr>
            </thead>
            <tbody>
              {fullStats?.players?.slice(5, 10).map((playerName, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 odd:bg-white even:bg-gray-50"
                  style={{ color: "rgb(72, 73, 74)" }}
                >
                  <td className="text-blue-600 text-left px-2 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{playerName}</span>
                    </div>
                  </td>
                  <td className=" border-r border-gray-300">
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${
                        fullStats?.champions[i + 5]
                      }.png`}
                      alt={playerName}
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                  </td>

                  <td>{fullStats?.metrics?.Level?.red?.[i]}</td>
                  <td>
                    {fullStats?.metrics?.["LVLD@15"]?.red?.[i]} (
                    {(
                      Number(fullStats?.metrics?.["XPD@15"]?.red?.[i]) / 1000
                    ).toFixed(1)}
                    k )
                  </td>
                  <td>{fullStats?.metrics?.Kills?.red?.[i]}</td>
                  <td>{fullStats?.metrics?.Deaths?.red?.[i]}</td>
                  <td>{fullStats?.metrics?.Assists?.red?.[i]}</td>
                  <td>{fullStats?.metrics?.KDA?.red?.[i]}</td>
                  <td>{fullStats?.metrics?.["KP%"]?.red?.[i]}</td>
                  <td>
                    {fullStats?.metrics?.CSM?.red?.[i]} (
                    {fullStats?.metrics?.CS?.red?.[i]})
                  </td>
                  <td>{fullStats?.metrics?.["CSD@15"]?.red?.[i]}</td>
                  <td>
                    <span className="block">
                      {fullStats?.metrics?.Golds?.red?.[i]
                        ? `${(
                            Number(fullStats.metrics.Golds.red[i]) / 1000
                          ).toFixed(1)}k`
                        : "0"}
                    </span>
                  </td>
                  <td>{fullStats?.metrics?.["GD@15"]?.red?.[i]}</td>
                  <td>
                    <span className="block">
                      {fullStats?.metrics?.["Total damage to Champion"]?.red?.[
                        i
                      ]
                        ? `${(
                            Number(
                              fullStats.metrics["Total damage to Champion"].red[
                                i
                              ]
                            ) / 1000
                          ).toFixed(1)}k`
                        : "0"}
                    </span>
                  </td>
                  <td>
                    {fullStats?.metrics?.["Total damage taken"]?.red?.[i]
                      ? `${(
                          Number(
                            fullStats.metrics["Total damage taken"].red[i]
                          ) / 1000
                        ).toFixed(1)}k`
                      : "0"}
                  </td>
                  <td>{fullStats?.metrics?.["Time ccing others"]?.red?.[i]}</td>
                  <td>{fullStats?.metrics?.["Solo Kills"]?.red?.[i] || "0"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
