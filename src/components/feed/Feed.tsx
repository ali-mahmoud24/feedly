import useDebounce from "@/hooks/useDebounce";
import { FeedList } from "./FeedList";
import { useState } from "react";
import { UserSearch } from "./UserSearch";

export default function Feed() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);


  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-extrabold mb-8 text-center md:text-left 
               bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        Meet Our Users
      </h1>

      {/* Search Input */}
      <UserSearch value={search} onChange={setSearch} placeholder="Search users by name or email..." />

      {/* Responsive grid wrapper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeedList search={debouncedSearch} />
      </div>
    </div>
  );
}