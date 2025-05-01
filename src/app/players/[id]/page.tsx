import Navbar from "@/components/navbar";
import HeaderGameLog from "@/components/headergamelog";
export default function PlayerPage() {
  return (
    <div className="min-h-screen bg-[rgb(237,238,238,255)] overflow-x-hidden w-full">
      <Navbar />
      <HeaderGameLog />
    </div>
  );
}
