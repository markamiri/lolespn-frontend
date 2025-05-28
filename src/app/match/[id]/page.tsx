// src/app/match/[id]/page.tsx
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
type MatchPageProps = {
  params: Promise<{ id: string }>; // This matches how Next.js now provides it
};

type Player = {
  player: string;
  champion: string;
  items: string[];
  kda: string;
  cs: string;
};

export default async function MatchPage({ params }: MatchPageProps) {
  const baseUrl = "https://lolespn-api.onrender.com/api";
  //const baseUrl = "http://127.0.0.1:5000/api";

  const { id } = await params;

  //const res = await fetch(`http://localhost:5000/api/match/${id}`, {
  //  cache: "no-store",
  //});

  const res = await fetch(`${baseUrl}/match/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch match data");
  }

  const matchData = await res.json();

  const teamLogoMap: Record<string, string> = {
    T1: "T1",
    Gen: "GENG",
    KT: "KT",
    Dplus: "DK",
    DRX: "DRX",
    DN: "DNF",
    Nongshim: "NS",
    Hanwha: "HLE",
    OK: "BRO",
    BNK: "FOX",
    // Add more as needed
  };

  const rawBlueTeamName = matchData.blue_team?.team_name || ""; // e.g., "T1 - WIN"
  console.log("rawBlueTeamName", rawBlueTeamName);
  const blueTeamName = rawBlueTeamName.split("-")[0].trim();
  console.log("baseBlueTeamName", blueTeamName);

  const baseBlueTeamName = rawBlueTeamName.match(/^\w+/)?.[0] || "";
  console.log("baseBlueTeamName", baseBlueTeamName);

  const blueTeamSlug = teamLogoMap[baseBlueTeamName] || "default";
  console.log("blueTeamSlug", blueTeamSlug);

  const rawRedTeamName = matchData.red_team?.team_name || ""; // e.g., "T1 - WIN"
  console.log("rawRedTeamName", rawRedTeamName);
  const redTeamName = rawRedTeamName.split("-")[0].trim();
  console.log("baseBlueTeamName", redTeamName);

  const baseRedTeamName = rawRedTeamName.match(/^\w+/)?.[0] || "";

  console.log("baseRedTeamName", baseRedTeamName);

  const redTeamSlug = teamLogoMap[baseRedTeamName] || "default";
  console.log("redteamslug", redTeamSlug);
  return (
    <div className="min-h-screen bg-[rgb(237,238,238,255)] w-full overflow-visible">
      {/* Sticky Navbar */}
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
              alt={blueTeamName}
              width={56} // Tailwind's w-14 = 56px
              height={56} // Tailwind's h-14 = 56px
              unoptimized
              className="p-1 border-b-4 rounded bg-gray-200"
              style={{ borderBottomColor: "rgb(83, 131, 232)" }}
            />

            <div className="text-left">
              <h2 className="text-xs font-semibold text-gray-500 hidden">
                {blueTeamName}
              </h2>
              <div className="hidden">{matchData.blue_team?.dragons_taken}</div>
              <p className="text-sm text-gray-600"></p>
            </div>
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
                unoptimized
              />
              <span className="text-xl font-bold">
                {matchData.blue_team?.towers}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-gray-500">
              <Image
                src="/scoreBoardIcons/gold.png"
                alt="Gold"
                width={32} // w-8 = 32px
                height={32} // h-8 = 32px
                className="w-8 h-8"
                unoptimized
              />
              <span className="text-xl font-bold">
                {matchData.blue_team?.gold}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src="/scoreBoardIcons/kills.png"
                alt="Kill"
                width={32} // Tailwind w-8 = 32px
                height={32} // Tailwind h-8 = 32px
                className="w-8 h-8"
                unoptimized
              />
              <span className="text-xl font-bold">
                {matchData.blue_team?.kills}
              </span>
            </div>

            <div>
              {matchData.blue_team?.team_name?.split(" ").at(-1) === "WIN" && (
                <span className="font-mono text-xl text-black">&#9654;</span>
              )}
            </div>

            {/* FINAL in the center */}
            <div className="flex flex-col items-center justify-center text-gray-500">
              <span className="text-xs uppercase">Final</span>
              <div>{matchData.game_time}</div>
            </div>

            <div>
              {matchData.red_team?.team_name?.split(" ").at(-1) === "WIN" && (
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
                unoptimized
              />

              <span className="text-xl font-bold">
                {matchData.red_team?.kills}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-gray-500">
              <Image
                src="/scoreBoardIcons/gold.png"
                alt="Gold"
                width={32} // w-8 = 32px
                height={32} // h-8 = 32px
                className="w-8 h-8"
                unoptimized
              />
              <span className="text-xl font-bold">
                {matchData.red_team?.gold}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1 gap-1">
              <Image
                src="/scoreBoardIcons/tower.png"
                alt="Tower"
                width={32} // w-8 = 32px
                height={32} // h-8 = 32px
                className="w-8 h-8"
                unoptimized
              />

              <span className="text-xl font-bold">
                {matchData.red_team?.towers}
              </span>
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
            <div>
              <h2 className="text-lg font-semibold text-gray-500 hidden">
                {redTeamName}
              </h2>
              <div className="hidden">{matchData.red_team?.dragons}</div>
              <p className="text-sm text-gray-600"></p>
            </div>
            <Image
              src={`https://dpm.lol/esport/teams/${redTeamSlug}.webp`}
              alt={redTeamName}
              width={56} // w-14 = 56px
              height={56} // h-14 = 56px
              className="p-1 border-b-4 bg-gray-200"
              style={{ borderBottomColor: "rgb(232, 64, 87)" }}
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Sticky Sub-Navigation Bar */}
      <div className=" top-[135px] z-30 bg-white border-b border-gray-200">
        <div className="flex justify-start gap-6 px-6 py-3 text-sm font-medium text-black">
          <div className="relative">
            <button className="text-black">Box Score</button>
            <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-red-600 rounded"></div>
          </div>
          <button className="text-gray-700 hover:text-black">
            Play-by-Play
          </button>
          <Link
            href={{
              pathname: `/advancedStats/${id}`,
              query: {
                blueTeamSlug: blueTeamSlug,
                blueTeamName: blueTeamName,
                bluegold: matchData.blue_team?.gold,
                bluetowers: matchData.blue_team?.towers,
                bluekills: matchData.blue_team?.kills,
                redTeamSlug: redTeamSlug,
                redTeamName: redTeamName,
                redgold: matchData.red_team?.gold,
                redtowers: matchData.red_team?.towers,
                redkills: matchData.red_team?.kills,
                gameTime: matchData.game_time,
                redWin: matchData.red_team?.team_name,
                blueWin: matchData.blue_team?.team_name,
              },
            }}
          >
            <button className="text-gray-700 hover:text-black">
              Advanced Stats
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-6 mt-0 md:mt-6">
        <div className="w-full md:w-1/3 flex flex-col gap-8 hidden md:block">
          {/* Objectives Comparison Card */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-bold text-center mb-4 text-gray-700 text-lg">
              Team Objectives
            </h3>
            <div className="grid grid-cols-3 gap-y-4 text-sm text-gray-600 items-center">
              {/* Blue Dragons */}
              <div className="flex flex-col items-center">
                <span className="text-blue-600 font-bold text-lg">
                  {matchData.blue_team.dragons}
                </span>
                <div className="w-16 h-2 bg-blue-200 mt-1">
                  <div
                    className="h-2 bg-blue-600"
                    style={{
                      width: `${Math.min(
                        100,
                        (matchData.blue_team.dragons /
                          Math.max(1, matchData.red_team.dragons)) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Label */}
              <div className="flex flex-col items-center">
                <Image
                  src="/scoreBoardIcons/Dragon.png"
                  alt="Dragon Icon"
                  width={36} // Tailwind w-9 = 36px
                  height={36} // Tailwind h-9 = 36px
                  className="mb-1"
                  unoptimized
                />
                <span className="text-xs">Dragons</span>
              </div>

              {/* Red Dragons */}
              <div className="flex flex-col items-center">
                <span className="text-red-500 font-bold text-lg">
                  {matchData.red_team.dragons}
                </span>
                <div className="w-16 h-2 bg-red-200 mt-1">
                  <div
                    className="h-2 bg-red-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (matchData.red_team.dragons /
                          Math.max(1, matchData.blue_team.dragons)) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Blue Barons */}
              <div className="flex flex-col items-center">
                <span className="text-blue-600 font-bold text-lg">
                  {matchData.blue_team.barons}
                </span>
                <div className="w-16 h-2 bg-blue-200 mt-1">
                  <div
                    className="h-2 bg-blue-600"
                    style={{
                      width: `${Math.min(
                        100,
                        (matchData.blue_team.barons /
                          Math.max(1, matchData.red_team.barons)) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Label */}
              <div className="flex flex-col items-center">
                <Image
                  src="/scoreBoardIcons/baron.png"
                  alt="baron Icon"
                  width={36} // Tailwind w-9 = 36px
                  height={36} // Tailwind h-9 = 36px
                  className="mb-1"
                  unoptimized
                />
                <span className="text-xs">Barons</span>
              </div>

              {/* Red Barons */}
              <div className="flex flex-col items-center">
                <span className="text-red-500 font-bold text-lg">
                  {matchData.red_team.barons}
                </span>
                <div className="w-16 h-2 bg-red-200 mt-1">
                  <div
                    className="h-2 bg-red-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (matchData.red_team.barons /
                          Math.max(1, matchData.blue_team.barons)) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Blue Grubs */}
              <div className="flex flex-col items-center">
                <span className="text-blue-600 font-bold text-lg">
                  {matchData.voidgrubs_blue || 0}
                </span>
                <div className="w-16 h-2 bg-blue-200 mt-1">
                  <div
                    className="h-2 bg-blue-600"
                    style={{
                      width: `${Math.min(
                        100,
                        ((matchData.voidgrubs_blue || 0) /
                          Math.max(1, matchData.voidgrubs_red || 1)) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Label */}
              <div className="flex flex-col items-center">
                <Image
                  src="/scoreBoardIcons/Grubs.png"
                  alt="Grubs Icon"
                  width={36} // Tailwind w-9 = 36px
                  height={36} // Tailwind h-9 = 36px
                  className="mb-1"
                  unoptimized
                />
                <span className="text-xs">Grubs</span>
              </div>

              {/* Red Grubs */}
              <div className="flex flex-col items-center">
                <span className="text-red-500 font-bold text-lg">
                  {matchData.voidgrubs_red || 0}
                </span>
                <div className="w-16 h-2 bg-red-200 mt-1">
                  <div
                    className="h-2 bg-red-500"
                    style={{
                      width: `${Math.min(
                        100,
                        ((matchData.voidgrubs_red || 0) /
                          Math.max(1, matchData.voidgrubs_blue || 1)) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Comparison Card */}
        <div className="bg-white rounded-lg shadow-md inline-block border-t border-gray-300 mt-4 text-sm font-medium text-black md:hidden">
          {/* Header Row: Icons */}
          <div className="grid grid-cols-6 gap-4 text-center px-4 py-2 items-center border-b border-gray-300">
            <div></div>
            <div className="flex justify-center">
              <Image
                src="/scoreBoardIcons/gold.png"
                alt="Gold"
                width={28}
                height={28}
                unoptimized
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/scoreBoardIcons/tower.png"
                alt="Tower"
                width={28}
                height={28}
                unoptimized
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/scoreBoardIcons/Dragon.png"
                alt="Dragon"
                width={28}
                height={28}
                unoptimized
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/scoreBoardIcons/Grubs.png"
                alt="Grubs"
                width={28}
                height={28}
                unoptimized
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/scoreBoardIcons/baron.png"
                alt="Baron"
                width={28}
                height={28}
                unoptimized
              />
            </div>
          </div>

          {/* Blue Team Row */}
          <div className="grid grid-cols-6 gap-4 text-center px-4 py-1 items-center">
            <div className="flex justify-center">
              <Image
                src={`https://dpm.lol/esport/teams/${blueTeamSlug}.webp`}
                alt={blueTeamName}
                width={45}
                height={45}
                className="p-1 border-b-4 rounded bg-gray-200"
                style={{ borderBottomColor: "rgb(83, 131, 232)" }}
                unoptimized
              />
            </div>
            <div className="font-bold">{matchData.blue_team?.gold}</div>
            <div>{matchData.blue_team?.towers}</div>
            <div>{matchData.blue_team?.dragons}</div>
            <div>{matchData.voidgrubs_blue}</div>
            <div>{matchData.blue_team?.barons}</div>
          </div>

          {/* Red Team Row */}
          <div className="grid grid-cols-6 gap-4 text-center px-4 py-1 items-center">
            <div className="flex justify-center">
              <Image
                src={`https://dpm.lol/esport/teams/${redTeamSlug}.webp`}
                alt={redTeamName}
                width={45}
                height={45}
                className="p-1 border-b-4 bg-gray-200"
                style={{ borderBottomColor: "rgb(232, 64, 87)" }}
                unoptimized
              />
            </div>
            <div className="font-bold">{matchData.red_team?.gold}</div>
            <div>{matchData.red_team?.towers}</div>
            <div>{matchData.red_team?.dragons}</div>
            <div>{matchData.voidgrubs_red}</div>
            <div>{matchData.red_team?.barons}</div>
          </div>
        </div>

        {/* Left Column: Tables */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-4 overflow-hidden">
          {/* Blue Team Section */}
          <h2 className="text-xl font-bold mb-2 text-black">
            Blue Team Players
          </h2>
          <table className="w-full text-sm text-left table-fixed">
            <thead className="text-gray-700 border-y border-gray-300 font-bold">
              <tr>
                <th className="w-[110px] md:w-[160px] border-r border-gray-300">
                  Player
                </th>
                <th className="w-[180px] md:w-[250px] pl-2.5">Items</th>
                <th className="w-[50px] md:w-[80px]">KDA</th>
                <th className="w-[60px]">CS</th>
              </tr>
            </thead>
            <tbody>
              {matchData.blue_team.players.map((p: Player, i: number) => (
                <tr
                  key={i}
                  className={`border-b ${
                    i % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td
                    style={{ color: "rgb(0, 102, 204)" }}
                    className="font-medium border-r border-gray-300"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${p.champion}.png`}
                        alt="Champion Icon"
                        width={24} // w-6 = 24px
                        height={24} // h-6 = 24px
                        className="rounded-full object-cover"
                        unoptimized
                      />
                      {p.player}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-1 flex-wrap pl-2.5">
                      {p.items.map((itemUrl: string, index: number) => (
                        <Image
                          key={index}
                          src={itemUrl}
                          alt={`Item ${index + 1}`}
                          width={20} // Tailwind w-5 = 20px
                          height={20} // Tailwind h-5 = 20px
                          className="rounded-sm"
                          unoptimized
                        />
                      ))}
                    </div>
                  </td>
                  <td style={{ color: "rgb(108, 109, 111)" }}>{p.kda}</td>
                  <td style={{ color: "rgb(108, 109, 111)" }}>{p.cs}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Blue Team Bans (outside table) */}
          <div className="mt-3 flex items-center gap-2 pl-1">
            <h3 className="text-sm font-semibold text-gray-600 mb-0">Bans:</h3>
            <div className="flex gap-2">
              {matchData.blue_team.bans.map((champ: string, i: number) => (
                <Image
                  key={i}
                  src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${champ.replace(
                    / /g,
                    ""
                  )}.png`}
                  alt={champ}
                  title={champ}
                  width={24} // Tailwind w-6 = 24px
                  height={24} // Tailwind h-6 = 24px
                  className="rounded-full object-cover"
                  unoptimized
                />
              ))}
            </div>
          </div>

          {/* Red Team Section */}
          <h2 className="text-xl font-bold mb-2 text-black mt-6">
            Red Team Players
          </h2>
          <table className="w-full text-sm text-left table-fixed">
            <thead className="text-gray-700 border-y border-gray-300 font-bold">
              <tr>
                <th className="w-[110px] md:w-[160px] border-r border-gray-300">
                  Player
                </th>
                <th className="w-[180px] md:w-[250px] pl-2.5">Items</th>
                <th className="w-[50px] md:w-[80px]">KDA</th>
                <th className="w-[60px]">CS</th>
              </tr>
            </thead>
            <tbody>
              {matchData.red_team.players.map((p: Player, i: number) => (
                <tr
                  key={i}
                  className={`border-b ${
                    i % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td
                    style={{ color: "rgb(0, 102, 204)" }}
                    className="font-medium border-r border-gray-300"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${p.champion}.png`}
                        alt="Champion Icon"
                        width={24} // w-6 = 24px
                        height={24} // h-6 = 24px
                        className="rounded-full object-cover"
                        unoptimized
                      />
                      {p.player}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-1 flex-wrap pl-2.5">
                      {p.items.map((itemUrl: string, index: number) => (
                        <Image
                          key={index}
                          src={itemUrl}
                          alt={`Item ${index + 1}`}
                          width={20} // Tailwind w-5 = 20px
                          height={20} // Tailwind h-5 = 20px
                          className="rounded-sm"
                          unoptimized
                        />
                      ))}
                    </div>
                  </td>
                  <td style={{ color: "rgb(108, 109, 111)" }}>{p.kda}</td>
                  <td style={{ color: "rgb(108, 109, 111)" }}>{p.cs}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Red Team Bans (outside table) */}
          {/* Red Team Bans (below red team table) */}
          <div className="mt-3 flex items-center gap-2 pl-1">
            <h3 className="text-sm font-semibold text-gray-600 mb-0">Bans:</h3>
            <div className="flex gap-2">
              {matchData.red_team.bans.map((champ: string, i: number) => (
                <Image
                  key={i}
                  src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${champ.replace(
                    / /g,
                    ""
                  )}.png`}
                  alt={champ}
                  title={champ}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                  unoptimized
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
