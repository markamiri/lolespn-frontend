import Navbar from "@/components/navbar";
import SearchBar from "@/components/search";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#edeeee] flex flex-col">
      <Navbar />

      {/* Centered SearchBar */}
      <div className="flex flex-1 items-center justify-center mt-[-250px]">
        <SearchBar />
      </div>
    </div>
  );
}
