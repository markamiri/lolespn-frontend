// src/app/match/[id]/page.tsx
import Navbar from "@/components/navbar";

type MatchPageProps = {
  params: {
    id: string;
  };
};

export default async function MatchPage({ params }: MatchPageProps) {
  const baseUrl = "https://lolespn-api.onrender.com/api";

  const id = params.id;

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
        <div className="flex items-center justify-between">
          {/* Left Team */}
          <div className="flex items-center gap-4">
            <img
              src={`https://dpm.lol/esport/teams/${blueTeamSlug}.webp`}
              alt={blueTeamName}
              className="w-14 h-14 p-1 border-b-4 rounded bg-gray-200"
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
          <div className="flex items-center gap-x-12 text-gray-500">
            {/* Blue Team Stats */}
            <div className="flex items-center gap-1 hidden">
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
            </div>
            <div className="flex items-center gap-1">
              <img
                src="/scoreBoardIcons/tower.png"
                className="w-8 h-8"
                alt="Tower"
              />
              <span className="text-xl font-bold">
                {matchData.blue_team?.towers}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <img
                src="/scoreBoardIcons/gold.png"
                className="w-8 h-8"
                alt="Gold"
              />
              <span className="text-xl font-bold">
                {matchData.blue_team?.gold}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src="/scoreBoardIcons/kills.png"
                className="w-8 h-8"
                alt="Kill"
              />
              <span className="text-xl font-bold">
                {matchData.blue_team?.kills}
              </span>
            </div>

            <div>
              {matchData.blue_team?.team_name?.split(" ").at(-1) === "WIN" && (
                <span className="text-black text-xl">◀</span> // left arrow
              )}
            </div>

            {/* FINAL in the center */}
            <div className="flex flex-col items-center justify-center text-gray-500">
              <span className="text-xs uppercase">Final</span>
              <div>{matchData.game_time}</div>
            </div>

            <div>
              {matchData.red_team?.team_name?.split(" ").at(-1) === "WIN" && (
                <span className="text-black text-sm">▶</span> // right arrow
              )}
            </div>

            {/* Red Team Stats */}
            <div className="flex items-center gap-1">
              <img
                src="/scoreBoardIcons/kills.png"
                className="w-8 h-8"
                alt="Kill"
              />

              <span className="text-xl font-bold">
                {matchData.red_team?.kills}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <img
                src="/scoreBoardIcons/gold.png"
                className="w-8 h-8"
                alt="Gold"
              />
              <span className="text-xl font-bold">
                {matchData.red_team?.gold}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src="/scoreBoardIcons/tower.png"
                className="w-8 h-8"
                alt="Tower"
              />

              <span className="text-xl font-bold">
                {matchData.red_team?.towers}
              </span>
            </div>
            <div className="flex items-center gap-1 hidden">
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
              <img
                src="/scoreBoardIcons/Grubs.png"
                className="w-8 h-8"
                alt="Voidgrub"
              />
              <span className="text-xl font-bold">
                {matchData.voidgrubs_red}
              </span>
            </div>
          </div>

          {/* Right Team */}
          <div className="flex  gap-4 text-right">
            <div>
              <h2 className="text-lg font-semibold text-gray-500 hidden">
                {redTeamName}
              </h2>
              <div className="hidden">{matchData.red_team?.dragons}</div>
              <p className="text-sm text-gray-600"></p>
            </div>
            <img
              src={`https://dpm.lol/esport/teams/${redTeamSlug}.webp`}
              alt={redTeamName}
              className="w-14 h-14   p-1 border-b-4 bg-gray-200"
              style={{ borderBottomColor: "rgb(232, 64, 87)" }}
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
          <button className="text-gray-700 hover:text-black">
            Player Stats
          </button>
        </div>
      </div>

      <div className="flex max-w-6xl mx-auto gap-6 mt-6">
        {/* Left Column: Tables */}
        <div className="w-2/3 bg-white rounded-lg shadow-md p-4">
          {/* Blue Team Section */}
          <h2 className="text-xl font-bold mb-2 text-black">
            Blue Team Players
          </h2>
          <table className="w-full text-sm text-left table-fixed">
            <thead className="text-gray-700 border-y border-gray-300 font-bold">
              <tr>
                <th className="w-[160px] border-r border-gray-300">Player</th>
                <th className="w-[250px] pl-2.5">Items</th>
                <th className="w-[80px]">KDA</th>
                <th className="w-[60px]">CS</th>
              </tr>
            </thead>
            <tbody>
              {matchData.blue_team.players.map((p, i) => (
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
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${p.champion}.png`}
                        alt="Champion Icon"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      {p.player}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-1 flex-wrap pl-2.5">
                      {p.items.map((itemUrl, index) => (
                        <img
                          key={index}
                          src={itemUrl}
                          alt={`Item ${index + 1}`}
                          className="w-5 h-5 rounded-sm"
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
              {matchData.blue_team.bans.map((champ, i) => (
                <img
                  key={i}
                  src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${champ.replace(
                    / /g,
                    ""
                  )}.png`}
                  alt={champ}
                  title={champ}
                  className="w-6 h-6 rounded-full object-cover"
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
                <th className="w-[160px] border-r border-gray-300">Player</th>
                <th className="w-[250px] pl-2.5">Items</th>
                <th className="w-[80px]">KDA</th>
                <th className="w-[60px]">CS</th>
              </tr>
            </thead>
            <tbody>
              {matchData.red_team.players.map((p, i) => (
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
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${p.champion}.png`}
                        alt="Champion Icon"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      {p.player}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-1 flex-wrap pl-2.5">
                      {p.items.map((itemUrl, index) => (
                        <img
                          key={index}
                          src={itemUrl}
                          alt={`Item ${index + 1}`}
                          className="w-5 h-5 rounded-sm"
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
          {/* Red Team Bans (outside table, inline) */}
          <div className="mt-3 flex items-center gap-2 pl-1">
            <h3 className="text-sm font-semibold text-gray-600 mb-0">Bans:</h3>
            <div className="flex gap-2">
              {matchData.red_team.bans.map((champ, i) => (
                <img
                  key={i}
                  src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${champ.replace(
                    / /g,
                    ""
                  )}.png`}
                  alt={champ}
                  title={champ}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col gap-8">
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
                <img
                  src="/scoreBoardIcons/Dragon.png"
                  className="w-9 h-9 mb-1"
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
                <img
                  src="/scoreBoardIcons/baron.png"
                  className="w-9 h-9 mb-1"
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
                <img
                  src="/scoreBoardIcons/Grubs.png"
                  className="w-9 h-9 mb-1"
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
      </div>
    </div>
  );
}
