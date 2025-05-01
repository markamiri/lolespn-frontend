"use client";

import { useEffect, useState } from "react";

type Match = {
  date: string;
  game: string;
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

const GameLog = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<string>("ALL");
  const [selectedSeason, setSelectedSeason] = useState<string>("S15");
  const [sortState, setSortState] = useState({
    date: true,
    result: true,
    duration: true,
    champion: true,
  });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        let url = "";

        if (selectedTournament !== "ALL") {
          url = `http://127.0.0.1:5000/api/player/game-log/season-ALL/split-ALL/Faker?tournament=${encodeURIComponent(
            selectedTournament
          )}`;
        } else {
          url = `http://127.0.0.1:5000/api/player/game-log/season-${selectedSeason}/split-ALL/Faker`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setMatches(data.matches);
        setTournaments(data.tournaments);
        setSeasons(data.seasons);
      } catch (err) {
        console.error("Failed to fetch matches", err);
      }
    };

    fetchMatches();
  }, [selectedTournament, selectedSeason]); // refetch when either changes

  const handleTournamentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTournament(value);
    setSelectedSeason("ALL"); // reset season when tournament selected
  };

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSeason(value);
    setSelectedTournament("ALL"); // reset tournament when season selected
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
    <div className="p-10">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black">Faker Match History</h1>
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

        <table className="w-full border-collapse text-sm text-center">
          <thead>
            <tr>
              <th
                onClick={() => sortTable("date")}
                className="bg-gray-100 font-semibold text-gray-600 py-3 px-2 cursor-pointer"
              >
                DATE
              </th>
              <th className="bg-gray-100 font-semibold text-gray-600 py-3 px-2">
                OPP
              </th>
              <th
                onClick={() => sortTable("result")}
                className="bg-gray-100 font-semibold text-gray-600 py-3 px-2 cursor-pointer"
              >
                RESULT
              </th>
              <th
                onClick={() => sortTable("duration")}
                className="bg-gray-100 font-semibold text-gray-600 py-3 px-2 cursor-pointer"
              >
                MIN
              </th>
              <th
                onClick={() => sortTable("champion")}
                className="bg-gray-100 font-semibold text-gray-600 py-3 px-2 cursor-pointer"
              >
                CHAMPION
              </th>
              <th className="bg-gray-100 font-semibold text-gray-600 py-3 px-2">
                SCORE
              </th>
              <th className="bg-gray-100 font-semibold text-gray-600 py-3 px-2">
                TOURNAMENT
              </th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-2 text-black">{match.date}</td>
                <td className="py-2 px-2 text-black">{match.game}</td>
                <td
                  className={`py-2 px-2 font-bold ${
                    match.result.toLowerCase() === "victory"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {match.result}
                </td>
                <td className="py-2 px-2 text-black">{match.duration}</td>
                <td className="py-2 px-2 text-black">{match.champion}</td>
                <td className="py-2 px-2 text-black">{match.score}</td>
                <td className="py-2 px-2 text-black">{match.tournament}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameLog;
