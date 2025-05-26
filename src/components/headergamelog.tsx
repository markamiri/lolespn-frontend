"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

type Match = {
  date: string;
  game: string;
  game_link: string;
  result: string;
  duration: string;
  champion: string;
  score: string;
  tournament: string;
};

type Tournament = {
  text: string;
  value: string;
};

type PlayerStats = {
  cs_per_minute: string;
  gold_per_minute: string;
  gold_percentage: string;
  kda: string;
  kill_participation: string;
  record: string;
  winrate: string | null;
};

type ChampionStat = {
  champion: string;
  games_played: number;
  kda: number;
  record: string;
  winrate: string;
};
const HeaderGameLog = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [champions, setChampions] = useState<ChampionStat[]>([]);

  const [selectedTournament, setSelectedTournament] = useState<string>("ALL");
  const [selectedSeason, setSelectedSeason] = useState<string>("S15");
  const [loading, setLoading] = useState<boolean>(false);

  type WikiData = {
    Image?: string;
    Competitive?: {
      Team?: string;
      Role?: string;
    };
    "Background Information"?: {
      Name?: string;
      Birthday?: string;
      Residency?: string;
    };
    "Social Media & Links"?: {
      Instagram?: string;
    };
  };

  const [wikiData, setWikiData] = useState<WikiData | null>(null);

  const [sortState, setSortState] = useState({
    date: true,
    result: true,
    duration: true,
    champion: true,
  });

  const params = useParams();
  const searchParams = useSearchParams();
  //const BASE_API_URL = "http://127.0.0.1:5000/api";
  const BASE_API_URL = "https://lolespn-api.onrender.com/api";

  const playerId = params.id;
  const playerName = (searchParams.get("name") || "Unknown Player").split(
    " - "
  )[0];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 🔁 Start spinner
      try {
        let matchesUrl = "";
        let statsUrl = "";

        if (selectedTournament !== "ALL") {
          matchesUrl = `${BASE_API_URL}/player/game-log/season-ALL/split-ALL/${playerId}?tournament=${encodeURIComponent(
            selectedTournament
          )}`;
          statsUrl = `${BASE_API_URL}/player/player-stats/season-ALL/split-ALL/${playerId}?tournament=${encodeURIComponent(
            selectedTournament
          )}`;
        } else {
          matchesUrl = `${BASE_API_URL}/player/game-log/season-${selectedSeason}/split-ALL/${playerId}`;
          statsUrl = `${BASE_API_URL}/player/player-stats/season-${selectedSeason}/split-ALL/${playerId}`;
        }

        const matchesRes = await fetch(matchesUrl);
        const matchesData = await matchesRes.json();

        const statsRes = await fetch(statsUrl);
        const statsData = await statsRes.json();

        setMatches(matchesData.matches);
        setTournaments(matchesData.tournaments);
        setSeasons(matchesData.seasons);
        setStats(statsData);
        setChampions(matchesData.champions);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false); // ✅ Always run this last
      }
    };

    if (playerId) {
      fetchData();
    }
  }, [selectedTournament, selectedSeason, playerId]);

  useEffect(() => {
    const fetchWikiData = async () => {
      try {
        const wikiName = playerName;
        const res = await fetch(
          `${BASE_API_URL}/player/wiki/${encodeURIComponent(wikiName)}`
        );
        const data = await res.json();
        console.log(data);
        setWikiData(data); // ✅ Save to state
      } catch (err) {
        console.error("Failed to fetch wiki data:", err);
      }
    };

    if (playerName && playerName !== "Unknown Player") {
      fetchWikiData();
    }
  }, [playerName]);

  const handleTournamentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTournament(value);
    setSelectedSeason("ALL");
  };

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSeason(value);
    setSelectedTournament("ALL");
  };

  const sortTable = (key: keyof typeof sortState) => {
    const direction = sortState[key] ? 1 : -1;
    const sorted = [...matches].sort((a, b) => {
      if (key === "date") {
        return (
          (new Date(a.date).getTime() - new Date(b.date).getTime()) * direction
        );
      }
      if (key === "result") {
        return (a.result === "Victory" ? -1 : 1) * direction;
      }
      if (key === "duration") {
        const toSeconds = (str: string) => {
          const [min, sec] = str.split(":").map(Number);
          return min * 60 + sec;
        };
        return (toSeconds(a.duration) - toSeconds(b.duration)) * direction;
      }
      if (key === "champion") {
        return a.champion.localeCompare(b.champion) * direction;
      }
      return 0;
    });

    setMatches(sorted);
    setSortState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      {/* Header Section */}
      <div className="w-full bg-white font-sans rounded-none shadow pt-3 px-5">
        <div className="flex flex-row justify-between items-center gap-0 pb-0 mb-0 max-[1091px]:flex-col max-[1091px]:items-center max-[1091px]:pb-0 max-[1091px]:mb-0">
          {/* Left: Player Image and Basic Info */}
          <div className="flex flex-row items-center gap-6">
            <div className="flex-shrink-0">
              {wikiData?.Image ? (
                <Image
                  src={wikiData.Image}
                  alt={playerName}
                  width={165}
                  height={0}
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="w-[145px] h-[174px] bg-gray-200 rounded-md" />
              )}
            </div>

            <div className="flex flex-col justify-center min-w-[250px] max-w-[300px]">
              <h1 className="text-[28px] text-black tracking-wider font-semibold uppercase m-0 max-[1091px]:text-[24px] break-words">
                {playerName}
              </h1>

              <div className="text-black text-[14px] mt-1 flex flex-wrap items-center gap-2 whitespace-normal">
                <span>{wikiData?.["Competitive"]?.Team || "Loading..."}</span> •
                <span>{wikiData?.["Competitive"]?.Role || "Loading..."}</span> •
                {wikiData?.["Social Media & Links"]?.Instagram && (
                  <a
                    href={wikiData["Social Media & Links"].Instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <Image
                      src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Emblem.png"
                      alt="Instagram"
                      width={20} // w-5 = 20px
                      height={20} // h-5 = 20px
                      className="object-contain"
                    />
                  </a>
                )}
              </div>

              <button className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full font-bold w-fit hidden max-[1091px]:hidden">
                Follow
              </button>
            </div>
          </div>

          {/* Right: Personal Info and Stats */}
          <div className="flex flex-row items-center justify-end gap-10 w-full max-[1091px]:flex-col max-[1091px]:items-center max-[1091px]:gap-4">
            {/* Personal Info */}
            <div className="flex flex-col gap-2 min-w-[220px] text-sm border-l border-gray-300 pl-5 max-[1091px]:border-l-0 max-[1091px]:border-t pt-3 max-[1091px]:pl-0 max-[1091px]:w-full">
              <div className="flex justify-between">
                <strong className="w-[100px] font-normal text-gray-500">
                  Name:
                </strong>
                <span className="font-bold text-black">
                  {wikiData?.["Background Information"]?.Name || "Loading..."}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="w-[100px] font-normal text-gray-500">
                  Birthdate:
                </strong>
                <span className="font-bold text-black text-xs">
                  {wikiData?.["Background Information"]?.Birthday ||
                    "Loading..."}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="w-[100px] font-normal text-gray-500">
                  Residency:
                </strong>
                <span className="font-bold text-black">
                  {wikiData?.["Background Information"]?.Residency ||
                    "Loading..."}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="w-[100px] font-normal text-gray-500">
                  Status:
                </strong>
                <span className="font-bold text-green-600">● Active</span>
              </div>
            </div>

            {/* Stats Box */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg w-[399px] max-[1091px]:w-full max-[1091px]:mb-[20px]">
              <div className="bg-red-500 text-white text-[12px] font-bold text-center py-1 rounded-t-lg">
                {selectedTournament !== "ALL"
                  ? selectedTournament
                  : ` ${selectedSeason}`}{" "}
                Stats
              </div>
              <div className="flex justify-between p-3 text-black">
                {loading ? (
                  <div className="flex justify-center items-center w-full h-[50px]">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-red-500"></div>
                  </div>
                ) : stats ? (
                  [
                    { value: stats.kda, label: "KDA" },
                    { value: stats.cs_per_minute, label: "CS/Min" },
                    {
                      value: stats.kill_participation,
                      label: "Kill Participation",
                    },
                  ].map((stat, index) => (
                    <div className="text-center flex-1" key={index}>
                      <div className="text-[11px] text-gray-600 mb-1 font-normal">
                        {stat.label}
                      </div>
                      <div className="text-[22px] font-bold whitespace-nowrap">
                        {stat.value}
                      </div>
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
        </div>
      </div>

      <div className="flex justify-center sm:hidden ">
        <Image
          src="/lolespnlogo.webp"
          alt="LoLESPN"
          width={200} // Wider
          height={150} // Shorter = rectangle
          className="rounded-md pt-4"
        />
      </div>

      {/* Matches Section */}
      <div className="pt-5 sm:p-5">
        <div className="flex gap-6 max-[1091px]:flex-col">
          {/* Overall record card */}
          <div className="bg-white rounded-2xl shadow-md p-6 w-[330px] max-[1091px]:w-[100%] flex flex-col items-start text-black text-lg font-semibold self-start">
            {loading ? (
              <div className="flex justify-center items-center w-full h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500"></div>
              </div>
            ) : stats ? (
              <>
                {/* Overall Record Section */}
                <div className="w-full">
                  <h2 className="text-[14px] text-gray-500 font-semibold mb-2">
                    {selectedTournament !== "ALL"
                      ? selectedTournament
                      : selectedSeason !== "ALL"
                      ? selectedSeason
                      : ""}{" "}
                    Record
                  </h2>
                  <div className="text-[28px] font-bold">{stats.record}</div>
                  {/* Winrate Calculation */}
                  <div className="text-[12px] mt-1 font-normal">
                    {(() => {
                      const recordRegex = /(\d+)W\s*-\s*(\d+)L/;
                      const matchResult = stats.record.match(recordRegex);

                      if (matchResult) {
                        const wins = parseInt(matchResult[1]);
                        const losses = parseInt(matchResult[2]);
                        const totalGames = wins + losses;
                        const winrate =
                          totalGames > 0
                            ? ((wins / totalGames) * 100).toFixed(1)
                            : "0.0";
                        const winrateClass =
                          parseFloat(winrate) >= 60
                            ? "text-blue-500"
                            : "text-gray-500";

                        return (
                          <span className={`${winrateClass}`}>
                            {winrate}% Win Rate
                          </span>
                        );
                      } else {
                        return "N/A";
                      }
                    })()}
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-full my-4 border-t border-gray-200" />

                {/* Champion Statistics Section */}
                <div className="w-full">
                  <h2 className="text-[14px] text-gray-500 font-semibold mb-2 text-left">
                    Champion Stats
                  </h2>
                  <div className="flex flex-col divide-y divide-gray-200 max-[1091px]:flex-row max-[1091px]:divide-y-0 max-[1091px]:divide-x max-[1091px]:overflow-x-auto max-[1091px]:scrollbar-thin">
                    {champions.length > 0 ? (
                      [...champions]
                        .sort((a, b) => b.games_played - a.games_played)
                        .map((champ, idx) => {
                          const [wins, losses] = champ.record
                            .split("-")
                            .map(Number);
                          const totalGames = wins + losses;
                          const winPercent =
                            totalGames > 0 ? (wins / totalGames) * 100 : 0;
                          const lossPercent = 100 - winPercent;

                          let kdaColor = "text-gray-500";
                          if (champ.kda >= 5) {
                            kdaColor = "text-orange-500";
                          } else if (champ.kda >= 4) {
                            kdaColor = "text-blue-500";
                          } else if (champ.kda >= 3) {
                            kdaColor = "text-teal-500";
                          }

                          return (
                            <div
                              key={idx}
                              className="flex flex-col py-3 text-sm text-black gap-2 max-[1091px]:px-4 flex-shrink-0"
                            >
                              {/* Champion Image + Name + KDA */}
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-left">
                                  <Image
                                    src={`https://ddragon.leagueoflegends.com/cdn/15.9.1/img/champion/${champ.champion}.png`}
                                    alt={champ.champion}
                                    width={24}
                                    height={24}
                                    className="rounded-md"
                                  />
                                  <div className="font-bold">
                                    {champ.champion}
                                  </div>
                                </div>
                                <div
                                  className={`font-bold ${kdaColor} text-right`}
                                >
                                  {champ.kda} KDA
                                </div>
                              </div>

                              {/* Win/Loss Bar + Games Played */}
                              <div className="flex justify-between items-center gap-2">
                                <div className="flex w-[110px] h-5 rounded overflow-hidden">
                                  <div
                                    className="bg-blue-500 flex items-center justify-center text-white text-[11px] font-bold"
                                    style={{ width: `${winPercent}%` }}
                                  >
                                    {wins}W
                                  </div>
                                  {lossPercent > 0 && (
                                    <div
                                      className="bg-red-500 flex items-center justify-center text-white text-[11px] font-bold"
                                      style={{ width: `${lossPercent}%` }}
                                    >
                                      {losses}L
                                    </div>
                                  )}
                                </div>
                                <div className="flex gap-2 items-center text-[11px] text-gray-400">
                                  <span>{champ.games_played} Games</span>
                                  <span
                                    className={`font-semibold ${
                                      winPercent >= 60
                                        ? "text-blue-500"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {champ.winrate}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <div className="text-gray-400 text-sm text-center">
                        No champion data
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-sm text-center">
                Loading...
              </div>
            )}
          </div>

          {/* Match History Table */}
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-[1000px] overflow-hidden">
            <div className="flex items-center justify-between mb-6 max-[1091px]:flex-col max-[1091px]:items-start max-[1091px]:gap-4">
              <h1 className="text-2xl font-bold text-black">
                {playerName?.toString().toUpperCase()}{" "}
                {selectedTournament !== "ALL"
                  ? selectedTournament
                  : selectedSeason !== "ALL"
                  ? selectedSeason
                  : ""}{" "}
                Match History
              </h1>

              {/* Select containers stay in a row */}
              <div className="flex gap-4">
                <select
                  value={selectedTournament}
                  onChange={handleTournamentChange}
                  className="text-black border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none"
                >
                  {tournaments.map((tournament, index) => (
                    <option key={index} value={tournament.value}>
                      {tournament.text}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedSeason}
                  onChange={handleSeasonChange}
                  className="text-black border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none"
                >
                  {seasons.map((season, index) => (
                    <option key={index} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500"></div>
              </div>
            ) : (
              <div className="w-full overflow-x-auto max-[1091px]:scrollbar-thin max-[1091px]:pb-2">
                <table className="min-w-[750px] w-full border-collapse text-sm text-center">
                  <thead>
                    <tr>
                      {[
                        "DATE",
                        "RESULT",
                        "MIN",
                        "CHAMPION",
                        "SCORE",
                        "OPP",
                        "TOURNAMENT",
                      ].map((header, idx) => (
                        <th
                          key={idx}
                          onClick={() =>
                            sortTable(
                              header === "DATE"
                                ? "date"
                                : header === "RESULT"
                                ? "result"
                                : header === "MIN"
                                ? "duration"
                                : header === "CHAMPION"
                                ? "champion"
                                : "date"
                            )
                          }
                          className={`bg-gray-100 font-semibold text-gray-600 py-3 px-2 ${
                            ["DATE", "RESULT", "MIN", "CHAMPION"].includes(
                              header
                            )
                              ? "cursor-pointer"
                              : ""
                          }`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } border-b border-gray-200`}
                      >
                        <td className="py-2 px-2 text-black">{match.date}</td>
                        <td
                          className={`py-2 px-2 font-bold ${
                            match.result.toLowerCase() === "victory"
                              ? "text-blue-500"
                              : "text-red-500"
                          }`}
                        >
                          {match.result}
                        </td>
                        <td className="py-2 px-2 text-black">
                          {match.duration}
                        </td>
                        <td className="py-2 px-4 text-black">
                          <div className="flex items-center gap-3 justify-start">
                            <Image
                              src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${match.champion}.png`}
                              alt={match.champion}
                              width={28}
                              height={28}
                              className="rounded-md object-cover"
                            />
                            <span className="text-left">{match.champion}</span>
                          </div>
                        </td>
                        <td className="py-2 px-2 text-black">{match.score}</td>
                        <td className="py-2 px-2 text-black">
                          <Link
                            href={`/match/${match.game_link.split("/")[5]}`}
                          >
                            <span className="hover:underline cursor-pointer">
                              {match.game}
                            </span>
                          </Link>
                        </td>
                        <td className="py-2 px-2 text-black">
                          {match.tournament}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderGameLog;
