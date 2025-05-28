"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

type Player = {
  id: string;
  name: string;
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/players/all");
        const data = await res.json();
        setAllPlayers(data);
      } catch (err) {
        console.error("Failed to fetch players:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim().toLowerCase();
    const match = allPlayers.find((p) => p.name.toLowerCase() === trimmed);

    if (match) {
      const idNumber = match.id.replace("p_", "");
      router.push(
        `/players/${idNumber}?name=${encodeURIComponent(match.name)}`
      );
    } else {
      alert("Player not found.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);
    const filtered = allPlayers.filter((player) =>
      player.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredPlayers(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (player: Player) => {
    setQuery(player.name);
    setShowSuggestions(false);
    const idNumber = player.id.replace("p_", "");
    router.push(`/players/${idNumber}?name=${encodeURIComponent(player.name)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-2xl mx-auto mt-20 flex flex-col items-center gap-2 relative"
    >
      {/* Logo */}
      <Image
        src="/lolespn.png"
        alt="ESPN"
        width={170}
        height={0}
        className="mb-2 bg-red-500"
      />

      {/* Search Container */}
      <div className="bg-white border border-gray-300 p-1 rounded-full flex items-center shadow-sm w-full">
        <div className="flex-1 px-4 py-2 relative">
          <label className="block text-xs text-gray-600">Search</label>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Player / Team Name"
            className="bg-transparent w-full text-gray-900 placeholder-gray-400 outline-none"
            disabled={loading}
          />
          {/* Suggestions Dropdown */}
          {showSuggestions && filteredPlayers.length > 0 && (
            <ul className="absolute z-10 mt-3 bg-white border border-gray-200 rounded-md w-full shadow-lg max-h-56 overflow-y-auto">
              {filteredPlayers.map((player) => (
                <li
                  key={player.id}
                  className="text-black p-2 hover:bg-gray-100 cursor-pointer text-left text-sm"
                  onClick={() => handleSuggestionClick(player)}
                >
                  {player.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="pr-5">
          {loading ? (
            <div className="h-5 w-5 border-2 border-t-transparent border-red-500 rounded-full animate-spin" />
          ) : (
            <MagnifyingGlassIcon className="h-5 w-5 text-red-500" />
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
